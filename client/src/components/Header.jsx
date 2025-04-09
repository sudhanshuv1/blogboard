import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {

  const { pathname } = useLocation();
  return (
    <nav className="fixed top-0 w-screen border-2 p-2 border-gray-900 flex items-center h-14 z-50 bg-white">
      <Link to={`${pathname}`}>
        <h2 className="text-xl font-bold mr-auto ml-12">.blogboard</h2>
      </Link>
    </nav>
  );
};

export default Header;