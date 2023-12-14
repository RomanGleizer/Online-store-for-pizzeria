import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  username: '',
  phone: 0,
  isLoading: false,
  lastOrder: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
        thisUser = {...state, ...action.payload};
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;