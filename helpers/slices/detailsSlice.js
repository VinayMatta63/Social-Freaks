import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product = action.payload;
    },
    removeProduct: (state, action) => {
      state.product = {};
    },
  },
});

export const { addProduct, removeProduct } = detailsSlice.actions;
export const selectProduct = (state) => {
  return state.detailsReducer.product;
};
export default detailsSlice.reducer;
