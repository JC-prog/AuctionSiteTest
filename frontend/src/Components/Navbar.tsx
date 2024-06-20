import React, { useState, useEffect } from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// Icons

// Components
import SearchBar from "./SearchBar";
import LoginSignup from "./LoginSignup";
import NavbarNotificationButton from './Buttons/NavbarNotificationButton';
import NavbarLogoutButton from './Buttons/NavbarLogoutButton';
import NavbarProfileButton from './Buttons/NavbarProfileButton';

interface DecodedToken {
  sub: string; // Assuming 'sub' is the field containing user information
  // Add other fields as needed based on your JWT payload
}

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();


// Function to check authentication status
const checkAuthentication = () => {
  const accessToken = Cookies.get('access_token');
  if (accessToken) {
    setAuthenticated(true);

    try {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      setUser(decodedToken.sub || null);

    } catch (error) {
      console.error('Error decoding token:', error);
      setUser(null);
    }

  } else {
    setAuthenticated(false);
  }
};

// Check authentication status on component mount
useEffect(() => {
  checkAuthentication();
}, []);

// Function to navigate to Notification
const redirectToNotification= () => {
  if (user) {
    navigate(`/notification/${user}`);
  }
};

// Function to navigate to Profile
const redirectToProfile = () => {
  if (user) {
    navigate(`/user/${user}`);
  }
};

// Function to handle logout
const handleLogout = () => {
  Cookies.remove('access_token');
  setAuthenticated(false);

  toast.success('Logout Successful');

  setTimeout(() => {
    navigate('/');
  }, 1000);
  
};

  return (
    <>
      <div className="navbar">
        <div className="navbar-brand">
          <a href="/"><img src='./logo.svg' /></a>
        </div>

        <div className="menu-search-container">
            <SearchBar />
        </div>

        <div>
          {authenticated ? (
            <div>
              <NavbarNotificationButton redirectToNotification={ redirectToNotification } />

              <NavbarProfileButton redirectToProfile={ redirectToProfile }/>
              
              <NavbarLogoutButton handleLogout={ handleLogout } />
            </div>
          ) : (
            <LoginSignup />
          )}

        </div>
      </div>
    </>
   
  )
}

export default Navbar