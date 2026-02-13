import axios from 'axios';

const API_URL = 'http://localhost:5050/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('adminToken', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('adminToken');
    }
};

// Initialize token from localStorage
const token = localStorage.getItem('adminToken');
if (token) {
    setAuthToken(token);
}

export default api;
