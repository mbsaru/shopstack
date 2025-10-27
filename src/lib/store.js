// lib/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/authSlice'; // Adjust path if authSlice is in a different location (e.g., lib/features/auth/authSlice)
import cartReducer from '@/store/cartSlice'; // Adjust path if cartSlice is in a different location

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      devTools: process.env.NODE_ENV !== 'production',
  });
};

// This file no longer exports a direct 'store' variable or `next-redux-wrapper`'s `wrapper`.
// Instead, it exports a function `makeStore` to create a new store instance.