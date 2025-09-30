import React, {useEffect} from 'react';
import Header from "../components/Header";
import apiClient from "../logic/instance";
import {Row, Table} from "react-bootstrap";

const MyLends = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const [lends, setLends] = React.useState([]);

    useEffect(() => {
        apiClient.get('/users/'+user.id+'/lends')
            .then(response => {
                setLends(response.data.data);
            }).catch(error => {
                console.error('There was an error fetching your lends!', error);
        })
    }, []);

    return (
        <div>
            <Header title="My lends"/>
            <Row>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Title</th>
                        <th>Lend Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        lends.length > 0 ? lends.map((lend, index) => (

                            <tr key={lend.id} className={lend.status === 'returned' ? 'table-success' : ''}>
                                <td>{index + 1}</td>
                                <td>{lend.book_copy.book.title}</td>
                                <td>{new Date(lend.lend_date).toLocaleDateString()}</td>
                                <td>{lend.return_date ? new Date(lend.return_date).toLocaleDateString() : 'Not returned'}</td>
                                <td>{lend.status}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center">You have no lends.</td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </Row>
        </div>
    );
};

export default MyLends;
