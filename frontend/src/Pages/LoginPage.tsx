import React from 'react'

// CSS
import "../Styles/Login.scss"

const LoginPage = () => {
  return (
    <div className="form-container-wrapper">
		<div className="form-container" id="login-form-container">
		    <h1 className="form-title">EzAuction</h1>
		    
             <form action="login" method="post" id="login-form" className="form">
		        <div className="form-row">
		            <label className="form-label">Username:</label>
		            <input type="text" id="uName" name="uName" className="form-input" placeholder="Enter your username" />
		        </div>
		        
		        <div className="form-row">
		            <label className="form-label">Password:</label>
		            <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" />
		        </div>
		        
		        <input type="submit" value="Login" className="form-submit" />
		    </form>
		</div>
	</div>
  )
}

export default LoginPage