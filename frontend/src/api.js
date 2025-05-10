// src/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // your FastAPI server
  headers: {
    'Content-Type': 'application/json',
  },
});

// For uploading files (with multipart/form-data)
export const uploadDocuments = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  const response = await axios.post(`${api.defaults.baseURL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// For sending a message to chatbot
export const sendMessageToBot = async (message) => {
  const response = await api.post('/chat', { message });
  return response.data;
};

export default api;
