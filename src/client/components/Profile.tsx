import React, { useEffect, useState } from 'react';
import { ProfileData } from 'types/userTypes';
import { useAppSelector, useAppDispatch } from '../hooks';
import { update } from '../slices/userSlice';
import { Profile } from 'passport';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  userData: ProfileData
}

const Profile = () => {
  const userDataFromStore = useAppSelector(state => state.user);
  const [userData, setUserData] = useState<ProfileData | undefined>(userDataFromStore);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      (async function() {
        const response = await fetch('/api/users/verify'); // make API call to get user, dispatch after success
        console.log('response', response)
        if (response.ok) {
          const userDataFromDb = await response.json();
          const userDataToDisplay = {
            firstName: { label: 'First Name', data: '' },
            lastName: { label: 'Last Name', data: '' },
            username: { label: 'Username', data: userDataFromDb.username },
            email: { label: 'Email', data: userDataFromDb.email },
            age: { label: 'Age', data: userDataFromDb.age },
            dateOfBirth: { label: 'Date of Birth', data: '' },
            city: { label: 'City', data: '' },
            state: { label: 'State', data: '' },
            region: { label: 'Region', data: userDataFromDb.region }
          };
          setUserData(userDataToDisplay);
          dispatch(update(userDataToDisplay));
        } else setUserData(undefined);
      })();
    }
    catch {
    
    }
  }, [])
  
 
  const dispatch = useAppDispatch();

  const saveAllChanges = () => { 
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const age = (document.getElementById('age') as HTMLInputElement).value;
    const dateOfBirth = (document.getElementById('dateOfBirth') as HTMLInputElement).value;
    const city = (document.getElementById('city') as HTMLInputElement).value;
    const state = (document.getElementById('state') as HTMLInputElement).value;
    const region = (document.getElementById('region') as HTMLInputElement).value;
    const updateItem: ProfileData = 
      {
        firstName: { label: 'First Name', data: firstName },
        lastName: { label: 'Last Name', data: lastName },
        username: { label: 'Username', data: username },
        email: { label: 'Email', data: email },
        age: { label: 'Age', data: age },
        dateOfBirth: { label: 'Date of Birth', data: dateOfBirth },
        city: { label: 'City', data: city },
        state: { label: 'State', data: state },
        region: { label: 'Region', data: region }
      };
    console.log('pressed')
    // make API call to update user, dispatch after success
    dispatch(update(updateItem));
  }

  const redirectToLogin = () => {
    navigate('/login');
  }

  const userOptions = userData 
    ? Object.keys(userData).map(data => {
        const property = data as keyof ProfileData;
        return (
          <div className='flex flex-col'>
          <label 
            htmlFor={data}
            className='text-lg font-semibold mb-2 capitalize text-gray-700'
          >
            {userData[property].label}
          </label>
            <input
              type={data === 'dateOfBirth' ? 'date' : 'text'}
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