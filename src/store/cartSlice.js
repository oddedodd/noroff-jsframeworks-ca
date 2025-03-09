/**
 * @fileoverview Redux slice for managing shopping cart state including persistence to localStorage
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Loads cart state from localStorage
 * @returns {Object} Initial cart state with items array and total
 */
const loadCartState = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return {
        items: [],
        total: 0,
      };
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return {
      items: [],
      total: 0,
    };
  }
};

/**
 * Redux slice for cart functionality
 * @type {import('@reduxjs/toolkit').Slice}
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
    /**
     * Adds an item to cart or increments quantity if it exists
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with product payload
     */
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((total, item) => 
        total + (item.discountedPrice || item.price) * item.quantity, 0
      );
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },

    /**
     * Removes an item from cart
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with product ID payload
     */
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => 
        total + (item.discountedPrice || item.price) * item.quantity, 0
      );
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },

    /**
     * Updates quantity of an item in cart
     * @param {Object} state - Current cart state
     * @param {Object} action - Action with ID and quantity payload
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce((total, item) => 
          total + (item.discountedPrice || item.price) * item.quantity, 0
        );
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },

    /**
     * Clears all items from cart
     * @param {Object} state - Current cart state
     */
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      // Clear localStorage
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;