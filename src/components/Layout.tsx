import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="relative flex h-screen transition-transform duration-300">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col">
                <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
                <main className="flex-grow p-4 relative">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
