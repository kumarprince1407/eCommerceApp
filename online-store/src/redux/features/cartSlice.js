//CartSlice.jsx
import { createSlice } from "@reduxjs/toolkit"; //1. Import the createSlice function

const initialState = {
  carts: [],
};

//2.Invoking the 'createSlice' function and assigning it to a constantvariable.
const cartSlice = createSlice({
  name: "cartSlice", //This string is used to identify the slice
  initialState: initialState, //Sets the initial state of the slice
  reducers: {
    //The object where we define the reducer functions that will handle actions related to the slice

    //state represents the current state of the slice whereas action represents the dispatched action
    addToCart: (state, action) => {
      //console.log("action:", action);

      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log("item index: ", itemIndex);
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, temp];
      }
    },

    removeFromCart: (state, action) => {
      const updatedCartData = state.carts.filter(
        (item) => item.id !== action.payload
      );
      state.carts = updatedCartData;
    },

    //remove single item
    removeSingleItem: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.carts[itemIndex].qnty >= 1) {
        state.carts[itemIndex].qnty -= 1;
      }
    },

    //clear cart
    emptyEntireCart: (state, action) => {
      state.carts = [];
    },
  },
});

//exporting the actions
export const { addToCart, removeFromCart, removeSingleItem, emptyEntireCart } =
  cartSlice.actions;

//exporting the reducer
export default cartSlice.reducer;
