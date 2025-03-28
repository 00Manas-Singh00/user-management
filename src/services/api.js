import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login failed');
    }
  },
};

export const userService = {
  getUsers: async (page = 1) => {
    try {
      const response = await api.get(`/users?page=${page}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch users');
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to update user');
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to delete user');
    }
  },
};