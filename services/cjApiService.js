import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const cjApi = axios.create({
  baseURL: process.env.CJ_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add CJ Access Token dynamically
cjApi.interceptors.request.use((config) => {
  const token = process.env.CJ_API_TOKEN;
  console.log(token);

  if (token) {
    config.headers["CJ-Access-Token"] = token;
  }
  return config;
});

export default cjApi;
