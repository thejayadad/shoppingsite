'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your validation logic here

    // Simulate API call for registration
    // Replace this with your actual API call
    try {
      // Your registration API endpoint
      const registrationEndpoint = '/api/register';

      // Make API request
      const response = await fetch(registrationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Check if registration was successful
      if (response.ok) {
        toast.success('User created successfully!');
        onRegister(); // Proceed to login step
      } else {
        toast.error('Error occurred while registering.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Error occurred while registering.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your registration form fields go here */}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
