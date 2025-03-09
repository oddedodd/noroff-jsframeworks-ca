/**
 * @fileoverview Redux store configuration and initialization
 */

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

/**
 * Subscribe to store changes to persist cart state in localStorage
 * @listens store.subscribe
 */
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  } catch (e) {
    console.error('Error saving state to localStorage:', e);
  }
}); 