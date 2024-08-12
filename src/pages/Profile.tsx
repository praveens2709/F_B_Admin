import React from 'react';
import profile from "../assets/images/user.png";

const Profile: React.FC = () => {
    return (
        <>
        <div className='flex gap-4 items-center'>
            <div className='flex items-center justify-between p-1 bg-[#FFF9DD] w-10 h-10 rounded-md'>
                <img src={profile} alt="profile" className='w-full h-full' />
            </div>
            <h1 className="text-2xl text-[#FF6F61] font-medium pb-1">Profile</h1>
        </div>
        </>
    );
};

export default Profile;
