import React, {useEffect} from 'react';
import Header from "../components/Header";
import apiClient from "../logic/instance";
import CountCard from "../components/CountCard";
import {Col, Row} from "react-bootstrap";
import UserCard from "../components/UserCard";

const Home = () => {
    const [numbers, setNumbers] = React.useState(null);
    const [randomUsers, setRandomUsers] = React.useState([]);

    useEffect(() => {
        apiClient.get('/numbers')
            .then(response => {
                console.log(response.data.data);
                setNumbers(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the numbers!', error);
            })
    }, []);

    useEffect(() => {
        apiClient.get('https://randomuser.me/api/?results=4')
            .then(response => {
                let data = response.data.results;
                let users = data.map(user => {
                    return {
                        name: `${user.name.first} ${user.name.last}`,
                        email: user.email,
                        picture: user.picture.large
                    }
                })

                setRandomUsers(users);
            })
            .catch(
                error => {
                    console.error('There was an error fetching the random users!', error);
                }
            )
    }, []);

    return (
        <>
            <Header title="Welcome to La Biblioteka"/>
            <div className="card-container">
                {
                    numbers !== null && <>
                        <CountCard title="Books" count={numbers.books}  iconClass="books"/>
                        <CountCard title="Authors" count={numbers.authors}  iconClass="authors"/>
                        <CountCard title="Genres" count={numbers.genres} iconClass="genre"/>
                        <CountCard title="Members" count={numbers.members} iconClass="members"/>
                    </>
                }

            </div>

            <h1 className="mt-5 text-center">Library founders</h1>

            <Row className="mt-3 mb-5">
                {
                    randomUsers.map((user, index) => (
                        <Col key={index} className="mb-5" md={3}>
                            <UserCard email={user.email} name={user.name} avatarUrl={user.picture}/>
                        </Col>
                    ))
                }
            </Row>
        </>
   );
};

export default Home;
