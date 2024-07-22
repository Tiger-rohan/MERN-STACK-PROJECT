// authAction.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/axios';
import Cookies from 'js-cookie';
import { logout } from '../store/userSlice';

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.login(userData);
    const token = response.data.token;
    Cookies.set('token', token);
    localStorage.setItem('jwtToken', token);
    console.log(response.data)
    return response.data; // Assuming response.data contains user object
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = () => (dispatch) => {
  Cookies.remove('token');
  localStorage.removeItem('jwtToken');
  dispatch(logout());
};
