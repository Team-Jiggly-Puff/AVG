import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileData } from 'types/userTypes';


const initialState: ProfileData = {
  firstName: { label: 'First Name', data: 'Tristan' },
  lastName: { label: 'Last Name', data: 'Frank' },
  dateOfBirth: { label: 'Date of Birth:', data: '1994-11-19' },
  city: { label: 'City', data: 'Denver' },
  state: { label: 'State', data: 'Colorado' }
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