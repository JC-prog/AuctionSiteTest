import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { FaUser } from 'react-icons/fa';

// Components
import SearchBar from "./SearchBar";
import LoginSignup from "./LoginSignup";

// CSS
import "../Styles/Navbar.scss"

interface DecodedToken {
  sub: string; // Assuming 'sub' is the field containing user information
  // Add other fields as needed based on your JWT payload
}

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);


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

// Function to handle logout
const handleLogout = () => {
  Cookies.remove('access_token');
  setAuthenticated(false);
  
};

  return (
    <>
      <div className="navbar">
        <div className="navbar-brand">
        	<a href="/">EzAuction</a>
        </div>

        <div className="navbar-menu-container">
            <a href="/electronics">Electronics</a>
            <a href="#new-listings">New Listings</a>
            <a href="#art">Art</a>
            <a href="#antiques">Antiques & Collectibles</a>
            <a href="#coins">Coins & Currency</a>
            <a href="#fashion">Properties</a>
            <a href="#more-categories">All Categories</a>
        </div>

        <div className="menu-search-container">
            <SearchBar />
        </div>

        <div>
          {authenticated ? (
            <div>
              <Link to={`/user/${user}`}>
                <FaUser />
                Profile
              </Link>
              <button onClick={handleLogout}>Log Out</button>
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