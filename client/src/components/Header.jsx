import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="fixed top-0 h-14 w-screen border-2 p-2 border-gray-900 flex items-center">
      <Link to='/landing'>
        <h2 className="text-xl font-bold mr-auto ml-12">.blogboard</h2>
      </Link>
    </nav>
  )
}

export default Header