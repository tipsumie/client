import React, { useState } from 'react';
// Functions
import { login } from '../../functions/auth';
// Redux
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Bootstrap
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import loginIcon from '../../../image/person-circle.svg';
// Toastify
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin/index');
    } else {
      navigate('/user/index');
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(value)
      .then((res) => {
        //  console.log(res);
        toast.success(res.data.payload.user.username + ' login success')

        dispatch({
          type: 'LOGIN',
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          }
        });

        localStorage.setItem('token', res.data.token);
        roleBaseRedirect(res.data.payload.user.role);

      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data)
      });

  };

  return (

    <div>
      <Container>

        <Row className="mt-5">
          <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
            <div className='mt-5 p-3 text-center'>
              <img className='login-icon' style={{ width: '70px', height: '70px' }} src={loginIcon} alt="person-icon" />
              <h3 className="mt-5">Login your account</h3>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name='username'
                  placeholder="Enter username"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name='password'
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="secondary btn-block"
                type="submit"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>
    </div>

  )
}

export default Login