import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async function() {
        const response = await fetch('/api/users/verify');
        if (response.ok) {
          setLoginFormVisible(false);
          setCreateAccountFormVisible(false);
        }
      })();
    }
    catch {

    }
  });

  const [loginFormVisible, setLoginFormVisible] = useState<Boolean>(true);
  const [createAccountFormVisible, setCreateAccountFormVisible] = useState<Boolean>(false);

  const login = async () => { 
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const response = await fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) navigate('/Home');
    else alert('Incorrect email or password');
  };

  const loadCreateAccountForm = () => {
    setCreateAccountFormVisible(true);
    setLoginFormVisible(false);
  }

  const createAccount = async () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const age = (document.getElementById('age') as HTMLInputElement).value;
    const region = (document.getElementById('region') as HTMLInputElement).value;
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username, age, region })
    });
    if (response.ok) navigate('/Home');
  }
  const googleLogin = () => { };
  const loginForm = (
    <div className="flex items-center justify-center">
  <div className="max-w-3xl w-full p-6 rounded-lg">
    <form className='space-y-6' id="loginForm">
      <div className="flex items-center mb-4">
        <label 
          className='text-lg font-semibold capitalize text-gray-700 w-1/3 text-right pr-4'
          htmlFor='email'
        >
          Email:
        </label>
        <input 
          type='text' 
          className='p-1 border-black rounded-lg focus:outline-none bg-black-100 focus:ring-2 focus:ring-blue-500 w-full'
          id='email'
        />
      </div>
      <div className="flex items-center mb-4">
        <label 
          className='text-lg font-semibold capitalize text-gray-700 w-1/3 text-right pr-4'
          htmlFor='password'
        >
          Password:
        </label>
        <input 
          type='password'
          className='p-1 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
          id='password'
        />
      </div>
    </form>
    <button 
      className='w-full px-4 py-2 text-black rounded-lg bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4'
      onClick={login}
    >
      Log in
    </button>
    <button 
      className='w-full px-4 py-2 text-black rounded-lg bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2'
      onClick={() => { setCreateAccountFormVisible(true); setLoginFormVisible(false); }}
    >
      Create Account
    </button>
    <button 
      className='w-full px-4 py-2 text-black rounded-lg bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2'
      onClick={googleLogin}
    >
      Log in with Google
    </button>
  </div>
</div>
  );

  const createAccountForm = (
       <div className="max-w-3xl mx-auto p-6">
  <form
    className='space-y-6'
    id="loginForm"
  >
    <div className="flex items-center mb-2">
      <label 
        className='text-lg font-semibold capitalize text-gray-700 w-1/4'
        htmlFor='email'
      >
        Email:
      </label>
      <input 
        type='text' 
        className='p-1 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full '
        id='email'
      />
    </div>
    <div className="flex items-center mb-2">
      <label 
        className='text-lg font-semibold capitalize text-gray-700 w-1/4'
        htmlFor='username'
      >
        Username:
      </label>
      <input 
        type='text' 
        className='p-1 border-black rounded-lg bg-black-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
        id='username'
      />
    </div>
    <div className="flex items-center mb-2">
      <label 
        className='text-lg font-semibold capitalize text-gray-700 w-1/4'
        htmlFor='password'
      >
        Password:
      </label>
      <input 
        type='password'
        className='p-1 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
        id='password'
      />
    </div>
    <div className="flex items-center mb-2">
      <label 
        className='text-lg font-semibold capitalize text-gray-700 w-1/4'
        htmlFor='age'
      >
        Age:
      </label>
      <input 
        type='number' 
        className='p-1 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
        id='age'
      />
    </div>
    <div className="flex items-center mb-2">
      <label 
        className='text-lg font-semibold capitalize text-gray-700 w-1/4'
        htmlFor='region'
      >
        Region:
      </label>
      <input 
        type='text' 
        className='p-1 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
        id='region'
      />
    </div>
  </form>
  <button 
    className='w-full px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4'
    onClick={createAccount}
  >
    Create Account
  </button>
  <button 
    className='w-full px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2'
    onClick={() => { setCreateAccountFormVisible(false); setLoginFormVisible(true); }}
  >
    Back to Login Form
  </button>
</div>
  );

  return (
    <div className=" min-h-screen bg-gradient-to-b from-purple-100 to-blue-600 p-4">
      {loginFormVisible ? loginForm : null}
      {createAccountFormVisible ? createAccountForm : null}
      {!createAccountFormVisible && !loginFormVisible ? 'Already logged in!' : null}
    </div>
  );
}

export default Login;