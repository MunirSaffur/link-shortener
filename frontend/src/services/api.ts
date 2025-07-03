import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {

    const token: any = localStorage.getItem('access_token');
    const guestId: any = localStorage.getItem('x-guest-id');


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (guestId) {
      config.headers['x-guest-id'] = guestId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
