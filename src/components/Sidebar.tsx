import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTachometerAlt, faUsers, faUser, faCog, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setOpenMenu, setLoading } from '../redux/menuSlice';
import Loading from './Loading';
import flower from "../assets/images/Flower.png";
import logout from "../assets/images/turn-off.png";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const dispatch = useDispatch();
    const { openMenu, loading } = useSelector((state: RootState) => state.menu);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.replace('/', '');
        if (path) {
            dispatch(setLoading(true));
            dispatch(setOpenMenu(path));
        }

        const timeout = setTimeout(() => {
            dispatch(setLoading(false));
        }, 500);

        return () => clearTimeout(timeout);
    }, [dispatch, location.pathname]);

    const handleMenuClick = (menu: string) => {
        if (openMenu !== menu) {
            dispatch(setLoading(true));
            dispatch(setOpenMenu(menu));
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

    return (
        <>
            {loading && <Loading />}
            <aside
                className={`bg-white h-screen flex flex-col p-4 transition-all ${isOpen ? 'w-72' : 'w-24'} relative`}
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
                                        className={`px-4 py-2 mb-2 cursor-pointer flex items-center space-x-4 rounded-md transition-colors relative ${!isOpen && 'justify-center'} ${isSelected(menu) ? 'bg-[#FF6F61] text-white' : 'hover:bg-orange-100'}`}
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
        </>
    );
};

export default Sidebar;