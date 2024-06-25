//store.js
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";

//create store
export const store = configureStore({
  //It accepts an object as argument
  //It specify all the reducers from slices that belong to features
  reducer: {
    allCart: cartSlice,
  },
});
