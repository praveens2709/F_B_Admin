import React from 'react';
import customers from "../assets/images/customer.png"

const Customers: React.FC = () => {
    return (
        <>
        <div className='flex gap-4 items-center'>
            <div className='flex items-center justify-between p-1 bg-[#FFF9DD] w-10 h-10 rounded-md'>
                <img src={customers} alt="customers" className='w-full h-full' />
            </div>
            <h1 className="text-2xl text-[#FF6F61] font-medium pb-1">Customers</h1>
        </div>
        </>
    );
};

export default Customers;
