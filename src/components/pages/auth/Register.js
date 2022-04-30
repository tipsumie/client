import React, { useState } from 'react';
import { register } from '../../functions/auth';
// Bootstrap
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import registerIcon from '../../../image/person-workspace.svg';
// Toastify
import { toast } from 'react-toastify';

const Register = () => {
    const [value, setValue] = useState({
        username: "",
        password: "",
        password1: ""
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.password !== value.password1) {
            toast.error("Password not match!");
        } else {
            register(value)
                .then((res) => {
                    console.log(res);
                    toast.success(res.data)
                })
                .catch((err) => {
                    console.log(err.response.data);
                    toast.error(err.response.data)
                });
        }
    };


    return (

        <div>
            <Container>

                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <div className='mt-5 p-3 text-center'>
                            <img className='login-icon' style={{ width: '70px', height: '70px' }} src={registerIcon} alt="person-icon" />
                            <h3 className="mt-5">Register Now</h3>
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

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password1"
                                    name='password1'
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button
                                variant="secondary btn-block"
                                type="submit"
                                disabled={value.password.length < 6}
                            >
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Register


