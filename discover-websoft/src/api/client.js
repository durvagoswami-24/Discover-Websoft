import axios from "axios";

// Set VITE_API_URL in a .env file at the project root (same level as
// package.json) once the server is running, e.g.:
//   VITE_API_URL=http://localhost:5000/api
// Falls back to localhost:5000 for local development if not set.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

// Attaches the logged-in customer's token to every request automatically,
// so individual API calls never need to handle this themselves.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("dw_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
