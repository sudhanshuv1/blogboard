import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        BLOGBOARD
      </Link>
      <div className="flex space-x-4">
        <Link to="/" className="relative group text-black hover:text-blue-500">
          Home
          <span className="absolute left-1/2 transform -translate-x-1/2 top-6 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"></span>
        </Link>
        <Link to="/sign-in" className="relative group text-black hover:text-blue-500">
          Sign in
          <span className="absolute left-1/2 transform -translate-x-1/2 top-6 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"></span>
        </Link>
        <Link to="/about" className="relative group text-black hover:text-blue-500">
          About
          <span className="absolute left-1/2 transform -translate-x-1/2 top-6 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"></span>
        </Link>
        <Link to="/contact" className="relative group text-black hover:text-blue-500">
          Contact
          <span className="absolute left-1/2 transform -translate-x-1/2 top-6 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"></span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
