import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Wrapper = () => {
  return (
   <>
    <Header />
    <Sidebar />
    <Outlet />
   </>
  )
}

export default Wrapper