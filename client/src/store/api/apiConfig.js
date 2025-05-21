import axios from "axios";

// Create an axios instance with custom config
const api = axios.create({
  baseURL: "/api", // or your environment variable for the API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors by logging out the user
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth?redirect=" + window.location.pathname;
    }
    return Promise.reject(error);
  }
);

export default api;
