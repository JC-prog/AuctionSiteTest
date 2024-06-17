import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// API
import api from '../config/api/loginApi';

// Styles
import "../Styles/Signup.scss"

// Interface
import IUser from "../models/UserModel.ts";

const SignupPage = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		contactNum: '',
		address: '',
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

		const { username, password, contactNum, address, email } = formData;

		try {
			const response: AxiosResponse = await api.post('/api/auth/register', {
				username,
				password,
				contactNum,
				address,
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
		<div className="signup-container-wrapper">
			<div className="signup-container">
				<div className="signup-img-container">
					<img src="test.jpg" alt="Signup" />
				</div>

				<div className="signup-form-wrapper">
					<h1>EzAuction</h1>

					<div className="signup-form-container">
						<form className="register-form" id="register-form" onSubmit={handleSubmit}>
							<div className="form-row">
								<label className="form-label">Username</label>
								<input
									type="text"
									name="username"
									id="username"
									className="form-input"
									placeholder="User Name"
									onChange={handleChange}
								/>
							</div>

							<div className="form-row">
								<label className="form-label">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									className="form-input"
									placeholder="Your Email"
									onChange={handleChange}
								/>
							</div>

							<div className="form-row">
								<label className="form-label">Contact Number</label>
								<input
									type="text"
									name="contactNum"
									id="contactNum"
									className="form-input"
									placeholder="Contact no"
									onChange={handleChange}
								/>
							</div>

							<div className="form-row">
								<label className="form-label">Address</label>
								<input
									type="text"
									name="address"
									id="address"
									className="form-input"
									placeholder="Your Address"
									onChange={handleChange}
								/>
							</div>

							<div className="form-row">
								<label className="form-label">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									className="form-input"
									placeholder="Password"
									onChange={handleChange}
								/>
							</div>

							<div className="form-row">
								<label className="form-label">Re-Enter Password</label>
								<input
									type="password"
									name="re_pass"
									id="re_pass"
									className="form-input"
									placeholder="Repeat your password"
								/>
							</div>

							<div className="form-row">
								<div className="signup-form-row-terms">
									<input
										type="checkbox"
										name="agree-term"
										id="agree-term"
										className="form-checkbox"
									/>
									<label className="label-agree-term">
										I agree to all statements in 
										<a href="#" className="term-service">Terms of service</a>
									</label>
								</div>
							</div>

							<input
								type="submit"
								name="signup"
								id="signup"
								className="form-submit"
								value="Register"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignupPage;
