import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// API
import api from '../config/api/loginApi';

// Interface
import User from "../interfaces/UserModel.ts";

const SignupPage = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		email: '',
	});
	const navigate = useNavigate();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value
		}));
	};

	// Submit form function
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const { username, password, email } = formData;

		try {
			const response: AxiosResponse = await api.post('/api/auth/register', {
				username,
				password,
				email,
			});

			if (response.status === 200) {
				toast.success("Signup Successful!", {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 2000,
				});

				navigate("/login")

				window.location.reload();
			}
		} catch (error) {
			console.error('Error:', error);

			toast.error("Signup Failed. Please contact administrator", {
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
                <h1 className='text-5xl font-semibold'>Sign Up</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Welcome! Please enter you details.</p>
                <div className='mt-8'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Username</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your username"
							name="username"
                            value={ formData.username } 
                            onChange={ handleChange } />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Password</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your password"
							name="password"
                            type={"password"}
                            value ={ formData.password }
                            onChange={ handleChange }
                        />
                    </div>
					<div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Email</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your email"
							name="email"
                            type={"email"}
                            value ={ formData.email}
                            onChange={ handleChange }
                        />
                    </div>
                    <div className='mt-8 flex justify-between items-center'>
                        <div>
                            <input  type="checkbox" id='remember'/>
                            <label className='ml-2 font-medium text-base' htmlFor="remember">Agree to Terms & Conditions</label>
                        </div>
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button 
                            type="submit"
                            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign Up</button>
                        
                    </div>
                    <div className='mt-8 flex justify-center items-center'>
                        <p className='font-medium text-base'>Already have an account?</p>
                        <button
                            className='ml-2 font-medium text-base text-violet-500'>Login</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
	);
}

export default SignupPage;
