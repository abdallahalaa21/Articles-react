import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetUsers from '../hooks/useGetUsers';
import { AppContext } from '../context/appContext';

const NavBar = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const { usersObj } = useGetUsers();
  const { title } = useContext(AppContext);

  const signIn = useCallback(() => {
    if (!userId || !password) {
      setError('Please enter UserId and password');
      return;
    }
    if (!usersObj[userId]) {
      setError('User not found');
      return;
    }
    if (usersObj[userId].name) {
      setError('');
      window.localStorage.setItem('user', JSON.stringify(usersObj[userId]));
      setUser(usersObj[userId]);
    }

    setShowLogin(false);
  }, [userId, password, usersObj]);

  const signOut = useCallback(() => {
    window.localStorage.removeItem('user');
    setUser(null);
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <nav className='bg-gray-800'>
      <div className='container flex flex-row justify-between py-4 mx-auto text-white'>
        <div className='flex flex-row items-center gap-3'>
          <Link to='/' className='text-xl font-bold'>
            WebSite Name
          </Link>
          <p>/ {title}</p>
        </div>
        {user?.name ? (
          <div className='flex flex-row gap-3'>
            <button onClick={signOut}>{user.name}</button>
          </div>
        ) : showLogin ? (
          <div>
            <div className='flex flex-row gap-3'>
              <input
                type='text'
                placeholder='UserId'
                required
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                className={`border-2 border-gray-300 rounded-lg text-black ${
                  error ? 'border-red-500 ' : ''
                }`}
              />
              <input
                type='password'
                placeholder='password'
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`border-2 border-gray-300 rounded-lg text-black ${
                  error ? 'border-red-500 ' : ''
                }`}
              />
              <button onClick={signIn}>Sign in</button>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
