import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;