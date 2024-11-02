import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createBlog } from '../utils/api'

const CreateBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const [name, setName] = useState('');
  const message = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = await createBlog({name: name});  
    navigate(`/blog/${blog.id}`, {state: blog.id});
  }
    

  return (
   <>
   <p className="bg-green-100 text-green-800 px-1 mt-24 ml-12 rounded-lg w-fit absolute">
      {message}
    </p>
    <main className="flex flex-col h-dvh items-center justify-center">
     <div className="border-2 p-2 flex flex-col justify-center h-96 w-96">
      <h2 className="text-2xl my-8">Give your blog a name</h2>
      <form action="" className="flex flex-col justify-center">
       <input type="text" placeholder="title" autoFocus className="border-2 border-black p-1" ref={inputRef} onChange = {(e) => setName(e.target.value)}/>
       <button type="submit" className="ml-auto p-2 mt-8 border-2" onClick={(e) => handleSubmit(e)}>Create Blog</button>
      </form>
     </div>
    </main>
   </>
  )
}

export default CreateBlog