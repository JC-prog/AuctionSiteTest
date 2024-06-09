import { useState } from "react";
import React from 'react'
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { terminal } from 'virtual:terminal';

// CSS
import "../Styles/Login.scss"

// Config
import api from '../config/api/loginApi';

const LoginPage = () => {

	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

	// Forms
	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

	// Submit
	const handleSubmit = async () => {

        try {
			const response: AxiosResponse = await api.get(`/user`, {
				params: {
					id : `${ username }`,
					password: `${ password }`
				}
			});

            terminal.log(response);

            if (response.data == 'No Data') {

                toast.error("Login Failed. Please check your credentials.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });

                return;

            } else {

                toast.success("Login Successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }
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
    <div className="form-container-wrapper">
		<div className="form-container" id="login-form-container">
		    <h1 className="form-title">EzAuction</h1>
		    
             <form id="login-form" className="form">
		        <div className="form-row">
		            <label className="form-label">Username:</label>
		            <input type="text" id="uName" name="uName" className="form-input" placeholder="Enter your username" 
						value={username}
						onChange={handleUsernameChange}
						required/>
		        </div>
		        
		        <div className="form-row">
		            <label className="form-label">Password:</label>
		            <input type="password" id="password" name="password" className="form-input" placeholder="Enter your password" value={password}
                            onChange={handlePasswordChange}
                            required/>
		        </div>
		        
		        <input type="submit" value="Login" className="form-submit" onClick={() => handleSubmit()} />
		    </form>
		</div>
	</div>
  )
}

export default LoginPage