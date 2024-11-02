import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CredentialEntry from '../components/CredentialEntry'
import { signUp, login } from '../utils/api'

const SignUp = () => {

  let credentials = [
    {
      inputType: 'email',
      heading: 'Enter your email',
      placeholder: 'Email',
    },
    {
      inputType: 'text',
      heading: 'Enter your Name',
      placeholder: '',
    },
    {
      inputType: 'password',
      heading: 'Enter your password',
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
    <>
      <Link to="/" className="absolute top-0 right-0 m-8">
        Back to Home
      </Link>
      <main className="bg-gray-400 flex h-screen items-center justify-center">
        <form action="">
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
    </>
  )
}

export default SignUp