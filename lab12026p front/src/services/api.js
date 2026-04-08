import axios from "axios";

const api = axios.create({
  baseURL: "https://arqui-lab12-latest.onrender.com/api"
});

export default api;