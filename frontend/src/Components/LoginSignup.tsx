import React from 'react'

// CSS
import "../Styles/LoginSignup.scss"


const LoginSignup = () => {
  return (
    <div className="login-link">
        <div>
            <a href="/login" className="link">Login</a>
            <a href="/signup" className="link">Sign Up</a>
        </div>
    </div>
  )
}

export default LoginSignup