import React, {useEffect} from 'react';
import Header from "../components/Header";
import apiClient from "../logic/instance";
import {Col, Form, Row, Table} from "react-bootstrap";
import {FaDownload, FaTrash} from "react-icons/fa";
import useForm from "../logic/useForm";
import {toast} from "react-toastify";
import {Chart} from "react-google-charts";
import {CSVLink} from "react-csv";

const Admin = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const [members, setMembers] = React.useState([]);
    const [books, setBooks] = React.useState([]);
    const [lends, setLends] = React.useState([]);
    const [link, setLink] = React.useState('/books/paginate');
    const [buttons, setButtons] = React.useState([]);
    const [choosenMember, setChosenMember] = React.useState(null);
    const [bookCopies, setBookCopies] = React.useState([]);
    const [forceRerender, setForceRerender] = React.useState(false);
    const [chartData, setChartData] = React.useState([]);

    const {data, handleChange, resetForm} = useForm({
        'book_copy_id' : '',
        'lend_date' : '',
        'return_date' : ''
    });

    useEffect(() => {
        apiClient.get('/members').then(
            response => {
                setMembers(response.data.data);
            }
        ).catch(
            error => {
                console.error('There was an error!', error);
            }
        )
    }, []);

    useEffect(() => {
        apiClient.get(link).then(
            response => {
                setBooks(response.data.data.data);
                setButtons(response.data.data.links);
            }).catch(
            error => {
                console.error('There was an error!', error);
            })
    }, [link]);

    useEffect(() => {
        if (choosenMember) {
            apiClient.get('/users/' + choosenMember.id + '/lends').then(
                response => {
                    setLends(response.data.data);
                }
            ).catch(
                error => {
                    console.error('There was an error!', error);
                }
            )
        }
    }, [choosenMember, forceRerender]);

    useEffect(() => {
        apiClient.get('/available-book-copies').then(
            response => {
                setBookCopies(response.data.data);
            }
        ).catch(
            error => {
                console.error('There was an error!', error);
            }
        )
    }, [forceRerender]);

    useEffect(() => {
        apiClient.get('/book-copies-per-status').then(
            response => {
                const chartDataFromApi = [
                    ['Status', 'Count'],
                    ...response.data.data.map(item => [item.status, item.total])
                ];
                setChartData(chartDataFromApi);
            }).catch(
            error => {
                console.error('There was an error!', error);
            }
        )
    }, []);

    const lendABook = () => {
        if (!choosenMember) {
            toast.error('Please select a member first by clicking the Details button next to their name.');
            return;
        }
        apiClient.post('/lends', {
            book_copy_id: data.book_copy_id,
            user_id: choosenMember.id,
            lend_date: new Date(data.lend_date).toISOString().slice(0, 10),
            return_date: data.return_date ? new Date(data.return_date).toISOString().slice(0, 10) : null,
        }).then(response => {
            console.log(response.data);
            toast.success('Book lent successfully!');
            setForceRerender(!forceRerender);
        }).catch(
            error => {
                if (error.response) {
                    console.error('There was an error!', error.response.data);
                }
                toast.error('Lending failed!');
            }
        )
    }


    return (
        <>
            <Header title="Admin pages"/>
            <Row>
                <Col md={6} className="mb-3">
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Entity', 'Count'],
                            ['Books', books.length],
                            ['Members', members.length],
                            ['Lends', lends.length],
                            ['Available Book Copies', bookCopies.length],
                        ]}
                        options={{
                            title: 'Library Overview',
                            chartArea: {width: '50%'},
                            hAxis: {
                                title: 'Total Count',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Entity',
                            },
                        }}
                    />
                </Col>
                <Col md={6} className="mb-3">
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData}
                        options={{
                            title: 'Book Copies per Status',
                            chartArea: {width: '50%'},
                            hAxis: {
                                title: 'Total Count',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Status',
                            },
                        }}
                    />
                    <div className="text-center" >
                        <CSVLink data={chartData} className="btn btn-secondary mt-2" filename="booksByStatus.csv">
                            <FaDownload/> Export Chart Data as CSV
                        </CSVLink>
                    </div>

                </Col>
            </Row>

            <Row>
                <Col md={6} className="mb-5">
                    <h2 className="text-center mt-3">Members</h2>
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            members.length > 0 ? members.map((member, index) => (
                                <tr key={index}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.address}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm"
                                                onClick={() => setChosenMember(member)}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No members found.</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </Col>
                <Col md={6} className="mb-5">
                    <h2 className="text-center mt-3">Member lends</h2>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Title</th>
                            <th>Lend Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            lends.length > 0 ? lends.map((lend, index) => (

                                <tr key={lend.id} className={lend.status === 'returned' ? 'table-success' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{lend.book_copy.book ? lend.book_copy.book.title : 'Not known'}</td>
                                    <td>{new Date(lend.lend_date).toLocaleDateString()}</td>
                                    <td>{lend.return_date ? new Date(lend.return_date).toLocaleDateString() : 'Not returned'}</td>
                                    <td>{lend.status}</td>
                                    <td>
                                        {lend.status !== 'returned' && (
                                            <button className="btn btn-success btn-sm"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to mark this lend as returned?')) {
                                                            apiClient.patch('/lends/' + lend.id + '/return')
                                                                .then(response => {
                                                                    toast.success('Lend marked as returned!');
                                                                    setForceRerender(!forceRerender);
                                                                }).catch(error => {
                                                                console.error('There was an error!', error);
                                                            })
                                                        }
                                                    }}
                                            >
                                                Mark as returned
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center">You have no lends.</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    <hr/>
                    <Form>
                        <h3 className="text-center">Lend a book</h3>
                        <Form.Group className="mb-3" controlId="formBookCopy">
                            <Form.Label column="lg">Book Copy</Form.Label>
                            <Form.Select
                                name="book_copy_id"
                                value={data.book_copy_id}
                                onChange={handleChange}
                            >
                                <option value="">Select a book copy</option>
                                {
                                    bookCopies.map((copy) => (
                                        <option key={copy.id} value={copy.id}>
                                            {copy.book.title} - Copy #{copy.id}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLendDate">
                            <Form.Label column="lg">Lend Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="lend_date"
                                value={data.lend_date}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formReturnDate">
                            <Form.Label column="lg">Return Date (optional)</Form.Label>
                            <Form.Control
                                type="date"
                                name="return_date"
                                value={data.return_date}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={lendABook}
                            disabled={!choosenMember || !data.book_copy_id || !data.lend_date}
                        >
                            Lend Book
                        </button>
                    </Form>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={12}>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            books.length > 0 ? books.map((book, index) => (
                                <tr key={index}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.name}</td>
                                    <td>{book.genre_name}</td>
                                    <td>{book.published_year}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this book?')) {
                                                        apiClient.delete('/books/' + book.id)
                                                            .then(response => {
                                                                setBooks(books.filter(b => b.id !== book.id));
                                                            }).catch(error => {
                                                            console.error('There was an error!', error);
                                                        })
                                                    }
                                                }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No books found.</td>
                                </tr>
                            )
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="6">
                                <div className="d-flex justify-content-center">
                                    {
                                        buttons.map((button, index) => (
                                            <button
                                                key={index}
                                                className={`btn btn-sm mx-1 ${button.active ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => {
                                                    if (button.url) {
                                                        setLink(button.url);
                                                    }
                                                }}
                                                disabled={!button.url}
                                            >
                                                <span dangerouslySetInnerHTML={{__html: button.label}}/>
                                            </button>
                                        ))
                                    }
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                    </Table>
                </Col>
            </Row>
        </>
    );
};

export default Admin;
