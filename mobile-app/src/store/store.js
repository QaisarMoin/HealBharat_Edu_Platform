import { configureStore } from '@reduxjs/toolkit';
import assessmentReducer from './assessmentSlice';

export const store = configureStore({
    reducer: {
        assessment: assessmentReducer,
    },
});
