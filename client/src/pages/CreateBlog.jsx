import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCreateBlogMutation } from '../features/apiSlice';

const CreateBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const [name, setName] = useState('');
  const message = location.state;

  
  const [createBlog, { isLoading, isError, error }] = useCreateBlogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blog = await createBlog({ name }).unwrap(); 
      navigate(`/blog/posts/${blog.id}`, { state: blog.id });
    } catch (err) {
      console.error('Error creating blog:', err);
      alert(err.data?.message || 'An error occurred while creating the blog.');
    }
  };

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      {message && (
        <p className="bg-green-100 text-green-800 top-10 mx-10 rounded-lg w-fit absolute">
          {message}
        </p>
      )}
      <section className="relative border-2 rounded-md shadow-md bg-gray-100 container py-2 px-8 flex flex-0 flex-col justify-center md:max-w-md h-96 md:h-80 lg:h-96 max-w-[80%]">
        <h1 className="text-xl absolute top-2 left-1/2 transform -translate-x-1/2 text-center w-full">
          Let's get started :)
        </h1>
        <h2 className="text-gray-700 text-xl font-mono">Give your blog a name</h2>
        <form
          action=""
          className="flex flex-col justify-center"
          onSubmit={handleSubmit} 
        >
          <input
            type="text"
            placeholder="title"
            autoFocus
            className="border border-gray-300 rounded-md bg-gray-100 focus:bg-white focus:scale-y-110 p-2 outline-none"
            ref={inputRef}
            onChange={(e) => setName(e.target.value)}
          />
          {isError && (
            <p className="text-red-500 mt-2">
              {error?.data?.message || 'Failed to create blog.'}
            </p>
          )}
          <button
            type="submit"
            className="absolute p-2 bottom-8 left-1/2 transform -translate-x-1/2 text-center rounded-md bg-gray-700 text-white border-black hover:scale-x-110 duration-150 ease-in-out"
            disabled={isLoading} 
          >
            {isLoading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateBlog;