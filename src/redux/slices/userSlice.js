import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (Object.keys(action.payload).length === 0) {
        state.loggedIn = false;
      } else {
        state.loggedIn = true;
      }
    },
    setUserName: (state, action) => {
      state.user = {...state.user, name: action.payload}
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  changeToLoggedIn,
  changeToLoggedOut,
  setUser,
  setUserName
} = userSlice.actions;

export const userState = (state) => state.user.user;

export default userSlice.reducer;
