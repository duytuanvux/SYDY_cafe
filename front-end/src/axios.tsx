import axios from "axios";
export const instance = axios.create({
  baseURL: "https://sydy-cafe-backend.vercel.app",
});
