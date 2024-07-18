import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/axios';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.login(userData);
    const token = response.data.token;
    localStorage.setItem('token', token);
    Cookies.set('token', token)
    console.log(response)
    return response.data; // Assuming response.data contains user object
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
