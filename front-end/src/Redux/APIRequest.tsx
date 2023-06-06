import axios from "axios";

import {
  loginFalse,
  loginStart,
  loginSuccess,
  registerFalse,
  registerStart,
  registerSuccess,
} from "./Reducers/AuthReducer";
import { AppDispatch } from "./store";

export const loginUser = async (
  user: any,
  dispatch: AppDispatch,
  navigate: any
) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://sydy-cafe-backend.vercel.app/v1/auth/login",
      user
    );
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFalse());
  }
};
export const registerUser = async (
  user: any,
  dispatch: AppDispatch,
  navigate: any
) => {
  dispatch(registerStart());
  try {
    await axios.post(
      "https://sydy-cafe-backend.vercel.app/v1/auth/register",
      user
    );
    dispatch(registerSuccess);
    navigate("/login");
  } catch (error) {
    dispatch(registerFalse);
  }
};
