import React, { useEffect, useState } from 'react';
import { ProfileData } from 'types/userTypes';
import { useAppSelector, useAppDispatch } from '../hooks';
import { update } from '../slices/userSlice';
import { Profile } from 'passport';

interface ProfileProps {
  userData: ProfileData
}

const Profile = () => {
  const [userData, setUserData] = useState<ProfileData>({} as ProfileData);
  useEffect(() => {
    try {
      (async function() {
        const response = await fetch('/api/users/verify'); // make API call to get user, dispatch after success
        console.log('response', response)
        const userData: ProfileData = await response.json();
        console.log('data', userData);
        setUserData(userData);
      })();
    }
    catch {
      console.log('no bueno');
    }
  })
  

  console.log('user data', userData)
 
  const dispatch = useAppDispatch();
  console.log('hello render')

  const saveAllChanges = () => { 
    console.log('hello save')
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const dateOfBirth = (document.getElementById('dateOfBirth') as HTMLInputElement).value;
    const city = (document.getElementById('city') as HTMLInputElement).value;
    const state = (document.getElementById('state') as HTMLInputElement).value;
    const updateItem: ProfileData = 
      {
        firstName: { label: 'First Name', data: firstName },
        lastName: { label: 'Last Name', data: lastName },
        dateOfBirth: { label: 'Date of Birth', data: dateOfBirth },
        city: { label: 'City', data: city },
        state: { label: 'State', data: state }
      };
    console.log('pressed')
    // make API call to update user, dispatch after success
    dispatch(update(updateItem));
  }

  const userOptions = Object.keys(userData).map(data => {
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
    )
  })  

  return (
    <div>
      <form
        className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6'
        id="userDetailsForm"
      >
        {userOptions}
      </form>
      <button onClick={saveAllChanges}>Save Changes</button>
    </div>
  )
}

export default Profile;