import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state, action) => {
      state.items = [];
    },
    addToCart: (state, action) => {
      const indexA = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let copy = [...state.items];
      console.log(indexA);
      if (indexA >= 0) {
        copy[indexA].quantity += action.payload.quantity;
      } else {
        copy = [...state.items, action.payload];
      }
      state.items = [...copy];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let copyCart = [...state.items];

      if (index >= 0) {
        if (copyCart[index].quantity > 1) {
          copyCart[index].quantity -= 1;
        } else {
          copyCart.splice(index, 1);
        }
      } else {
        console.warn(`Item ${action.id} does not exist.`);
      }
      state.items = [...copyCart];
    },
  },
});
export const cartTotal = (cart) =>
  cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const cartSum = (cart) =>
  cart?.reduce((sum, item) => sum + item.quantity, 0);

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export const selectItems = (state) => state.cartReducer.items;
export default cartSlice.reducer;
