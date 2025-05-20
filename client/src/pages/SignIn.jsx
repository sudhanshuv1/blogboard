import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/apiSlice';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../features/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const SignIn = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const inputRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      console.log('Login successful:', data);
      // Dispatch login action to update Redux state and localStorage
      dispatch(
        loginAction({
          user: data.user,
          blog: data.blog,
          accessToken: data.accessToken,
        })
      );

      if (data.blog) {
        navigate(`/blog/posts/${data.blog.id}`);
      } else {
        navigate('/blog');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setMessage(err.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <Link to="/" className="absolute top-0 right-0 m-8 group text-black hover:text-blue-500">
        Back to Home
        <span className="absolute left-1/2 transform -translate-x-1/2 top-6 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"></span>
      </Link>
      <form
        action=""
        className="relative border-2 rounded-md shadow-md bg-gradient-to-r from-blue-100 to-purple-100 container pt-2 pb-4 px-8 flex flex-0 flex-col justify-center md:max-w-md h-96 md:h-80 lg:h-96 max-w-[80%]"
        onSubmit={handleSubmit} // Use onSubmit for the form
      >
        <h1 className="text-xl absolute top-2 left-1/2 transform -translate-x-1/2 text-center w-full">
          Login to Blogboard
        </h1>
        <div className="flex flex-col items-center relative justify-center">
          <input
            type="email"
            placeholder="Email"
            required
            ref={inputRef}
            autoFocus
            className="border border-gray-300 rounded-md w-full bg-gray-100 focus:bg-white focus:scale-y-110 p-2 mb-4 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            className="border border-gray-300 rounded-md w-full bg-gray-100 focus:bg-white focus:scale-y-110 p-2 mb-4 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 bottom-6 text-gray-400 hover:text-gray-500"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {isError && <p className="text-red-500 m-2">{error?.data?.message || 'Login failed.'}</p>}
        <p className="text-red-500 m-2">{message}</p>
        <button
          type="submit"
          className="absolute p-2 bottom-8 right-8 rounded-md bg-gray-700 text-white border-black hover:scale-x-110 duration-150 ease-in-out"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
};

export default SignIn;