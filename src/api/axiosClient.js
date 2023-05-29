import axios from "axios";

const client = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000,
});

client.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.getItem("access_token");
  return config;
});

export default client;
