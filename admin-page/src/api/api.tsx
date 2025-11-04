import axios from "axios";

// axios 클라이언트 설정
export const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // 동적으로 API URL 설정
  headers: {
    "ngrok-skip-browser-warning": true,
    "Content-Type": "application/json", // 모든 요청에 기본 content-type 설정
  },
  withCredentials: true, // 쿠키를 자동으로 포함하여 요청 (cross-origin에서 사용)
});

// 요청을 보낼 때마다 세션에서 토큰을 포함시킵니다.
client.interceptors.request.use(
  (config) => {
    // 세션 스토리지에서 토큰 가져오기
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
