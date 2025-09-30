import React from 'react';
import PropTypes from 'prop-types';
import {Col, Form, Row} from "react-bootstrap";
import apiClient from "../logic/instance";

const UserProfile = props => {
    const { user } = props;
    const { id, name, role, phoneNumber, address, date_of_birth, profile_photo_path } = user;
    const [file, setFile] = React.useState(null);

    const upload = (event) => {
        event.preventDefault();
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('photo_file', file);

        apiClient.post('/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            response => {
                console.log(response.data);
                const user = response.data.data;
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.reload();
            }
        ).catch(
            error => {
                if (error.response) {
                    console.error('There was an error!', error.response.data);
                }
            }
        )

    }

    return (
        <>
            <div className="content" >
                <Row>
                    <Col md={3}>
                        <div className="user-profile">
                            <div className="profile-header">
                                <img src={profile_photo_path || 'https://via.placeholder.com/150'} alt="Profile" className="profile-photo img-thumbnail"/>
                                <h2>{name}</h2>
                                <p className="role">{role}</p>
                            </div>
                            <div className="profile-details">
                                <p><strong>ID:</strong> {id}</p>
                                <p><strong>Phone Number:</strong> {phoneNumber || 'N/A'}</p>
                                <p><strong>Address:</strong> {address || 'N/A'}</p>
                                <p><strong>Date of Birth:</strong> {date_of_birth || 'N/A'}</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={9}>
                        <div className="change-profile-picture">
                            <h3>Change Profile Picture</h3>
                            <Form>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label column="lg">Select a new profile picture:</Form.Label>
                                    <Form.Control type="file" name="profile_photo"  onChange={
                                        (e) => setFile(e.target.files[0])
                                    }
                                     />
                                </Form.Group>
                                <button type="submit" className="btn btn-primary" onClick={upload}>Upload</button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>

        </>
    );
};

UserProfile.propTypes = {
    user : PropTypes.object.isRequired,
};

export default UserProfile;
