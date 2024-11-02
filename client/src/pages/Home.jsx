import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Home = () => {
  return (
    <>
    <Navbar />
      <main className="bg-gradient-to-b from-black to-blue-900 h-screen flex">
        <h1 className="text-white m-auto text-4xl">
          Share your ideas with the world
        </h1>
      </main>
      <main className="bg-gradient-to-b from-red-50 to-red-100 h-screen flex">
        <h1 className="text-white m-auto text-4xl">
          Share your ideas with the world
        </h1>
      </main>
      <main className="bg-gradient-to-b from-lime-50 to-lime-100 h-screen flex">
        <h1 className="text-white m-auto text-4xl">
          Share your ideas with the world
        </h1>
      </main>
    </>
  )
}

export default Home