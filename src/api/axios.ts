import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // utile se usi i cookie per la sessione
});

export default api;