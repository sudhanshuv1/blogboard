import React, { useState, useRef } from 'react';
import { useCheckForDuplicateQuery } from '../features/apiSlice';

const CredentialEntry = ({ inputType, heading, placeholder, index, setIndex, createUser }) => {
  const inputRef = useRef();

  const initialEntry = () => {
    switch (index) {
      case 0:
        return [localStorage.getItem('email') == null ? '' : localStorage.getItem('email'), ''];
      case 1:
        return [
          localStorage.getItem('firstName') == null ? '' : localStorage.getItem('firstName'),
          localStorage.getItem('lastName') == null ? '' : localStorage.getItem('lastName'),
        ];
      case 2:
        return [localStorage.getItem('password') == null ? '' : localStorage.getItem('password'), ''];
      default:
        return ['', ''];
    }
  };

  const [entry, setEntry] = useState(initialEntry());
  const [message, setMessage] = useState('');

  const { data, isLoading, isError, error } = useCheckForDuplicateQuery(
    { email: entry[0] },
    {
      skip: index !== 0 || entry[0].length === 0, // Skip the query if not on the email step or email is empty
    }
  );

  // Determine if the email is a duplicate based on the server response
  const isDuplicate = !data ? true : false;

  console.log('Query Data:', isDuplicate);

  const handleInputChange = (e, key) => {
    setMessage('');
    if (index === 2 && e.target.value.length < 8) {
      setMessage('Password must be at least 8 characters long');
    }
    const changedEntry = entry.map((item, i) => {
      if (i === key) {
        return e.target.value;
      }
      return item;
    });
    setEntry(changedEntry);
  };

  const prevCredential = (e) => {
    e.preventDefault();
    setIndex((prevIndex) => prevIndex - 1);
  };

  const nextCredential = async (e, input) => {
    e.preventDefault();
    if (input[0].length === 0) {
      setMessage('*Field is required.');
      return;
    }
    if (index === 0) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(input[0])) {
        setMessage('Please enter a valid email.');
        return;
      }

      if (isLoading) {
        setMessage('Checking for duplicate email...');
        return;
      }
      if (isError) {
        setMessage(error?.data?.message || 'Error checking for duplicate email.');
        return;
      }
      if (isDuplicate) {
        setMessage('An account with this email already exists.');
        return;
      }
    }
    if (index === 2 && input[0].length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }
    switch (index) {
      case 0:
        localStorage.setItem('email', input[0]);
        break;
      case 1:
        localStorage.setItem('firstName', input[0]);
        localStorage.setItem('lastName', input[1]);
        break;
      case 2:
        localStorage.setItem('password', input[0]);
    }
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = (e, entry) => {
    e.preventDefault();
    if (entry[0] !== localStorage.getItem('password')) {
      setMessage('Passwords do not match.');
      return;
    }
    createUser();
  };
  
  return (
    <>
      <h1 className="text-gray-900 text-2xl text-center">Sign Up</h1>
      <section className="flex-1 flex flex-col my-2 justify-center w-full flex-grow">
        <h2 className="text-gray-700 text-xl font-mono">{heading}</h2>
        {index === 1 ? (
          <>
            <span className="text-gray-700 font-mono text-xl">First Name</span>
            <input
              type={inputType}
              autoFocus
              ref={inputRef}
              placeholder="John"
              className="border border-gray-300 rounded-md bg-gray-100 focus:bg-white focus:scale-y-110 p-2 mb-4 outline-none"
              value={entry[0]}
              onChange={(e) => handleInputChange(e, 0)}
            />
            <br />
            <span className="text-gray-700 font-mono text-xl">Last Name</span>
            <input
              type={inputType}
              placeholder="Doe"
              className="border border-gray-300 rounded-md bg-gray-100 focus:bg-white focus:scale-y-110 p-2 outline-none"
              value={entry[1]}
              onChange={(e) => handleInputChange(e, 1)}
            />
          </>
        ) : (
          <>
            <input
              type={inputType}
              autoFocus
              ref={inputRef}
              placeholder={placeholder}
              className="border border-gray-300 rounded-md bg-gray-100 focus:bg-white focus:scale-y-110 p-2 outline-none"
              value={entry[0]}
              onChange={(e) => handleInputChange(e, 0)}
            />
          </>
        )}
        <p className="text-red-600 text-sm mt-6">{message}</p>
      </section>
      <div className="flex mt-auto">
        {index > 0 && (
          <button
            className="mr-auto border-2 rounded-sm p-1 text-lg bg-gray-700 text-white border-black hover:scale-x-[2] scale-x-[1.8] duration-150 ease-in-out"
            onClick={(e) => prevCredential(e)}
          >
            &lt;
          </button>
        )}
        {index === 3 ? (
          <button
            className="ml-auto border-2 rounded-md p-1 text-lg bg-gray-700 text-white border-black hover:scale-x-110 duration-150 ease-in-out"
            type="submit"
            onClick={(e) => handleSubmit(e, entry)}
          >
            Create Account
          </button>
        ) : (
          <button
            className="ml-auto border-2 rounded-md p-1 text-lg bg-gray-700 text-white border-black hover:scale-x-110 duration-150 ease-in-out"
            onClick={(e) => nextCredential(e, entry)}
          >
            Continue
          </button>
        )}
      </div>
    </>
  );
};

export default CredentialEntry;