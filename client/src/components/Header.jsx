import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Access user data from Redux store
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    // Clear any authentication tokens or user data
    localStorage.clear();
    navigate('/signin'); // Redirect to the sign-in page
  };

  return (
    <nav className="fixed top-0 w-screen border-2 p-2 border-gray-900 flex items-center h-14 z-50 bg-white">
      <Link to={`${pathname}`}>
        <h2 className="text-xl font-bold mr-auto ml-12">.blogboard</h2>
      </Link>
      <div className="relative mr-12">
        <button
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </span>
          )}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-md">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;