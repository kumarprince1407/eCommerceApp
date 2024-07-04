//userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import UserInfo from "../../components/UserInfo";

//Async thunk action created using createAsyncThunk which takes TWO arguments
export const submitUserInfo = createAsyncThunk(
  "user/submitUserInfo", //This argument is a string that represents the action type
  async (UserInfo, { rejectWithValue }) => {
    //The second argument is a async function that makes a POST request to the backend
    try {
      const response = await axios.post(
        "http://localhost:3005/submitUserInfo",
        UserInfo
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Initial state
const initialState = {
  users: [], // to store the user information
  status: "idle", //keeps track of the current status of the async operation
  error: null, //stores the error message(if any)
};

//Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(submitUserInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
