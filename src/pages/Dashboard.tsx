import React from 'react';
import dashboard from "../assets/images/dashboard.png"

const Dashboard: React.FC = () => {
    return (
        <>
        <div className='flex gap-4 items-center'>
            <img src={dashboard} alt="dashboard" className='w-10 h-10' />
            <h1 className="text-2xl text-[#FF6F61] font-medium pb-1">Dashboard</h1>
        </div>
        </>
    );
};

export default Dashboard;
