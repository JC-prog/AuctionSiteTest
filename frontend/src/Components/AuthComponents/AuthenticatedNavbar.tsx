import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// icons
import { Bell, User, ShoppingBag, ScrollText, Gavel, Bookmark, LogOut } from 'lucide-react';

const AuthenticatedNavbar = () => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        Cookies.remove('access_token');

        toast.success('Logout Successful');
    
        setTimeout(() => {
        navigate('/');

        window.location.reload;

        }, 1000);
    }

  return (
    <>
        <button>
            <Link to="/mybids"> 
                <Gavel />
            </Link>
        </button>

        <button>
        <Link to="/wishlist">
            <Bookmark />
        </Link>
        </button>
    
        <button>
        <Link to="/my-listings">
            <ScrollText />
        </Link>
        </button>
        
        <button>
        <Link to="/my-purchase">
            <ShoppingBag />
        </Link>
        </button>
        
        <button>
        <Bell />
        </button>
        
        <button>
        <Link to="/profile">
            <ShoppingBag />
        </Link>
        </button>

        <button>
            <Link to="/profile">
                <User />
            </Link>
        </button>

        <button onClick={ handleLogout }>
            <LogOut />
        </button>
    </>
  )
}

export default AuthenticatedNavbar;
