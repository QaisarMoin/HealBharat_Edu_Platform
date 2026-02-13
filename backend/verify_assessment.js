const axios = require('axios');

const API_URL = 'http://localhost:5050/api';

const runVerification = async () => {
    try {
        console.log('1. Registering/Logging in User...');
        let token;
        try {
            const regRes = await axios.post(`${API_URL}/auth/register`, {
                mobile: `9876543210`, // Fixed mobile for consistency
                password: 'password123',
                profile: { fullName: 'Test Student', age: 16, classLevel: '10th' }
            });
            token = regRes.data.token;
        } catch (e) {
            console.log('Registration failed, trying login...');
            if (e.response && e.response.status === 400) {
                 const loginRes = await axios.post(`${API_URL}/auth/login`, {
                    identifier: '9876543210',
                    password: 'password123'
                });
                token = loginRes.data.token;
            } else {
                console.error('Registration/Login Error Details:', e.response ? e.response.data : e.message);
                throw e;
            }
        }
        console.log('Token acquired:', token);

        console.log('2. Seeding Questions...');
        await axios.post(`${API_URL}/assessment/seed`);

        console.log('3. Fetching Questions...');
        const qRes = await axios.get(`${API_URL}/assessment/questions`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const questions = qRes.data;
        console.log(`Fetched ${questions.length} questions.`);

        console.log('4. Submitting Answers...');
        const answers = questions.map((q, index) => ({
            questionId: q._id,
            selectedOptionIndex: 0 // Just picking the first option for all
        }));

        const submitRes = await axios.post(`${API_URL}/assessment/submit`, { answers }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Submission Result:', submitRes.data);
        console.log('VERIFICATION SUCCESSFUL');

    } catch (error) {
        console.error('VERIFICATION FAILED:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
};

runVerification();
