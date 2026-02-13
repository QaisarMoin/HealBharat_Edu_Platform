import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQuestions, submitAssessment } from '../services/assessmentApi';

// Async Thunks
export const getQuestions = createAsyncThunk(
    'assessment/getQuestions',
    async (_, thunkAPI) => {
        try {
            return await fetchQuestions();
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const submitQuiz = createAsyncThunk(
    'assessment/submitQuiz',
    async (answers, thunkAPI) => {
        try {
            return await submitAssessment(answers);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    answers: [], // Array of { questionId, selectedOptionIndex }
    result: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        reset: (state) => initialState,
        saveAnswer: (state, action) => {
            const { questionId, selectedOptionIndex } = action.payload;
            // Check if answer already exists
            const existingAnswerIndex = state.answers.findIndex(a => a.questionId === questionId);
            if (existingAnswerIndex !== -1) {
                state.answers[existingAnswerIndex] = { questionId, selectedOptionIndex };
            } else {
                state.answers.push({ questionId, selectedOptionIndex });
            }
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
            }
        },
        prevQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.questions = action.payload;
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(submitQuiz.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submitQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.result = action.payload;
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, saveAnswer, nextQuestion, prevQuestion } = assessmentSlice.actions;
export default assessmentSlice.reducer;
