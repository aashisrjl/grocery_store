import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        email,
        password,
      });
      console.log("response", response.data);
      navigate('/login');
      toast.success(response.data.message, { position: 'top-right' });
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration Failed!', { position:'top-right' });
    }
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:3000/auth/google'; // Redirect to Google auth
  };
  
  const handleFacebookAuth = (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:3000/auth/facebook'; // Redirect to Facebook auth
  };
  
  return (
    <>
      <h1 className="text-3xl text-center font-bold text-green-500 mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="m-auto bg-white p-10 rounded-lg shadow-lg text-black w-[500px]">
        <div className="mb-4">
          <label htmlFor="name" className="block text-green-500 font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-green-500 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-green-500 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
        >
          Register
        </button>
        <div className="flex items-center justify-center my-4">
          <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={handleGoogleAuth}
          >
            <FaGoogle className="mr-2 text-blue-500" /> Continue with Google
          </button>
        </div>
        <div className="flex items-center justify-center my-4">
          <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={handleFacebookAuth}>
            <FaFacebook className="mr-2 text-blue-700" /> Continue with Facebook
          </button>
        </div>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => {
              window.location.href = '/login';
            }}
            className="text-green-500 cursor-pointer underline"
          >
            Login here
          </span>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};

export default RegisterForm;
