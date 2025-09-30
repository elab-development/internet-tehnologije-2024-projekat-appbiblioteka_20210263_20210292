import React, {useEffect} from 'react';
import Header from "../components/Header";
import {Form, InputGroup, Row, Table} from "react-bootstrap";
import apiClient from "../logic/instance";

const Books = () => {
    const [query, setQuery] = React.useState('');
    const [books, setBooks] = React.useState([]);

    useEffect(() => {
        if (query.length > 2) {
            apiClient.get('/books/search?q=' + query).then(response => {
                console.log(response.data);
                setBooks(response.data.data);
            }).catch(error => {
                console.error('There was an error!', error);
            });
        }
    }, [query]);

    return (
        <div>
            <Header title="Books"/>
            <div className="content">

                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search for books"
                        aria-label="Search for books"
                        aria-describedby="basic-addon1"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <InputGroup.Text id="basic-addon1">Your favourite book</InputGroup.Text>
                </InputGroup>
                <Row className="mt-3">
                    {
                        books.length > 0 && (
                            <>
                                <Table hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Genre</th>
                                        <th>Year</th>
                                        <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        books.map((book, index) => (
                                            <tr key={book.id}>
                                                <td>{index + 1}</td>
                                                <td>{book.title}</td>
                                                <td>{book.author.name}</td>
                                                <td>{book.genre.genre_name}</td>
                                                <td>{book.published_year}</td>
                                                <td>{book.description}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                            </>
                        )
                    }
                </Row>
            </div>
        </div>
    );
};

export default Books;
