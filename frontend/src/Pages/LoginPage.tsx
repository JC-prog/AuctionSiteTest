import { useState } from "react";
import React from 'react'
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

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

                // Store the access token
                const { access_token } = response.data;
                Cookies.set('access_token', access_token, { expires: 1 });

                
                toast.success("Login Successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });

                setTimeout(() => {
                    navigate('/');

                    window.location.reload();
                  }, 2000);

                

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
    <div className="flex w-full h-screen items-center justify-center">
        <div className="w-full flex items-center justify-center lg:w-1/2">
            <form className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'
                onSubmit = { handleSubmit }>
                <h1 className='text-5xl font-semibold'>Welcome Back</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter you details.</p>
                <div className='mt-8'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Username</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your username"
                            value={ username } 
                            onChange={ handleUsernameChange } />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Password</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your password"
                            type={"password"}
                            value ={ password }
                            onChange={ handlePasswordChange }
                        />
                    </div>
                    <div className='mt-8 flex justify-between items-center'>
                        <div>
                            <input  type="checkbox" id='remember'/>
                            <label className='ml-2 font-medium text-base' htmlFor="remember">Remember Me</label>
                        </div>
                        <button className='font-medium text-base text-violet-500'>Forgot password</button>
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button 
                            type="submit"
                            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign in</button>
                        
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <p className='font-medium text-base'>Don't have an account?</p>
                        <button
                            className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage