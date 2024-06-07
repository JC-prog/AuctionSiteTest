import React from 'react'

const SignupPage = () => {
  return (
    <div className="register-form-wrapper">
		<div className="form-container" id="register-form-container">
	        <h1>EzAuction</h1>
	        
             <form action="<%= request.getContextPath() %>/register" method="post" className="register-form" id="register-form" >
	            <table className="form-table">
	                <tr>
	                    <td><label className="form-label">Username</label></td>
	                    <td><input type="text" name="name" id="name" className="form-input" placeholder="Your Name" /></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Email</label></td>
	                    <td><input type="email" name="email" id="email" className="form-input" placeholder="Your Email" /></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Contact Number</label></td>
	                    <td><input type="text" name="contact" id="contact" className="form-input" placeholder="Contact no" /></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Address</label></td>
	                    <td><input type="text" name="address" id="address" className="form-input" placeholder="Your Address" /></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Password</label></td>
	                    <td><input type="password" name="pass" id="pass" className="form-input" placeholder="Password" /></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Re-Enter Password</label></td>
	                    <td><input type="password" name="re_pass" id="re_pass" className="form-input" placeholder="Repeat your password" /></td>
	                </tr>
	                <tr>
	                    <td colSpan={2}>
	                        <input type="checkbox" name="agree-term" id="agree-term" className="form-checkbox" />
	                        <label className="label-agree-term">
	                            I agree to all statements in 
	                            <a href="#" className="term-service">Terms of service</a>
	                        </label>
	                    </td>
	                </tr>
	            </table>
	            <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
	        </form>
	        <div className="signup-image">
	            <a href="login.jsp" className="signup-image-link">I am already a member</a>
	        </div>
	    </div>
    </div>
  )
}

export default SignupPage