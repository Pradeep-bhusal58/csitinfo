import axios from 'axios';
import { CSITMaterialItem, ContactFormData } from '../types.js';

// Setup Base API Client
const API = axios.create({
  baseURL: '/api',
});

// Automatically inject JWT Token from LocalStorage if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('csit_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Authentication API Services
export const authService = {
  register: async (name: string, email: string, password: string) => {
    const res = await API.post('/auth/register', { name, email, password });
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await API.post('/auth/login', { email, password });
    return res.data;
  },

  getProfile: async () => {
    const res = await API.get('/auth/profile');
    return res.data;
  }
};

// Contact Form API Services
export const contactService = {
  submitMessage: async (data: ContactFormData) => {
    const res = await API.post('/contact', data);
    return res.data;
  }
};

// Academic Materials and Notices Services
export const academicService = {
  getMaterials: async (params?: { type?: string; semester?: string; q?: string }) => {
    const res = await API.get<{ success: boolean; count: number; data: CSITMaterialItem[] }>('/materials', { params });
    return res.data;
  },

  getNotices: async () => {
    const res = await API.get<{ success: boolean; data: CSITMaterialItem[] }>('/materials/notices');
    return res.data;
  }
};

export default API;
