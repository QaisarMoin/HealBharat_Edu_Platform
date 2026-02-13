import api, { setAuthToken } from './api';

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
        setAuthToken(response.data.token);
    }
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        setAuthToken(response.data.token);
    }
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/students/profile', profileData);
    return response.data;
};
