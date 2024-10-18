// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com/api', // Replace with your API URL
  timeout: 10000, // Optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any authorization token or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
