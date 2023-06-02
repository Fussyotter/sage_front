import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
	const signupNewUser = async (userData) => {
		try {
			const response = await axios.post(
				'https://sage-backend.onrender.com/v1/users/',
				userData
			);
			return response.data;
		} catch (error) {
			if (error.response) {
				throw new Error(JSON.stringify(error.response.data));
			} else if (error.message) {
				throw new Error(JSON.stringify(error.message));
			} else {
				throw new Error(JSON.stringify(error));
			}
		}
	};
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState({
		usernameError: '',
		passwordError: '',
	});

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [showForm, setShowForm] = useState(false);

	const onSignupClick = async () => {
		try {
			const userData = {
				username: formData.username,
				password: formData.password,
			};
			const response = await signupNewUser(userData);
			console.log(response); // handle successful response
		} catch (err) {
			setFormErrors({
				...formErrors,
				[`${err.field}Error`]: err.message,
			});
			console.error(err); // handle error
		}
	};

	return (
		<>
			{!showForm ? (
				<button className='signup-button' onClick={() => setShowForm(true)}>
					Sign up
				</button>
			) : (
				<form>
					<div>
						<label htmlFor='usernameId'>User name</label>
						<input
							className={formErrors.usernameError ? 'is-invalid' : ''}
							type='text'
							name='username'
							placeholder='Enter user name'
							value={formData.username}
							onChange={onChange}
						/>
						<div className='invalid-feedback'>{formErrors.usernameError}</div>
					</div>

					<div>
						<label htmlFor='passwordId'>Your password</label>
						<input
							className={formErrors.passwordError ? 'is-invalid' : ''}
							type='password'
							name='password'
							placeholder='Enter password'
							value={formData.password}
							onChange={onChange}
						/>
						<div className='invalid-feedback'>{formErrors.passwordError}</div>
					</div>
					<button
						type='button'
						className='signup-button'
						onClick={onSignupClick}>
						Sign up
					</button>

					<button onClick={() => setShowForm(false)}>x</button>
				</form>
			)}
		</>
	);
}
