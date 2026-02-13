import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import assessmentReducer from './assessmentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        assessment: assessmentReducer,
    },
});
