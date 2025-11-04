import axios from 'axios';

export const client = axios.create({
  // withCredentials: true,
  baseURL: import.meta.env.VITE_APP_API_URL, // 동적으로 API URL 설정
  headers: {
    // 'Access-Control-Allow-Credentials': true,
    'ngrok-skip-browser-warning': true,
  },
});
