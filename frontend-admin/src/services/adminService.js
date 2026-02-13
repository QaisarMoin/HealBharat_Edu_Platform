import api from './api';

// Get all users (admin only)
export const getAllUsers = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `/admin/users${queryString ? `?${queryString}` : ''}`;
    const response = await api.get(url);
    return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
};

// Create new user
export const createUser = async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
};

// Update user
export const updateUser = async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
};

// Delete user
export const deleteUser = async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
};

// Get all courses
export const getAllCourses = async () => {
    const response = await api.get('/admin/courses');
    return response.data;
};

// Get all quizzes
export const getAllQuizzes = async () => {
    const response = await api.get('/admin/quizzes');
    return response.data;
};

// Get dashboard stats
export const getDashboardStats = async () => {
    const response = await api.get('/admin/stats');
    return response.data;
};
