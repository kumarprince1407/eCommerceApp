//store.js
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import userSlice from "../features/userSlice";
import { useReducer } from "react";

//create store
export const store = configureStore({
  //It accepts an object as argument
  //It specify all the reducers from slices that belong to features
  reducer: {
    allCart: cartSlice,
    user: userSlice,
  },
});
