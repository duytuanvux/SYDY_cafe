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
  currentUser: Object;
  accessToken: unknown;
}

const initialState = {
  currentUser: {},
  accessToken: null,
} as User;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
  },
});

export const authReducer = authSlice.reducer;
