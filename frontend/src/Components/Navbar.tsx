import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Components
import SearchBar from "./SearchBar";
import LoginSignup from "./LoginSignup";

// CSS
import "../Styles/Navbar.scss"

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);

// Function to check authentication status
const checkAuthentication = () => {
  const accessToken = Cookies.get('access_token');
  if (accessToken) {
    setAuthenticated(true);
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
              <a href = "/profile">profile</a>
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