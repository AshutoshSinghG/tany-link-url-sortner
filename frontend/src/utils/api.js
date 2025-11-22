import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Create a new short link
 */
export const createLink = async (target, code = null) => {
  const response = await api.post('/api/links', { target, code });
  return response.data;
};

/**
 * Get all links
 */
export const getAllLinks = async () => {
  const response = await api.get('/api/links');
  return response.data;
};

/**
 * Get link stats by code
 */
export const getLinkStats = async (code) => {
  const response = await api.get(`/api/links/${code}`);
  return response.data;
};

/**
 * Delete a link by code
 */
export const deleteLink = async (code) => {
  const response = await api.delete(`/api/links/${code}`);
  return response.data;
};

/**
 * Get short URL for a code
 */
export const getShortUrl = (code) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  return `${baseUrl}/${code}`;
};

/**
 * Register a new user
 */
export const register = async (username, email, password) => {
  const response = await api.post('/api/auth/register', {
    username,
    email,
    password
  });
  return response.data;
};

/**
 * Login user
 */
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', {
    email,
    password
  });
  return response.data;
};

/**
 * Get current user
 */
export const getMe = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

