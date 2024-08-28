import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// icons
import { Bell, User, ShoppingBag, ScrollText, Gavel, Bookmark, LogOut } from 'lucide-react';

interface Props {
    user: string;
}

const AuthenticatedNavbar : React.FC<Props> = ({ user }) => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        Cookies.remove('access_token');

        toast.success('Logout Successful');
    
        setTimeout(() => {
            navigate('/login');

            window.location.reload;

        }, 2000);
    }

  return (
    <>
        <button>
            <Link to="/my-bids"> 
                <Gavel />
            </Link>
        </button>

        <button>
        <Link to="/watchlist">
            <Bookmark />
        </Link>
        </button>
    
        <button>
        <Link to="/my-listings">
            <ScrollText />
        </Link>
        </button>
        
        <button>
        <Bell />
        </button>
        
        <button>
        <Link to={`/my-purchase/${user}`}>
                <ShoppingBag />
            </Link>
        </button>

        <button>
            <Link to={`/user/${user}`}>
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
