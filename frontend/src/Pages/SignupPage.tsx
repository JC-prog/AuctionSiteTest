import React, {useState } from 'react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// API
import api from '../config/api/loginApi';

const SignupPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [contactNum, setContactNum] = useState('');
	const [address, setAddress] = useState('');

	// Set Form Variables
	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleContactNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setContactNum(event.target.value);
	};

	const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	// Submit form function
	const handleSubmit = async () => {

        try {
			const response: AxiosResponse = await api.post(`test`, {
				params: {
					userId : `${ username }`,
					password: `${ password }`
				}
			});


			toast.success("Signup Successful!", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000,
			});
            
        } catch (error) {
            console.error('Error:', error);

            toast.error("Login Failed. Please check your credentials", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            // Handle error, such as displaying an error message to the user
        }
    };


  return (
	<div className="register-form-wrapper">
		<div className="form-container" id="register-form-container">
	        <h1>EzAuction</h1>
	        
             <form action="<%= request.getContextPath() %>/register" method="post" className="register-form" id="register-form" >
	            <table className="form-table">
	                <tr>
	                    <td><label className="form-label">Username</label></td>
	                    <td><input type="text" name="name" id="name" className="form-input" placeholder="Your Name" onChange={handleUsernameChange} /></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Email</label></td>
	                    <td><input type="email" name="email" id="email" className="form-input" placeholder="Your Email" onChange={handleEmailChange} /></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Contact Number</label></td>
	                    <td><input type="text" name="contact" id="contact" className="form-input" placeholder="Contact no" onChange={handleContactNumChange}/></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Address</label></td>
	                    <td><input type="text" name="address" id="address" className="form-input" placeholder="Your Address" onChange={handleAddressChange}/></td>
	                </tr>
	                <tr>
	                    <td><label className="form-label">Password</label></td>
	                    <td><input type="password" name="pass" id="pass" className="form-input" placeholder="Password" onChange={handlePasswordChange}/></td>
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
	            <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={() => handleSubmit()}  />
	        </form>
	        <div className="signup-image">
	            <a href="login.jsp" className="signup-image-link">I am already a member</a>
	        </div>
	    </div>
    </div>
  )
}

export default SignupPage