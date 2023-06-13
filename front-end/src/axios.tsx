import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

let store : any
export const injectStore = (_store : any) => {
  store = _store
}
export const instanceWithInterCeptor : AxiosInstance = axios.create({
  baseURL: "sydy-cafe-backend.vercel.app",
});
export const instanceWithNoInterceptor : AxiosInstance = axios.create({
  baseURL: "sydy-cafe-backend.vercel.app",
});

instanceWithInterCeptor.interceptors.request.use( function (config : InternalAxiosRequestConfig) {
  config.headers.token = `Bearer ${store.getState().auth.currentUser.accessToken}`;
  return config
} , function (error) {
    console.log(error)
  return Promise.reject(error);
})
