import React, {useState } from 'react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// API
import api from '../config/api/loginApi';

// Styles
import "../Styles/Signup.scss"

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
	<div className="signup-container-wrapper">
		<div className="signup-container" >
			<div className="signup-img-container">
				<img src="test.jpg"></img>
			</div>

			<div className="signup-form-wrapper">
				<h1>EzAuction</h1>

				<div className="signup-form-container">
					<form action="<%= request.getContextPath() %>/register" method="post" className="register-form" id="register-form" >
						<div className="form-row">
							<label className="form-label">Username</label>
							<input type="text" name="name" id="name" className="form-input" placeholder="Your Name" onChange={handleUsernameChange} />
						</div>

						<div className="form-row">
							<label className="form-label">Email</label>
							<input type="email" name="email" id="email" className="form-input" placeholder="Your Email" onChange={handleEmailChange} />
						</div>

						<div className="form-row">
							<label className="form-label">Contact Number</label>
							<input type="text" name="contact" id="contact" className="form-input" placeholder="Contact no" onChange={handleContactNumChange}/>
						</div>

						<div className="form-row">
							<label className="form-label">Address</label>
							<input type="text" name="address" id="address" className="form-input" placeholder="Your Address" onChange={handleAddressChange}/>
						</div>

						<div className="form-row">
							<label className="form-label">Password</label>
							<input type="password" name="pass" id="pass" className="form-input" placeholder="Password" onChange={handlePasswordChange}/>
						</div>

						<div className="form-row">
							<label className="form-label">Re-Enter Password</label>
							<input type="password" name="re_pass" id="re_pass" className="form-input" placeholder="Repeat your password" />
						</div>

						<div className="form-row">
							<div className="signup-form-row-terms">
								<input type="checkbox" name="agree-term" id="agree-term" className="form-checkbox" />
								<label className="label-agree-term">
											I agree to all statements in 
								<a href="#" className="term-service">Terms of service</a>
								</label>
							</div>
						</div>
								
						<input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={() => handleSubmit()}  />
					</form>
				</div>
			</div>
	    </div>
    </div>
  )
}

export default SignupPage