import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import moderators from "../assets/images/badge.png";
import rajesh from "../assets/images/rajesh.jpg";
import khushal from "../assets/images/khushal.png";
import { useDispatch } from 'react-redux';
import { setOpenMenu } from '../redux/menuSlice';

const data = [
    {
        id: 1,
        profileImage: rajesh,
        name: 'Rajesh Bishnoi',
        email: 'raja@example.com',
        dateTime: '2024-08-08 12:34:56'
    },
    {
        id: 2,
        profileImage: khushal,
        name: 'Khushal Saboo',
        email: 'saboo@example.com',
        dateTime: '2024-08-09 12:34:56'
    },
];

const Moderators: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openActions, setOpenActions] = useState<number | null>(null);
    const [modalType, setModalType] = useState<'edit' | 'delete' | 'add' | null>(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setOpenMenu('moderators'));
    }, [dispatch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z0-9]*$/.test(value)) {
            setSearchTerm(value);
        }
    };

    const filteredData = data.filter(mod =>
        mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mod.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const closeModal = () => {
        setModalType(null);
    };

    return (
        <div className="relative">
            <div className='flex gap-4 mb-4 items-center'>
                <img src={moderators} alt="moderators" className='w-10 h-10' />
                <h1 className="text-2xl text-[#FF6F61] font-medium">Moderators</h1>
            </div>
            <div className="mb-4 flex items-center justify-between">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by name or email"
                    className="border p-2 w-full max-w-xs border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
                />
                <button 
                    onClick={() => setModalType('add')}
                    className="ml-4 px-4 py-2 bg-[#FF6F61] text-white rounded hover:bg-white hover:text-[#FF6F61] border-2 border-[#FF6F61] font-semibold flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus as IconProp} className="mr-2" />
                    Add Moderator
                </button>
            </div>
            <table className="min-w-full bg-white border border-[#FF6F61] rounded-lg">
                <thead>
                    <tr className="bg-[#FFF5E1] text-black border-b border-[#FF6F61]">
                        <th className="p-2 text-center">Profile</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Date & Time</th>
                        <th className="p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(mod => (
                        <tr key={mod.id} className="hover:bg-gray-100 border-b  border-[#FF6F61]">
                            <td className="p-2 flex items-center justify-center">
                                <img src={mod.profileImage} alt={mod.name} className="w-10 h-10 rounded-full" />
                            </td>
                            <td className="p-2 text-left">{mod.name}</td>
                            <td className="p-2 text-left">{mod.email}</td>
                            <td className="p-2 text-left">{new Date(mod.dateTime).toLocaleString()}</td>
                            <td className="p-2 text-center">
                                <FontAwesomeIcon
                                    icon={faEdit as IconProp}
                                    onClick={() => {
                                        setOpenActions(mod.id);
                                        setModalType('edit');
                                    }}
                                    className="cursor-pointer mx-2 text-neutral-500"
                                />
                                <FontAwesomeIcon
                                    icon={faTrash as IconProp}
                                    onClick={() => {
                                        setOpenActions(mod.id);
                                        setModalType('delete');
                                    }}
                                    className="cursor-pointer mx-2 text-[#FF6F61]"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modals */}
            {modalType && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        {modalType === 'edit' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Edit Moderator</h2>
                                {/* Empty form for editing */}
                                <div className="mt-4 flex justify-end gap-3">
                                    <button onClick={closeModal} className="w-full px-4 py-1 bg-gray-400 text-white rounded hover:bg-white hover:text-gray-500 border-2 border-gray-400">
                                        CANCEL
                                    </button>
                                    <button onClick={closeModal} className="w-full px-4 py-1 bg-[#FF6F61] text-white rounded hover:bg-white hover:text-[#FF6F61] border-2 border-[#FF6F61]">
                                        EDIT
                                    </button>
                                </div>
                            </div>
                        )}
                        {modalType === 'delete' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Delete Moderator</h2>
                                <p className='mb-5'>Are you sure you want to remove this moderator?</p>
                                <div className="mt-4 flex justify-end gap-3">
                                    <button onClick={closeModal} className="w-full px-4 py-1 bg-gray-400 text-white rounded hover:bg-white hover:text-gray-500 border-2 border-gray-400">
                                        CANCEL
                                    </button>
                                    <button onClick={closeModal} className="w-full px-4 py-1 bg-[#FF6F61] text-white rounded hover:bg-white hover:text-[#FF6F61] border-2 border-[#FF6F61]">
                                        REMOVE
                                    </button>
                                </div>
                            </div>
                        )}
                        {modalType === 'add' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-5">Add Moderator</h2>
                                {/* Empty form for adding */}
                                <div className="mt-4 flex justify-end gap-3">
                                    <button onClick={closeModal} className="w-full px-4 py-1 bg-gray-400 text-white rounded hover:bg-white hover:text-gray-500 border-2 border-gray-400">
                                        CANCEL
                                    </button>
                                    <button onClick={closeModal} className="w-full px-4 py-1 bg-[#FF6F61] text-white rounded hover:bg-white hover:text-[#FF6F61] border-2 border-[#FF6F61]">
                                        ADD MODERATOR
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Moderators;