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

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken();
      if (!token) return rejectWithValue('No token found');

      const formData = new FormData();
      
      /**
       * Append user fields
       */
      if (userData.name) formData.append('name', userData.name);
      if (userData.email) formData.append('email', userData.email);
      if (userData.password) formData.append('password', userData.password);
      if (userData.avatar) formData.append('avatar', userData.avatar);
      if (userData.cover) formData.append('cover', userData.cover);
      
      /**
       * Append profile fields
       */
      if (userData.bio !== undefined) formData.append('bio', userData.bio);
      if (userData.website) formData.append('website', userData.website);
      if (userData.location) formData.append('location', userData.location);
      if (userData.phone) formData.append('phone', userData.phone);
      if (userData.description) formData.append('description', userData.description);
      if (userData.stars) formData.append('stars', userData.stars);
      if (userData.skills && Array.isArray(userData.skills)) {
        userData.skills.forEach((skill, index) => {
          formData.append(`skills[${index}]`, skill);
        });
      }
      if (userData.username) formData.append('username', userData.username);
      if (userData.first_name) formData.append('first_name', userData.first_name);
      if (userData.last_name) formData.append('last_name', userData.last_name);
      if (userData.experience) formData.append('experience', JSON.stringify(userData.experience));
      if (userData.education) formData.append('education', JSON.stringify(userData.education));

      const response = await axios.post(
        getApiUrl(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE),
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
        }
      );
      
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          message: error.response.data?.message || 'Failed to update profile',
          errors: error.response.data?.errors || {}
        });
      }
      return rejectWithValue({ message: error.message || 'An error occurred while updating profile' });
    }
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
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
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
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update profile';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;