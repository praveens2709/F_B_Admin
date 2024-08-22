import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTachometerAlt, faUsers, faUser, faCog, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setOpenMenu } from '../redux/menuSlice';
import flower from "../assets/images/Flower.png";
import logout from "../assets/images/turn-off.png";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { openMenu } = useSelector((state: RootState) => state.menu);
    const location = useLocation();
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(window.innerWidth >= 768);

    React.useEffect(() => {
        const path = location.pathname.replace('/', '');
        if (path) {
            dispatch(setOpenMenu(path));
        }
    }, [dispatch, location.pathname]);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarVisible(isOpen); // Set visibility based on isOpen state
            } else {
                setIsSidebarVisible(true); // Always visible on larger screens
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call on component mount to set initial state

        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    const handleMenuClick = (menu: string) => {
        if (openMenu !== menu) {
            dispatch(setOpenMenu(menu));
        }
        // Hide sidebar completely on screens below 768px
        if (window.innerWidth < 768) {
            onClose(); // Close the sidebar and reset the icon
            setIsSidebarVisible(false);
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            setIsSidebarVisible(true); // Keep it collapsed but visible on screens between 768px and 1024px
        }
    };

    const isSelected = (menu: string) => openMenu === menu;

    const getIcon = (menu: string): IconProp => {
        switch (menu) {
            case 'dashboard':
                return faTachometerAlt as IconProp;
            case 'moderators':
                return faUserTie as IconProp;
            case 'customers':
                return faUsers as IconProp;
            case 'profile':
                return faUser as IconProp;
            case 'settings':
                return faCog as IconProp;
            default:
                return faTachometerAlt as IconProp;
        }
    };

    if (!isSidebarVisible && window.innerWidth < 768) return null;

    return (
        <aside
            className={`bg-white h-screen flex flex-col p-4 transition-all ${isOpen ? 'w-72' : 'w-24'} ${
                !isSidebarVisible ? 'hidden' : ''
            } ${window.innerWidth >= 768 && window.innerWidth <= 1024 && !isOpen ? 'w-24' : ''} ${
                window.innerWidth < 1024 ? 'sticky top-0 left-0 z-50 w-24' : ''
            }`}
        >
            <div className="bg-[#FFF5E1] pt-4 px-4 rounded-t-lg flex-grow flex flex-col">
                <div className="pb-5 flex items-center space-x-2">
                    <img src={flower} alt="Logo" className={`w-8 h-8 ${isOpen ? '' : 'mx-auto'}`} />
                    {isOpen && <span className="text-xl text-[#FF6F61] font-bold">F&B Admin</span>}
                </div>
                <nav className="flex-grow relative">
                    <ul>
                        {['dashboard', 'moderators', 'customers', 'profile', 'settings'].map(menu => (
                            <Link key={menu} to={`/${menu}`}>
                                <li
                                    className={`px-4 py-2 mb-2 cursor-pointer flex items-center space-x-4 rounded-md transition-colors relative ${
                                        !isOpen && 'justify-center'
                                    } ${isSelected(menu) ? 'bg-[#FF6F61] text-white' : 'hover:bg-orange-100'}`}
                                    onClick={() => handleMenuClick(menu)}
                                >
                                    <FontAwesomeIcon
                                        icon={getIcon(menu)}
                                        className="w-5 h-5"
                                    />
                                    {isOpen && <span>{menu.charAt(0).toUpperCase() + menu.slice(1)}</span>}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className={`mt-auto relative ${!isOpen ? 'flex justify-center' : ''}`}>
                <button
                    onClick={() => console.log("Logged out")}
                    className={`w-full px-5 py-2 flex items-center space-x-4 bg-[#FF6F61] text-white rounded-b-lg font-semibold relative`}
                >
                    <img src={logout} className="w-6 h-6" alt="Logout" />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
