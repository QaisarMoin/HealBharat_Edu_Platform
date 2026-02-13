import api from './api';

export const fetchQuestions = async () => {
    const response = await api.get('/assessment/questions');
    return response.data;
};

export const submitAssessment = async (answers) => {
    const response = await api.post('/assessment/submit', { answers });
    return response.data;
};
