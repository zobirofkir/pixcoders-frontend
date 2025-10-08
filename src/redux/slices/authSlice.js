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

export const updateCurrentUser = createAsyncThunk(
  'auth/updateCurrentUser',
  async (userData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) return rejectWithValue({ message: 'No token found' });

      const formData = new FormData();
      
      Object.keys(userData).forEach(key => {
        const value = userData[key];
        
        if (key === 'avatar' || key === 'cover') {
          if (value instanceof File) {
            formData.append(key, value);
          }
        } else if (key === 'skills') {
          if (Array.isArray(value)) {
            value.forEach((skill, index) => {
              formData.append(`skills[${index}]`, skill);
            });
          }
        } else if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        getApiUrl(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE),
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          },
        }
      );
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || 'Failed to update profile'
      });
    }
  }
);

// Keep updateProfile for backward compatibility
export const updateProfile = updateCurrentUser;

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
        const userData = { ...action.payload };
        if (userData.profile?.skills && typeof userData.profile.skills === 'string') {
          try {
            userData.profile.skills = JSON.parse(userData.profile.skills);
          } catch (e) {
            userData.profile.skills = [];
          }
        }
        state.user = userData;
        state.accessToken = getAuthToken();
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user';
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedData = { ...action.payload };
        
        if (updatedData.profile?.skills && typeof updatedData.profile.skills === 'string') {
          try {
            updatedData.profile.skills = JSON.parse(updatedData.profile.skills);
          } catch (e) {
            updatedData.profile.skills = [];
          }
        }
        
        state.user = {
          ...state.user,
          ...updatedData,
          profile: {
            ...state.user?.profile,
            ...updatedData.profile
          }
        };
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update profile';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;