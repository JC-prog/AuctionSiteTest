import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Icons
import { IoExitOutline } from 'react-icons/io5';

// Interface
import IAuth from "../interfaces/IAuth";

// Components
import SearchBar from "./SearchBar";

const Navbar: React.FC<IAuth> = ({ isAuth }) => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        Cookies.remove('access_token');
        toast.success('Logout Successful');

        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 1000);
    };

    const handleNavigateHome = () => {
        navigate('/', { replace: true });
        window.location.reload();
    };

    return (
        <div className="flex justify-between items-center bg-gray-800 text-gray-100 px-4 py-2">
            <button 
                className="text-2xl font-bold" 
                onClick={handleNavigateHome}
            >
                EzAuction
            </button>
            <div className="flex-1 flex justify-center px-4">
                <SearchBar />
            </div>
            <div className="flex items-center space-x-4 relative">
                
                {isAuth && (
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center text-sm gap-2 font-medium p-2 hover:bg-gray-700 rounded-md"
                    >
                        <IoExitOutline size={20} />
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
