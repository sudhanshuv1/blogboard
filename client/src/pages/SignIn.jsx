import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../utils/api'

const SignIn = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login({email, password}); 
    if(data.message) {
      setMessage(data.message);
      return;
    }
    if(data.blogId) {
      navigate(`/blog/${data.blogId}`);
    }
    else {
      navigate('/blog');
    }
  }


  return (
    <>
      <Link to="/" className="absolute top-0 right-0 m-8">
        Back to Home
      </Link>
      <main className="flex h-screen items-center justify-center">
        <form action="" className="flex flex-col justify-center border-2 p-4 relative h-96 w-96">
          <h1 className="text-xl text-center">Login to Blogboard</h1>
          <div className="flex flex-col items-center justify-center h-4/6 w-full">
            <input type="email" placeholder="Email" required className="border-2 border-black p-1 h-1/6 w-5/6 my-4" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" required className="border-2 border-black p-1 h-1/6 w-5/6 my-4" onChange={(e) =>setPassword(e.target.value)}/>
          </div>
          <p className="text-red-500 m-2">{message}</p>
          <button type="submit" className="p-2 bottom-8 right-8 absolute border-2" onClick={(e) => handleSubmit(e)}>Sign In</button>
        </form>
      </main>
    </>
  )
}

export default SignIn