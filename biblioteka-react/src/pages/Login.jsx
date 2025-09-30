import React from 'react';
import Header from "../components/Header";
import {Col, Form, Row} from "react-bootstrap";
import useForm from "../logic/useForm";
import apiClient from "../logic/instance";
import {toast} from "react-toastify";

const Login = () => {

    const {data, handleChange, resetForm} = useForm({
        email: '',
        password: ''
    });

    const login = (e) => {
        e.preventDefault();

        apiClient.post('/login', data).then(response => {
            console.log(response.data);
            const token = response.data.data.token;
            const user = response.data.data.user;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/profile';
        }).catch(

            error => {
                toast.error('Login failed!');
                if (error.response) {
                    console.error('There was an error!', error.response.data);
                }
            }

        )

    }

    return (
        <>
            <Header title="Login page"/>

            <Row>
                <p>This is the login page. You can log in with your username and password.</p>
                <p>If you don't have an account, please register at our library admins.</p>
                <p>After logging in, you will be redirected to your profile page.</p>
                <p>From there, you can view your profile information and manage your lends.</p>
            </Row>

            <Row>
                <Col md={12}>
                    <Form>
                        <Form.Control
                            placeholder="Email"
                            aria-label="Enter email"
                            aria-describedby="basic-addon1"
                            value={data.email}
                            onChange={handleChange}
                            name="email"
                            className="mb-3"
                            type="email"
                        />

                        <Form.Control
                            placeholder="Password"
                            aria-label="Enter password"
                            aria-describedby="basic-addon2"
                            value={data.password}
                            onChange={handleChange}
                            name="password"
                            className="mb-3"
                            type="password"
                        />
                        <hr/>
                        <button onClick={login} type="button" className="btn btn-primary me-2">Login</button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Login;
