import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

// Add a request interceptor to attach token
API.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (authData) => API.post('/login',authData)
export const getUserProjects = (id) => API.get(`/api/projects/owner/${id}`)
