import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBell, faEnvelope, faBars, faTimes, faAngleDown, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import admin from "../assets/images/man.png";
import welcome from "../assets/images/smiling (1).png";
import { useTheme } from '../utils/ThemeContext';
import Dropdown from './Dropdown';

interface HeaderProps {
    onToggleSidebar: () => void;
    sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarOpen }) => {
    const { theme, setTheme } = useTheme();
    const [animateMessage, setAnimateMessage] = useState(false);

    const toggleDarkMode = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    useEffect(() => {
        const showTimeout = setTimeout(() => {
            setAnimateMessage(true);
        }, 100);

        const hideTimeout = setTimeout(() => {
            setAnimateMessage(false);
        }, 3500);

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, []);

    const notifications = [
        { label: 'Notification 1' },
        { label: 'Notification 2' },
        { label: 'Notification 3' }
    ];

    const messages = [
        { label: 'Message 1' },
        { label: 'Message 2' },
        { label: 'Message 3' }
    ];

    const profileOptions = [
        { label: 'Profile', icon: faUser as IconProp },
        { label: 'Settings', icon: faCog as IconProp },
        { label: 'Logout', icon: faSignOutAlt as IconProp }
    ];

    return (
        <header
            className={`flex items-center justify-between p-4 ${
                theme === 'dark' ? 'bg-gray-800 text-[#FFF5E1]' : 'bg-white text-[#FF6F61]'
            }`}
        >
            <button onClick={onToggleSidebar} className="mr-4">
                <FontAwesomeIcon
                    icon={sidebarOpen ? faTimes as IconProp : faBars as IconProp}
                    size="lg"
                    className="transition-transform duration-300"
                />
            </button>
            <div className="flex-grow flex justify-center">
                <p
                    className={`flex items-center gap-2 text-xl font-semibold transition-all duration-500 ease-in-out transform ${
                        animateMessage ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
                >
                    Welcome back Admin <img src={welcome} alt="welcome" className='w-8' />
                </p>
            </div>
            <div className="flex items-center space-x-6">
                <button onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={theme === 'dark' ? faSun as IconProp : faMoon as IconProp} size="lg" />
                </button>

                <Dropdown
                    toggle={<FontAwesomeIcon icon={faBell as IconProp} size="lg" />}
                    title="Notifications"
                    items={notifications}
                />

                <Dropdown
                    toggle={<FontAwesomeIcon icon={faEnvelope as IconProp} size="lg" />}
                    title="Messages"
                    items={messages}
                />

                <Dropdown
                    toggle={
                        <>
                            <div className="w-10 h-10 flex align-middle justify-center rounded-full bg-white border-2 border-neutral-500">
                                <img src={admin} alt="Admin Profile" className="w-full rounded-full" />
                            </div>
                            <span className="font-semibold">Praveen</span>
                            <FontAwesomeIcon icon={faAngleDown as IconProp} size="sm" />
                        </>
                    }
                    width="w-36"
                    items={profileOptions}
                    onItemClick={(item) => console.log(item.label)}
                    title="Administrator"
                >
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;