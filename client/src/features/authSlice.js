import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // Safely parse user
    token: localStorage.getItem('token') || null, // Load token from localStorage
    isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken; // Store accessToken as token
      state.blog = action.payload.blog; // Store blogId (optional)
      state.isAuthenticated = true;

      // Store user, token, and blogId in localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.blog = null; // Clear blogId (optional)
      state.isAuthenticated = false;

      // Clear user, token, and blogId from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentBlog = (state) => state.auth.blog; // Optional: if you want to access blogId
export default authSlice.reducer;