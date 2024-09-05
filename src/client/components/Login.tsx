import React, { useEffect, useState } from "react";

const Login = () => {
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
    if (!response.ok) console.log('no bueno');
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
    if (!response.ok) console.log('no bueno');
    else {
      
    }
  }
  const googleLogin = () => { };

  const loginForm = (
    <div>
      <form
        className='max-w-3xl mx-auto p-6 bg-white rounded-lg space-y-6'
        id="loginForm"
      >
        <label 
          className='text-lg font-semibold mb-2 capitalize text-gray-700'
          htmlFor='email'
        >
          Email:
        </label>
        <input 
          type='text' 
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='email'
        />
        <label 
          className='text-lg font-semibold mb-2 capitalize text-gray-700'
          htmlFor='password'
        >
          Password:
        </label>
        <input 
          type='password'
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='password'
        />
      </form>
      <button 
        className='w-full px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={login}
      >
        Log in
      </button>
      <button 
        className='w-full px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={loadCreateAccountForm}
      >
        Create Account
      </button>
      <button 
        className='w-full px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={googleLogin}
      >
        Log in with Google
      </button>
    </div>
  );

  const createAccountForm = (
       <div>
      <form
        className='max-w-3xl mx-auto p-6 bg-white rounded-lg space-y-6'
        id="loginForm"
      >
        <label 
          className='text-lg font-semibold mb-2 capitalize text-gray-700'
          htmlFor='email'
        >
          Email:
        </label>
        <input 
          type='text' 
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='email'
        />
        <label 
          className='text-lg font-semibold mb-2 capitalize text-gray-700'
          htmlFor='username'
        >
          Username:
        </label>
        <input 
          type='text' 
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='username'
        />
        <label 
          className='text-lg font-semibold mb-2 capitalize text-gray-700'
          htmlFor='password'
        >
          Password:
        </label>
        <input 
          type='password'
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='password'
        />
        <label 
          className='text-lg font-semibold mb-2 capitalize text-gray-700'
          htmlFor='age'
        >
          Age:
        </label>
        <input 
          type='number' 
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='age'
        />
        <label 
          className='text-lg font-semibold mb-2 capitalize text-gray-700'
          htmlFor='region'
        >
          Region:
        </label>
        <input 
          type='text' 
          className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          id='region'
        />
      </form>
      <button 
        className='w-full px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={createAccount}
      >
        Create Account
      </button>
    </div>
  );

  return (
    <div>
      {loginFormVisible ? loginForm : null}
      {createAccountFormVisible ? createAccountForm : null}
      {!createAccountFormVisible && !loginFormVisible ? 'Already logged in!' : null}
    </div>
  );
}

export default Login;