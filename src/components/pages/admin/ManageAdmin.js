import React, { useState, useEffect } from 'react';
import MenubarAdmin from '../../layouts/MenubarAdmin';
import { useSelector } from 'react-redux';
import { Switch, Select, Tag, Modal } from 'antd';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import moment from 'moment';
// Functions
import { listUser, changeStatus, changeRole, removeUser, resetPassword  } from '../../functions/users';

const ManageAdmin = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [values, setValues] = useState({
        id: "",
        password: "",
    });

    const showModal = (id) => {
        setIsModalVisible(true);
        setValues({...values, id: id})
    };
    const handleChangePassword = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleOk = () => {
        setIsModalVisible(false);
        resetPassword(user.token, values.id, {values})
        .then(res => {
            console.log(res)
            loadData(user.token)
        })
        .catch(err => {
            console.log(err.response)
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        loadData(user.token);
    }, []);

    const loadData = (authtoken) => {
        listUser(authtoken)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    };

    const handleOnchange = (e, id) => {
        const value = {
            id: id,
            enabled: e,
        };
        changeStatus(user.token, value)
            .then((res) => {
                loadData(user.token);
                console.log('Res', res)
            })
            .catch((err) => {
                console.log(err.response)
            });
    };

    const handleOnchangeRole = (e, id) => {

        let values = {
            id: id,
            role: e,
        }
        changeRole(user.token, values)
            .then(res => {
                console.log(res)
                loadData(user.token)
            })
            .catch(err => {
                console.log(err.response)
            })
    };

    const handleRemove = (id) => {
        if (window.confirm("Are you sure to delete?")) {
            removeUser(user.token, id)
                .then(res => {
                    console.log(res)
                    loadData(user.token)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    const roleData = ['admin', 'user'];

    return (
        <div className='container-fluid'>
            <div className='row'>

                <div className='col-md-2'>
                    <MenubarAdmin />
                </div>

                <div className='col'>

                    <h1>ManageAdmin Page</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created</th>
                                <th scope="col">Updated</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((item, index) => (
                                <tr>
                                    <th scope="row">{item.username}</th>
                                    <td>
                                        <Select
                                            style={{ width: '100%' }}
                                            value={item.role}
                                            onChange={(e) => handleOnchangeRole(e, item._id)}
                                        >

                                            {roleData.map((item, index) =>
                                                <Select.Option value={item} key={index}>
                                                    {item === 'admin'
                                                        ? <Tag color='green'>{item}</Tag>
                                                        : <Tag color='Red'>{item}</Tag>
                                                    }
                                                </Select.Option>
                                            )}

                                        </Select>
                                    </td>
                                    <td>
                                        <Switch
                                            checked={item.enabled}
                                            onChange={(e) => handleOnchange(e, item._id)}
                                        />
                                    </td>
                                    <td>
                                        {moment(item.updatedAt).format('DD/MM/YYYY')}
                                    </td>
                                    <td>
                                        {moment(item.updatedAt).startOf(item.updatedAt).fromNow()}
                                    </td>
                                    <td>
                                        <DeleteForeverOutlinedIcon
                                            onClick={() => handleRemove(item._id)} />
                                        <EditTwoToneIcon onClick={() => showModal(item._id)}/>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>New Password</p>
                        <input 
                        onChange={handleChangePassword}
                        type='text'
                        name= 'password'
                        />
                    </Modal>

                </div>
            </div>
        </div >
    )
}

export default ManageAdmin