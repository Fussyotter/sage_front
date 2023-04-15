import axios from 'axios';

// set Axios Token for User Login
export const setAxiosAuthToken = (token) => {
	if (typeof token !== 'undefined' && token) {
		axios.defaults.headers.common['Authorization'] = 'Token ' + token;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

// login
export const login = async (userData) => {
	try {
		console.log('Logging in with data:', userData);

		const response = await axios.post(
			'https://sage-backend.onrender.com/v1/token/login/',
			userData
		);
		console.log('Login response:', response.data);

		const { auth_token } = response.data;
		setToken(auth_token);
		// console.log(token);
		const user = await getCurrentUser();
		return { success: true, user };
	} catch (error) {
		console.error('Login error:', error);
		unsetCurrentUser();
		return { success: false, error };
	}
};

// djoser endpoint for user info. getting username

export const getCurrentUser = async () => {
	try {
		const response = await axios.get('https://sage-backend.onrender.com/v1/users/me');
		const user = {
			username: response.data.username,
		};
		return user;
	} catch (error) {
		throw error;
	}
};

// set user in local

export const setCurrentUser = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
	console.log('set user');
	console.log(user);
};

// set token
export const setToken = (token) => {
	setAxiosAuthToken(token);
	localStorage.setItem('token', token);
};

// unset user
export const unsetCurrentUser = () => {
	setAxiosAuthToken('');
	localStorage.removeItem('token');
	localStorage.removeItem('user');
};

// logout
export const logout = async () => {
	try {
		await axios.post('https://sage-backend.onrender.com/v1/token/logout/');
		unsetCurrentUser();
		console.log('logout success');
	} catch (error) {
		unsetCurrentUser();
		throw error;
	}
};
