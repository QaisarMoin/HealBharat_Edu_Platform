import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAdmin, getAdminProfile } from '../services/authService';

// Get token from localStorage
const token = localStorage.getItem('adminToken');

const initialState = {
  admin: null,
  token: token || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Login admin
export const loginAdminUser = createAsyncThunk(
  'adminAuth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await loginAdmin(credentials);
      localStorage.setItem('adminToken', response.token);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get admin profile
export const getAdmin = createAsyncThunk(
  'adminAuth/getProfile',
  async (_, thunkAPI) => {
    try {
      const response = await getAdminProfile();
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem('adminToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdminUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAdminUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginAdminUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Profile
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
