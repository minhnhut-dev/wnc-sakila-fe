// axiosService.js

import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Accept": "application/json",
  },
});

// axiosInstance.defaults.validateStatus = (status) => {
//   return status < 500;
// }


axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem('sakila-user') || "{}";
  const access_token = JSON.parse(user)?.accessToken;
  if(access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalConfig = error.config;
  console.log(error)
  console.log('Access token expired');
  const user = localStorage.getItem('sakila-user') || "{}";
  if(error.response && error.response.status === 419){
    try {
      console.log('Call refresh token api');
      const result = await axiosInstance.post(`http://localhost:3000/auth/refresh-token`, {
        refreshToken:  JSON.parse(user)?.refresh_token,
      });
      const {access_token, refresh_token} = result.data;
      localStorage.setItem('sakila-user', JSON.stringify({access_token: access_token, refresh_token: refresh_token}));
      originalConfig.headers['Authorization'] = `Bearer ${access_token}`;
      return axiosInstance(originalConfig);
    } catch (error) {
      if(error.response && error.response.status === 400) {
        localStorage.removeItem('sakila-user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
});

// Function to set the authorization token
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};



const axiosService = {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};

export { axiosService, setAuthToken };
