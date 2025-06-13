import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Lấy thông tin tổng quan
  getMetadata: async () => {
    const response = await api.get('/api/metadata');
    return response.data;
  },

  // Tra cứu điểm theo SBD
  getStudentByID: async (sbd) => {
    const response = await api.get(`/api/student/${sbd}`);
    return response.data;
  },

  // Tìm kiếm nhiều thí sinh
  searchStudents: async (sbds) => {
    const response = await api.post('/api/students/search', { sbds });
    return response.data;
  },

  // Thống kê theo khoảng điểm
  getScoreRangeStats: async (min = 0, max = 30) => {
    const response = await api.get('/api/statistics/score-range', {
      params: { min, max }
    });
    return response.data;
  },

  // Thống kê theo mã hội đồng
  getCouncilStats: async (ma_hd) => {
    const response = await api.get(`/api/statistics/by-council/${ma_hd}`);
    return response.data;
  },

  // Lấy top điểm cao
  getTopScores: async (limit = 10) => {
    const response = await api.get('/api/top-scores', {
      params: { limit }
    });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api; 