import React from 'react';
import settings from "../assets/images/settings.png"

const Settings: React.FC = () => {
    return (
        <>
        <div className='flex gap-4 items-center'>
            <div className='flex items-center justify-between p-1 bg-[#FFF9DD] w-10 h-10 rounded-md'>
                <img src={settings} alt="settings" className='w-full h-full' />
            </div>
            <h1 className="text-2xl text-[#FF6F61] font-medium pb-1">Settings</h1>
        </div>
        </>
    );
};

export default Settings;
