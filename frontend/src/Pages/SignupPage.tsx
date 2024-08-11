import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// API Function Calls
import { registerUser } from '../services/AuthService';

// Interface

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
			const response = await registerUser(username, password, email)

			if (response.status === 200) {
                const { error } = response.data;
        
                if (error) {
                  toast.error(`${error}\nPlease contact admin`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                  });
                } else {

                  toast.success('Signup Successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                  });
        
                  setTimeout(() => {
                    navigate('/login');
                    window.location.reload();
                  }, 2000);
                }
              } else {
                toast.error('Signup Failed. Please contact Administrator.', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                });
              }
            } catch (error) {
              console.error('Error:', error);
              toast.error('Signup Failed. Please contact Administrator.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
              });
            }
          };

	return (
		<div className="flex w-full min-h-screen items-center justify-center">
            <div className="w-full flex items-center justify-center lg:w-1/2 p-4">
                <form className='w-full max-w-[700px] px-6 py-16 sm:px-10 sm:py-20 rounded-3xl bg-white border-2 border-gray-100'
                    onSubmit={handleSubmit}>
                    <h1 className='text-4xl sm:text-5xl font-semibold'>Sign Up</h1>
                    <p className='font-medium text-md sm:text-lg text-gray-500 mt-4'>Welcome! Please enter your details.</p>
                    <div className='mt-8'>
                        <div className='flex flex-col'>
                            <label className='text-lg font-medium'>Username</label>
                            <input 
                                className='w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent'
                                placeholder="Enter your username"
                                name="username"
                                value={formData.username} 
                                onChange={handleChange} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Password</label>
                            <input 
                                className='w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent'
                                placeholder="Enter your password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label className='text-lg font-medium'>Email</label>
                            <input 
                                className='w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent'
                                placeholder="Enter your email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-8 flex justify-between items-center'>
                            <div>
                                <input type="checkbox" id='remember'/>
                                <label className='ml-2 font-medium text-base' htmlFor="remember">Agree to Terms & Conditions</label>
                            </div>
                        </div>
                        <div className='mt-8 flex flex-col gap-y-4'>
                            <button 
                                type="submit"
                                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign Up</button>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>Already have an account?</p>
                            <Link to="/login" className='ml-2 font-medium text-base text-violet-500'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

	);
}

export default SignupPage;
