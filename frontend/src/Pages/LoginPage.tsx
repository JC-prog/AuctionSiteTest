import { useState } from "react";
import React from 'react'
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

// CSS
import "../Styles/Login.scss"

// Config
import api from '../config/api/loginApi';

const LoginPage = () => {

	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

	// Forms
	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

	// Submit
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
			const response: AxiosResponse = await api.post(`/api/auth/login`, {
                username : username ,
                password : password
			});

            console.log(response);

            if (response.status == 200) {

                toast.success("Login Successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });

                // Store the access token
                const { access_token } = response.data;
                Cookies.set('access_token', access_token, { expires: 1 });

                navigate('/');

                window.location.reload();

            } else {

                toast.error("Login Failed. Please check your credentials.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });

                return;
                
            }

        } catch (error) {

            console.error('Error:', error);

            toast.error("Login Failed. Please check your credentials", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            
        }
    };

  return (
    <div className="login-container-wrapper">
        <div className="login-container">
            <div className="login-img-container">
                <img src="test.jpg"></img>
            </div>

            <div className="login-form-wrapper">
                <h1 className="form-title">EzAuction</h1>
                
                <div className="login-form-container">
                    <form id="login-form" className="form" onSubmit = { handleSubmit }>
                        <div className="form-row">
                            <label className="form-label">Username:</label>
                            <input type="text" id="username" name="username" className="form-input" placeholder="Enter your username" 
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
                        
                        <input type="submit" value="Login" className="form-submit"  />
                    </form>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default LoginPage