import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/ui/header';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
      navigate('/');
    }
  };

  return (
    <div> <Header />
   <div className="flex flex-col p-6 max-w-sm mx-auto bg-blue-900 text-white rounded-md outline-none">
  <div className="flex-grow flex flex-col justify-center">
    <input
      type="text"
      placeholder="Enter username"
      value={username}
      onChange={e => setUsername(e.target.value)}
      className="border p-2 w-full mb-4"
    />
    <input
      type="text"
      placeholder="Enter password"
      value={username}
      onChange={e => setUsername(e.target.value)}
      className="border p-2 w-full mb-4"
    />
    <button
      onClick={handleLogin}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Login
    </button>
  </div>
</div>
</div>
  );
}

export default Login