import React, { useContext, useState } from 'react';
import { login, logout } from '@/functions/auth';
import { UserContext } from '@/context/context';

export default function Login() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user } = await login({
        username: username,
        password: password,
      });
      setLoggedInUser(user.username);

      setUser(user);
      setLoginStatus(true);
    } catch (error) {
      console.error('login failed:', error);
      setLoginStatus(false);
      setUser(null);
    }
  };

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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className='login-container'>
      {loggedInUser ? (
        <div>Welcome {loggedInUser}!</div>
      ) : loginStatus ? (
        <form className='login-form' onSubmit={handleLogin}>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={handleInputChange}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={handleInputChange}
          />
          <button className='login-button' type='submit'>
            Log in
          </button>
        </form>
      ) : (
        <button className='login-button' onClick={() => setLoginStatus(true)}>
          Log in
        </button>
      )}
      {loggedInUser && (
        <button className='login-button' onClick={handleLogout}>
          Log out
        </button>
      )}

      <style>{`
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
