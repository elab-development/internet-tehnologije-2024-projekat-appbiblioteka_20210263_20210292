import React from 'react';
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";

const Profile = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <div>
            <Header title="My Profile"/>
             {user && (
                <p className="pulse-text text-center mt-4 text-lg font-medium">
                    Welcome, {user.name}!
                </p>
            )}
            <UserProfile user={user} />
        </div>
    );
};

export default Profile;
