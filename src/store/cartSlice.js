// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('added to cart', action.payload)
      const newItem = action.payload;
      const existingItem = state.items[newItem.id];

      if (existingItem){
        existingItem.quantity += newItem.quantity;
      }
      else{
        state.items[newItem.id] = {id:newItem.id, quantity:newItem.quantity}
      }
  
      state.totalItems += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },
    removeFromCart: (state, action) => {
      const id = action.payload.id;
      const item = state.items[id];

      if (item) {
        state.totalItems -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        delete state.items[id];
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload.id;
      const item = state.items[id];

      if(item){
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload.id;
      const item = state.items[id];

      if (item) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.price;

        if(item.quantity <= 0){
          delete state.items[id];
        }
      }
    },
    setCart: (state, action) => {
      const cartItems = action.payload || {};
      state.items = cartItems;
      state.totalItems = 0;
      state.totalPrice = 0;

      cartItems.forEach(item => {
        state.totalItems += item.quantity;
        state.totalPrice += item.price * item.quantity;
      });
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {  
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  setCart, 
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;