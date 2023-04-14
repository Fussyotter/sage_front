import React, { useState } from 'react';
import axios from 'axios';

export default function Signup () {
    const signupNewUser = async (userData) => {
        try {
            const response = await axios.post(
							'http://https://sage-backend.onrender.com/v1/users/',
							userData
						);
            return response.data;
        } catch (error) {
            if(error.response) {
                throw new Error(JSON.stringify(error.response.data));
            } else if (error.message) {
                throw new Error(JSON.stringify(error.message));
            } else {
                throw new Error(JSON.stringify(error));
            }
        }
    }
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

	const onSignupClick = async () => {
		try {
			const userData = {
				username: formData.username,
				password: formData.password,
			};
			const response = await signupNewUser(userData);
			console.log(response); // handle successful response
		} catch (err) {
			setFormErrors({ ...formErrors, [`${err.field}Error`]: err.message });
			console.error(err); // handle error
		}
	};

	return (
		<div>
			<details>
				<summary>Sign up</summary>
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
				</form>
				<button onClick={onSignupClick}>Sign up</button>
			</details>
			{/* <h1></h1> */}

			{/* <p className='mt-2'>
				Already have account? <a href='/login'>Login</a>
			</p> */}
		</div>
	);
};
