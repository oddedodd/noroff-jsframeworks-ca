import { createSlice } from '@reduxjs/toolkit';

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

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartState(),
  reducers: {
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
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => 
        total + (item.discountedPrice || item.price) * item.quantity, 0
      );
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
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