import React, { useState } from "react";
import { login, logout } from "@/functions/auth";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // not entirely sure i'll need these next two
    const [loginStatus, setLoginStatus] = useState(null);
    const [user, setUser] = useState(null);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {user} = await login({
                username: username,
                password: password,
            });
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
				<details>
					<summary>Login</summary>
					<div>
						<label htmlFor='username'>Username:</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password'>password:</label>
						<input
							type='text'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button onClick={handleLogin}>Log in</button>
				</details>
			</>
		);
}
