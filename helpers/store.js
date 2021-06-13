import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import detailsReducer from "./slices/detailsSlice";

export const store = configureStore({
  reducer: combineReducers({ cartReducer, detailsReducer }),
});
