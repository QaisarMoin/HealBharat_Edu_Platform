import api, { setAuthToken } from './api';

// Login admin
export const loginAdmin = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        setAuthToken(response.data.token);
    }
    return response.data;
};

// Get admin profile
export const getAdminProfile = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};
