import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice'; // RTK Query API slice
import uiReducer from './features/uiSlice'; // Redux slice for UI state
import authReducer from './features/authSlice'; // Redux slice for authentication
import postsReducer from './features/postsSlice'; // Redux slice for posts

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Adds RTK Query API reducer
    ui: uiReducer, // Manages UI state (e.g., modals, filters)
    auth: authReducer, // Manages authentication state (e.g., user info, tokens)
    posts: postsReducer, // Manages posts state (e.g., selected post, filter)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Enables RTK Query middleware for caching
});

export default store;
