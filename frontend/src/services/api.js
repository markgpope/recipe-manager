import axios from 'axios';
import useAuthStore from '../store/authStore';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const recipeService = {
  getAll: () => api.get('/recipes'),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`)
};

export const importService = {
  fromInstagram: (username, password) => 
    api.post('/import/instagram', { username, password }),
  fromNotes: (notes) => 
    api.post('/import/notes', { notes })
};

export const collectionService = {
  getAll: () => api.get('/collections'),
  create: (data) => api.post('/collections', data),
  update: (id, data) => api.put(`/collections/${id}`, data),
  delete: (id) => api.delete(`/collections/${id}`)
};

export const authService = {
  verifyToken: (token) => api.post('/auth/verify', { token })
};

export default api;
