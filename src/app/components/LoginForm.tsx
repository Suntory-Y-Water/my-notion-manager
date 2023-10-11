'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      router.push('/main');
    } else {
      setErrorMessage(data[0].message);
    }
  };

  return (
    <div className='w-full mt-4'>
      <h2 className='text-3xl font-semibold text-gray-700 mb-4'>Login</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className='text-red-500 mb-2'>{errorMessage}</div>}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600' htmlFor='email'>
            email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            placeholder='Enter your email'
            className='mt-1 p-2 w-full border rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='current-email'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            className='mt-1 p-2 w-full border rounded-md'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='current-password'
          />
        </div>
        <div className='mt-4'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-600 rounded-md transform hover:bg-blue-400 hover:scale-y-90 duration-0'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
