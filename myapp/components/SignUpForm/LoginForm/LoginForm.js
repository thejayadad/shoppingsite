'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your validation logic here

    try {
      // Use NextAuth signIn for login
      const res = await signIn('credentials', { email, password, redirect: false });

      if (res?.error == null) {
        router.push('/');
      } else {
        toast.error('Error occurred while logging in.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Error occurred while logging in.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your login form fields go here */}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
