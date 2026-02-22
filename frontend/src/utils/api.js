import axios from "axios";

const api = axios.create({
  // 🟢 NOW: Just the root URL as requested
  baseURL: "https://nutrigen-khwj.onrender.com",

  // 🟢 CRITICAL: This ensures cookies are sent to the backend
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
