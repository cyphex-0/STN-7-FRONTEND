import axios from "axios";
import { getToken, clearToken } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 15000, // 15 seconds HTTP timeout to prevent indefinite hangs
});

// Request interceptor - automatically add token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      clearToken();
      window.location.href = "/login";
    }

    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      console.warn("API request timed out after 15 seconds:", error.config?.url);
    }

    return Promise.reject(error);
  }
);

export default api;
