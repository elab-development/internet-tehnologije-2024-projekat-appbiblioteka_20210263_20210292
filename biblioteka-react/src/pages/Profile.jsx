import React from 'react';
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";

const Profile = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div>
            <Header title="My Profile"/>
            <UserProfile user={user} />
        </div>
    );
};

export default Profile;
