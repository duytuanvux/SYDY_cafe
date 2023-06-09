import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("login", async (data: any) => {
  const response = await axios.post(
    "https://sydy-cafe-backend.vercel.app/v1/auth/login",
    data
  );
  return response.data;
});

export const registerUser = createAsyncThunk("register", async (data: any) => {
  const response = await axios.post(
    "https://sydy-cafe-backend.vercel.app/v1/auth/register",
    data
  );

  return response.data;
});
interface User {
  currentUser?: Object;
}

const initialState = {
  currentUser: {},
  
} as User;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout : (state) => {
     delete  state.currentUser
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      
    });
  },
});

export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions
