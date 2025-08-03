import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadCsvFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/upload', formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      return error.response.data;
    } else {
      // Network error or other issues
      throw new Error('Network error: Unable to connect to server');
    }
  }
};

export default api;
