import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_USER_MANAGEMENT,
  withCredentials: true, // IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    console.log(
      `[REQUEST] ${config.method?.toUpperCase()} ${config.url}`
    );

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized");

      // Redirect to login or logout user
       window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;