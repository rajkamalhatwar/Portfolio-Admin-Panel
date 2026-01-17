import axios from "axios";
import conf from "../../conf/conf.js";

console.log("AXIOS BASE URL =", conf.apiUrl);
const apiClient = axios.create({ 
  baseURL: conf.apiUrl, 
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
