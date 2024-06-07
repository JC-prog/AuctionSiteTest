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
        	<a href="/">EzAuction</a></div>
        <div className="search-container">
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