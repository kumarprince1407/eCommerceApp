import { createSlice } from "@reduxjs/toolkit"; //1. Import the createSlice function

const initialState = {
  carts: [],
};

//2.Now we will invoke the function and assign it to a constant.
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    //add to cart
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
