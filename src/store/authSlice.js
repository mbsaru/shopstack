// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { setItem, removeItem } from '@/utils/cookiesClient';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      setItem('authToken', action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      setItem('user', JSON.stringify(action.payload));
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      removeItem('authToken');
      removeItem('user');
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
