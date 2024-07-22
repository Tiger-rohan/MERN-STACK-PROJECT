// authAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/axios';
import { logout } from '../store/userSlice';

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.login(userData);
    const token = response.data.token;
    sessionStorage.setItem('token', token);
    return response.data; // Assuming response.data contains user object
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = () => (dispatch) => {
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');
  localStorage.removeItem('jwtToken');
  dispatch(logout());
};
