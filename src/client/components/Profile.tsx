import React, { useEffect, useState } from 'react';
import { ProfileData } from 'types/userTypes';
import { useAppSelector, useAppDispatch } from '../hooks';
import { update } from '../slices/userSlice';
import { Profile } from 'passport';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const userDataFromStore = useAppSelector(state => state.user);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<ProfileData | undefined>(userDataFromStore);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async function() {
        const response = await fetch('/api/users/verify');
        if (response.ok) {
          const userDataFromDb = await response.json();
          console.log(userDataFromDb);
          const userDataToDisplay = {
            username: { label: 'Username', data: userDataFromDb.username },
            email: { label: 'Email', data: userDataFromDb.email },
            password: { label: 'Password', data: userDataFromDb.password },
            age: { label: 'Age', data: userDataFromDb.age },
            region: { label: 'Region', data: userDataFromDb.region }
          };
          setUserId(userDataFromDb._id);
          setUserData(userDataToDisplay);
          dispatch(update(userDataToDisplay));
        } else setUserData(undefined);
      })();
    }
    catch (error) {
      throw error;
    }
  }, [])
  
  const dispatch = useAppDispatch();

  const saveAllChanges = async () => { 
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const age = (document.getElementById('age') as HTMLInputElement).value;
    const region = (document.getElementById('region') as HTMLInputElement).value;
    const updateItem: ProfileData = 
      {
        username: { label: 'Username', data: username },
        email: { label: 'Email', data: email },
        password: { label: 'Password', data: password },
        age: { label: 'Age', data: age },
        region: { label: 'Region', data: region }
      };
   try {
      const response = await fetch(`/api/users/update/${userId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username, age, region })
      });
      if (response.ok) {
        setUserData(updateItem);
        dispatch(update(updateItem));
      }
    }  
    catch (error) {
      throw error;
    }
  }

  const redirectToLogin = () => {
    navigate('/login');
  }

  const userOptions = userData 
    ? Object.keys(userData).map(data => {
        const property = data as keyof ProfileData;
        return (
          <div key={data} className='flex flex-col'>
          <label 
            htmlFor={data}
            className='text-lg font-semibold mb-2 capitalize text-gray-700'
          >
            {userData[property].label}
          </label>
            <input
              type={data === 'password' ? 'password' : data === 'age' ? 'number' : 'text'}
              defaultValue={userData[property].data}
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              id={data}
            />
          </div>
        );
      })
    : null;

  const loginRedirectTemplate = (
    <div>
      No user currently logged in
    </div>
  );

  const saveButton = (
    <button 
      className='w-full px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      onClick={saveAllChanges}
    >
      Save Changes
    </button>
  );

  const redirectToLoginButton = (
    <button 
      className='w-full px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      onClick={redirectToLogin}>Login
    </button>
  );

  return (
    <div>
      <form
        className='max-w-3xl mx-auto p-6 bg-white rounded-lg space-y-6'
        id="userDetailsForm"
      >
        {userData ? userOptions : loginRedirectTemplate}
      </form>
      {userData ? saveButton : redirectToLoginButton}
    </div>
  )
}

export default Profile;