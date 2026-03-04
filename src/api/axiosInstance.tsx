import axios from "axios";
import { store } from "@/app/store"; // Impor store Redux kamu

const axiosInstance = axios.create({
  baseURL: "https://library-backend-production-b9cf.up.railway.app/api",
});

// Interceptor untuk menyisipkan token secara otomatis
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token; // Ambil token dari state auth
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
