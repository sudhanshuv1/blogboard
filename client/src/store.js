import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Import combineReducers
import { apiSlice } from './features/apiSlice'; // RTK Query API slice
import uiReducer from './features/uiSlice'; // Redux slice for UI state
import authReducer from './features/authSlice'; // Redux slice for authentication
import postsReducer from './features/postsSlice'; // Redux slice for posts

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui', 'posts'], // Specify which reducers to persist
};

// Combine reducers into a single reducer function
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API reducer (not persisted)
  ui: uiReducer, // UI state
  auth: authReducer, // Authentication state
  posts: postsReducer, // Posts state
});

// Wrap the combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore redux-persist actions
      },
    }).concat(apiSlice.middleware), // Add RTK Query middleware
});

// Create the persistor
export const persistor = persistStore(store);

export default store;