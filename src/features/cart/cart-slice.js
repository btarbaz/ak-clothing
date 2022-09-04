import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  cartItems: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsCartOpen: (state, { payload }) => {
      state.isCartOpen = payload;
    },
    setCartItems: (state, { payload }) => {
      state.cartItems = payload;
    },
    setClearCart: state => {
      state.isCartOpen = false;
      state.cartItems = [];
    },
  },
});

// --------------Selectors with aditional functionalities-----------------
export const selectCartCount = store =>
  store.persistedReducer.cart.cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
export const selectCartTotal = store =>
  store.persistedReducer.cart.cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
// -------------------------------------------------------------------------

// -------Selectors-------
export const selectIsCartOpen = store => store.persistedReducer.cart.isCartOpen;
export const selectCartItems = store => store.persistedReducer.cart.cartItems;

export const { setCartItems, setClearCart, setIsCartOpen } = cartSlice.actions;
export default cartSlice.reducer;
