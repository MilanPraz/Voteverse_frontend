import { useAuthState } from "@/store/refreshToken";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, //10 sec
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    //retrive the token
    const accessToken = useAuthState.getState().accessToken; // getState() instead of useAuthStore() hook
    // If token exists, add it to headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
