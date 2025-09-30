import React from 'react';
import Header from "../components/Header";
import useForm from "../logic/useForm";
import apiClient from "../logic/instance";
import {toast} from "react-toastify";
import {Col, Form, Row} from "react-bootstrap";

const Register = () => {

    const {data, handleChange, resetForm} = useForm({
        email: '',
        password: '',
        name: '',
        address: '',
        phone_number: '',
        date_of_birth: '',
    });

    const register = (e) => {
        e.preventDefault();

        apiClient.post('/register', {
            ...data,
            role: 'member',
            date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().slice(0, 10) : null
        }).then(response => {
            console.log(response.data);
            toast.success('Registration successful!');
        }).catch(

            error => {
                if (error.response) {
                    console.error('There was an error!', error.response.data);
                }
                toast.error('Registration failed!');
            }

        )

    }
    return (
        <div>
            <Header title="Register member"/>


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

                        <Form.Control
                            placeholder="Full Name"
                            aria-label="Enter full name"
                            aria-describedby="basic-addon3"
                            value={data.name}
                            onChange={handleChange}
                            name="name"
                            className="mb-3"
                        />

                        <Form.Control
                            placeholder="Address"
                            aria-label="Enter address"
                            aria-describedby="basic-addon4"
                            value={data.address}
                            onChange={handleChange}
                            name="address"
                            className="mb-3"
                        />

                        <Form.Control
                            placeholder="Phone Number"
                            aria-label="Enter phone number"
                            aria-describedby="basic-addon5"
                            value={data.phone}
                            onChange={handleChange}
                            name="phone_number"
                            className="mb-3"
                        />

                        <Form.Control
                            placeholder="Date of Birth"
                            aria-label="Enter date of birth"
                            aria-describedby="basic-addon6"
                            value={data.date_of_birth}
                            onChange={handleChange}
                            name="date_of_birth"
                            className="mb-3"
                            type="date"
                        />

                        <hr/>
                        <button onClick={register} type="button" className="btn btn-primary me-2">Register member</button>
                    </Form>
                </Col>
            </Row>

        </div>
    );
};

export default Register;
