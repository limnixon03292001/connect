import React from 'react'
import Left from  '../Homepage/components/Left';
import Right from  '../Homepage/components/Right';
import MiddleProfile from  './components/MiddleProfile';

const Profile = () => {
    return (
        <div className="grid grid-cols-12  md:gap-5 max-w-6xl m-auto w-full text-white p-2">
            <Left/>
            <MiddleProfile />
            <Right/>
        </div>
    )
}

export default Profile
