import React, { useContext, useState } from "react";
import { login, logout } from "@/functions/auth";
import { UserContext } from "@/context/context";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // not entirely sure i'll need these next two
    const [loginStatus, setLoginStatus] = useState(null);
    const [user, setUser] = useState(null);

    // trying context out
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {user} = await login({
                username: username,
                password: password,
            });
            setLoggedInUser(user.username);

            setUser(user);
            setLoginStatus(true);

        } catch(error) {
            console.error('login failed:',error);
            setLoginStatus(false);
            setUser(null);
        }
    }
    const handleLogout = async () => {
        try {
            await logout();
            console.log('logout successful');
            setLoggedInUser(null);

            setLoginStatus(false);
            setUser(null);
        } catch (error) {
            console.error('logout failed', error);
            setLoginStatus(false);
            setUser(null);
        }
    }

    return (
			<>
				<div className='login-container'>
					{!loginStatus ? (
						<form className='login-form' onSubmit={handleLogin}>
							<label htmlFor='username'>Username:</label>
							<input
								type='text'
								id='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<label htmlFor='password'>Password:</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button type='submit'>Log in</button>
						</form>
					) : (
						<button onClick={handleLogout}>Log out</button>
					)}
				</div>
				
			</>
		);
}
