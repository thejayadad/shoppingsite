'use client'
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') {
      toast.error('Fill all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      console.log(await res.json());

      if (res.ok) {
        toast.success('Successfully registered the user');
        setLoading(false);
        setShowLoginPrompt(true);
        return;
      } else {
        toast.error('Error occurred while registering');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleLoginNow = () => {
    signIn();
  };

  return (
    <div className='max-w-screen-xl mx-auto'>
      <h2 className="text-3xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <ToastContainer />

      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-lg mb-4">Do you want to login now?</p>
            <button onClick={handleLoginNow} className="bg-blue-500 text-white p-2 rounded">
              Yes, Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
