import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(window.innerWidth > 1024);

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setSidebarOpen(true);
            } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
                setSidebarOpen(false); // Default to collapsed
            } else {
                setSidebarOpen(false); // Default to hidden
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call on component mount to set initial state

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative flex h-screen transition-transform duration-300">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
