import axios from "axios";

const client = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000,
});

client.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.getItem("access_token");
  return config;
});

client.interceptors.response.use((response) => {
  if(response.data) {
    return response.data
  }
},
  error => {
    if(error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    else {
      return Promise.reject()
    }
  }
)

export default client;
