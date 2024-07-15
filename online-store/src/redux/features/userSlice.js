//userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

//Change
//Async thunk action to add new id
export const addUser = createAsyncThunk(
  "user/addUser",
  async (uid, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3005/users", { uid });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async thunk to fetch data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData", //String that represents the action type
  async (id, { rejectWithValue }) => {
    //async function that makes a GET request to the backend APi
    //{rejectWithValue}: It is a method provided by 'createAsyncThunk' to retain a custom error message
    try {
      const response = await axios.get(`http://localhost:3005/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async thunk for editing user data
export const editUserInfo = createAsyncThunk(
  "user/editUserInfo",
  async ({ id, updatedUserInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3005/users/${id}`,
        updatedUserInfo
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Initial state
// const initialState = {
//   users: [], // to store the user information
//   status: "idle", //keeps track of the current status of the async operation
//   error: null, //stores the error message(if any)
// };

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

//Create the slice
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     //
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitUserInfo.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(submitUserInfo.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.users.push(action.payload);
//       })
//       .addCase(submitUserInfo.rejected, (state, action) => {
//         state.status = "rejected";
//         state.error = action.payload;
//       });
//   },
// });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(editUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(editUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
