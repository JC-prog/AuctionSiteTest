import React from 'react';
import HomeSidebar from '../Components/Sidebar/HomeSidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl">Page Header</h1>
            </header>
            <div className="flex flex-1">
                <HomeSidebar />
                <main className="flex-1 p-8 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
