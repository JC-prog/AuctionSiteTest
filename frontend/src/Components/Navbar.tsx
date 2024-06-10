import React from 'react'
import SearchBar from "./SearchBar";
import LoginSignup from "./LoginSignup";

// CSS
import "../Styles/Navbar.scss"


const Navbar = () => {
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
          <LoginSignup />
        </div>
      </div>
    </>
   
  )
}

export default Navbar