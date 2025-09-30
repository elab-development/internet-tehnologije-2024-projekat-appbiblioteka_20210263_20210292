import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../images/logo-biblioteka-nobg.png';

const NavbarMenu = () => {

    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const isAdmin = user ? user.role === 'admin' : false;

    const logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/"><img src={logo} width="100px" height="100px" alt="La biblioteka"/></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About La Biblioteka</Nav.Link>
                        <Nav.Link href="/books">Books</Nav.Link>
                        {
                            token && (
                                <>
                                    <Nav.Link href="/my-lends">My lends</Nav.Link>

                                    {
                                        isAdmin && (
                                            <>
                                                <Nav.Link href="/register">Register member</Nav.Link>
                                                <Nav.Link href="/admin">Admin Panel</Nav.Link>
                                            </>
                                        )
                                    }
                                    <Nav.Link href="/profile">Profile</Nav.Link>
                                    <Nav.Link href="/logout" onClick={logout}>Logout</Nav.Link>
                                </>
                            )
                        }

                        {
                            !token && (
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarMenu;
