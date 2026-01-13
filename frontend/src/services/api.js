import axios from 'axios';

const API_URL = 'http://localhost:8000';

const getAuthToken = () => localStorage.getItem('access_token');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header to all requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (email, password, fullName) =>
    api.post('/auth/signup', {
      email,
      password,
      full_name: fullName,
    }),

  login: (email, password) =>
    api.post('/auth/login/json', {
      email,
      password,
    }),

  logout: () => api.post('/auth/logout'),

  getCurrentUser: () => api.get('/auth/me'),
};

export const taskAPI = {
  getTasks: (status = null) => {
    const params = status ? { status } : {};
    return api.get('/tasks/', { params });
  },

  getTask: (taskId) => api.get(`/tasks/${taskId}`),

  createTask: (taskData) => api.post('/tasks/', taskData),

  updateTask: (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData),

  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),
};

export const userAPI = {
  updateProfile: (userId, profileData) =>
    api.put(`/users/${userId}`, profileData),

  deleteProfile: (userId) => api.delete(`/users/${userId}`),

  getProfile: (userId) => api.get(`/users/${userId}`),
};

export default api;