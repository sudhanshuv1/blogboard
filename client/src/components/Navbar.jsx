import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className="flex w-full h-16 bg-black items-center fixed">
      <Link 
        to="/"
        className="text-3xl font-bold text-white whitespace-nowrap mx-28"
      >
        .blogboard
      </Link>
      <button onClick = {() => navigate('/sign-in')} className="border-black rounded text-gray-200 ml-auto p-2 hover:text-white">
        Sign in
      </button>
      <button onClick = {() => navigate('/sign-up')} className="border-black rounded bg-blue-800 text-gray-200 ml-8 mr-28 p-2 hover:text-white">
        Sign up
      </button>
    </nav>
  )
}

export default Navbar