import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";

const UserCard = props => {
    return (
        <>
            <Card>
                <Card.Img variant="top" src={props.avatarUrl} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.email}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
};

export default UserCard;
