import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CredentialEntry from '../components/CredentialEntry';
import { useSignUpMutation, useLoginMutation } from '../features/apiSlice';
import { login as loginAction } from '../features/authSlice';

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
    },
  ];

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const [signUp, { isLoading: isSignUpLoading, isError: isSignUpError, error: signUpError }] = useSignUpMutation();
  const [login, { isLoading: isLoginLoading, isError: isLoginError, error: loginError }] = useLoginMutation();

  const createUser = async () => {
    try {
      const signUpResponse = await signUp({
        name: (localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')).trim(),
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
      }).unwrap();

      localStorage.clear();

      const data = await login({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
      }).unwrap();

      dispatch(
        loginAction({
          user: data.user,
          accessToken: data.accessToken,
        })
      );

      navigate('/blog', { state: signUpResponse.message });
    } catch (err) {
      console.error('Error during sign-up or login:', err);
      alert(err.data?.message || 'An error occurred during sign-up or login.');
    }
  };

  return (
    <main className="flex flex-col flex-grow items-center container min-w-[100vw] min-h-screen justify-center bg-gray-400">
      <Link to="/" className="absolute top-0 right-0 m-8 group text-black hover:text-blue-500">
        Back to Home
        <span className="absolute left-1/2 transform -translate-x-1/2 top-6 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"></span>
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
        {(isSignUpLoading || isLoginLoading) && (
          <p className="text-blue-500 mt-2 text-center">Processing...</p>
        )}
        {isSignUpError && (
          <p className="text-red-500 mt-2 text-center">
            {signUpError?.data?.message || 'Failed to sign up.'}
          </p>
        )}
        {isLoginError && (
          <p className="text-red-500 mt-2 text-center">
            {loginError?.data?.message || 'User created but failed to log in. Please log in using the email and password you just entered.'}
          </p>
        )}
      </form>
    </main>
  );
};

export default SignUp;