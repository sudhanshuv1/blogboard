import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      <Navbar />
      <div className="absolute animate-move-slow-1 top-40 left-40 w-20 h-20 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
      <div className="absolute animate-move-slow-2 my-8 top-30 right-10 w-30 h-30 md:w-60 md:h-60 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
      <div className="absolute animate-move-slow-3 bottom-10 left-10 w-20 h-20 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
      <div className="absolute animate-move-slow-4 bottom-40 right-20 w-24 h-24 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
      <div className="absolute animate-move-slow-5 top-1/2 left-1/4 w-28 h-28 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
      <div className="flex flex-col items-center justify-center text-center py-20 relative z-10">
        <div className="relative w-11/12 md:w-1/2">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder" className="rounded-lg shadow-lg w-full" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mt-10">
          {'{'} Write Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Article</span> here { '}' }
        </h1> 
        <Link to="/sign-up" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:animate-vibrate">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Home;
