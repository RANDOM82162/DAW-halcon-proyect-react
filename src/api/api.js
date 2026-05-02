import axios from "axios";

const api = axios.create({
  baseURL: "https://web-production-8c8e3.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;