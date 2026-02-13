import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for Android emulator or specific IP for physical device
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5050/api' : 'http://localhost:5050/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
// Note: You'll need to implement a way to set this token (e.g., from AsyncStorage)
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const fetchQuestions = async () => {
    constresponse = await api.get('/assessment/questions');
    return response.data;
};

export const submitAssessment = async (answers) => {
    const response = await api.post('/assessment/submit', { answers });
    return response.data;
};

export default api;
