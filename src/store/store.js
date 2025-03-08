import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // This helps prevent serialization issues
    }),
});

// Optional: Subscribe to store changes to save state
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  } catch (e) {
    console.error('Error saving state to localStorage:', e);
  }
}); 