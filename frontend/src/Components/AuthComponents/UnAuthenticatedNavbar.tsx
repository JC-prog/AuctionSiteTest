import React from 'react'
import { Link } from 'react-router-dom';

const UnAuthenticatedNavbar = () => {
  return (
    <>
        <button>
            <Link to="/login"> 
                Login
            </Link>
        </button>
        
        
        <button>
            <Link to="/register">
                Sign Up
            </Link>
        </button>
    </>
  )
}

export default UnAuthenticatedNavbar
