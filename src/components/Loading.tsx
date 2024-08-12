import React from 'react';
import loading from "../assets/images/flowerloader.gif"

const Loading: React.FC = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex items-center space-x-2">
            <img src={loading} alt="loading" className="w-28" />
        </div>
    </div>
);

export default Loading;
