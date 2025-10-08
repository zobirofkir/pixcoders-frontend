import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getApiUrl, API_CONFIG } from '../../config/api';
import { getAuthToken, removeAuthToken } from '../../utils/cookies';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(getApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        email,
        password,
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return rejectWithValue({ message: 'Invalid email or password. Please try again.' });
        }
        return rejectWithValue({ 
          message: error.response.data?.message || 'Login failed. Please try again.' 
        });
      } else if (error.request) {
        return rejectWithValue({ message: 'No response from server. Please check your connection.' });
      }
      return rejectWithValue({ message: error.message || 'An error occurred during login.' });
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, { rejectWithValue }) => {
    const token = getAuthToken();
    if (!token) return rejectWithValue('No token found');
    
    const response = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.AUTH.ME), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    return response.data.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          ...(action.payload.user || {}) 
        };
        state.accessToken = action.payload.accessToken?.accessToken || null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.accessToken = getAuthToken();
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user';
        state.isAuthenticated = false;
        state.user = {
          id: action.payload?.id,
          email: action.payload?.email,
        };
        state.accessToken = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;