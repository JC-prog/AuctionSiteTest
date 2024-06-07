import React from 'react'

// CSS
import "../Styles/Menubar.scss"

const Menubar = () => {
  return (
    <div className="menu-bar">
        <a href="#all-categories">All Categories</a>
        <a href="#new-listings">New Listings</a>
        <a href="#art">Art</a>
        <a href="#antiques">Antiques & Collectibles</a>
        <a href="#coins">Coins & Currency</a>
        <a href="#fashion">Fashion</a>
        <a href="#more-categories">More Categories</a>
    </div>
  )
}

export default Menubar