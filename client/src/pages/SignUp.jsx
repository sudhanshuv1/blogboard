import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CredentialEntry from '../components/CredentialEntry'
import { signUp, login } from '../utils/api'

const SignUp = () => {

  let credentials = [
    {
      inputType: 'email',
      heading: 'What\'s your email?',
      placeholder: 'yourname@example.com',
    },
    {
      inputType: 'text',
      heading: '',
      placeholder: '',
    },
    {
      inputType: 'password',
      heading: 'Set a password',
      placeholder: '',
    },
    {
      inputType: 'password',
      heading: 'Confirm password',
      placeholder: '',
    }
  ];

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const createUser = async () => {
    const data = await signUp({
      name: (localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')).trim(),
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password')
    });
    localStorage.clear();
    login({
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password')
    });
    navigate('/blog', { state: data.message });
  }

  return (
    <main className="flex flex-col flex-grow items-center container min-w-[100vw] min-h-screen justify-center bg-gray-400">
      <Link to="/" className="absolute top-0 right-0 m-8">
        Back to Home
      </Link>
      <form className="border-2 rounded-md bg-white shadow-md bg-gray-100 container pt-2 pb-4 px-8 flex flex-0 flex-col justify-center w-full md:max-w-md h-96 md:h-80 lg:h-96 max-w-[80%]" action="">
        <CredentialEntry 
          key={index}
          inputType={credentials[index].inputType}
          heading={credentials[index].heading}
          placeholder={credentials[index].placeholder}
          index={index}
          setIndex={setIndex}
          createUser={createUser}
        />
      </form>
    </main>
  )
}

export default SignUp