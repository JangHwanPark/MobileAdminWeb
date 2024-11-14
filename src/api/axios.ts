import axios from 'axios';

// 기본설정을 포함한 AXIOS 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080',   // api 기본 url
    timeout: 5000,                      // 요청 타임아웃
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;