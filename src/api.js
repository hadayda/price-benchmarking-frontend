import axios from 'axios';

const service_host = process.env.REACT_APP_SERVICE_HOST;
const API = axios.create({
  baseURL: `${service_host}/api/v1`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;