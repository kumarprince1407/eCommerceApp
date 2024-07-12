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

      console.log("item index: ", itemIndex); //
      console.log("Payload: ", action.payload);
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.carts = [...state.carts, temp];
      }
      console.log("Carts:", state.carts);
    },
    //TODO: Combine removeFromCart and removeSingleItem
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

    //combined reducers for the above two reducer functions
    //We can achieve this by handling both cases within the same function and using an additional parameter in the action payload to differentiate between the two actions.

    removeItem: (state, action) => {
      //Find the index of the item to be removed
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      //checking if the item exists already in the cart
      if (itemIndex >= 0) {
        //Case 1: Remove all instances of the item
        if (action.payload.removeAll) {
          state.carts = state.carts.filter(
            (item) => item.id !== action.payload.id
          );
        }
        //Case 2: Decrease item count by 1
        else {
          if (state.carts[itemIndex].qnty > 1) {
            state.carts[itemIndex].qnty--;
          }
          //If the quantity is 1 or less, remove the item entirely
          else {
            state.carts = state.carts.filter(
              (item) => item.id !== action.payload.id
            );
          }
        }
      }
    },
    //clear cart
    emptyEntireCart: (state, action) => {
      state.carts = [];
    },
  },
});

//exporting the actions
export const {
  addToCart,
  removeFromCart,
  removeSingleItem,
  emptyEntireCart,
  removeItem,
} = cartSlice.actions;

//exporting the reducer
export default cartSlice.reducer;
