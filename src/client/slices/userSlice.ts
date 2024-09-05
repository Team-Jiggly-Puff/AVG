import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileData } from 'types/userTypes';


const initialState: ProfileData = {
  firstName: { label: 'First Name', data: '' },
  lastName: { label: 'Last Name', data: '' },
  username: { label: 'Username', data: '' },
  email: { label: 'Email', data: '' },
  age: { label: 'Age', data: '' },
  dateOfBirth: { label: 'Date of Birth', data: '' },
  city: { label: 'City', data: '' },
  state: { label: 'State', data: '' },
  region: { label: 'Region', data: '' }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<ProfileData>) => {
      Object.keys(action.payload).forEach(item => {
        const data = action.payload[item as keyof ProfileData].data;
        state[item as keyof ProfileData].data = data;
      })
      console.log('state', state);
    }
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;