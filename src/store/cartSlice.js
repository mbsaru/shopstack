// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
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
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem){
        existingItem.quantity += newItem.quantity;
      }
      else{
        state.items.push({id:newItem.id, quantity:1})
      }
  
      state.totalItems += 1;
      state.totalPrice += newItem.price * newItem.quantity;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item){
        state.totalItems -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter(i => i.id !== id);        
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if(item){
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.price;

        if(item.quantity <= 0){
          state.items = state.items.filter(i => i.id !== id);
        }
      }
    },
    setCart: (state, action) => {
      const cartItems = action.payload || [];
      state.items = cartItems;
      state.totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;