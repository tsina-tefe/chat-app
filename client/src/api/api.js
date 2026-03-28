import axios from "axios";
import { isTokenExpired } from "../utils/checkToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");

      window.location.href = "/api/login";
      return Promise.reject("Token expired");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request setup errors
    return Promise.reject(error);
  },
);

export default api;
