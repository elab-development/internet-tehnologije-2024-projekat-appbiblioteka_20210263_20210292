import React from 'react';
import Header from "../components/Header";
import logo from '../images/citat.png';

const About = () => {
    return (
        <div>
            <Header title="About La Biblioteka"/>
            <div className="content">
                <p>Welcome to La Biblioteka, your go-to library management system. Our platform is designed to make it easy for you to manage your book collection, track lends, and register new members.</p>
                <p>With La Biblioteka, you can:</p>
                <ul>
                    <li>View and manage your book collection</li>
                    <li>Track who has borrowed which books</li>
                    <li>Register new members quickly and easily</li>
                    <li>Access your profile and update your information</li>
                </ul>
                <p>We are committed to providing a seamless experience for library administrators and members alike. Thank you for choosing La Biblioteka!</p>

        <div className="flex justify-center items-center mt-8">
             <a href="/books">
                    <img
                        src={logo}
                        alt="Citat"
                      style={{ width: '1000px', height: 'auto' }}
                        className="rounded-2xl shadow-lg"
                    />
                 </a>
                </div>

         </div>

        </div>
    );
};

export default About;
