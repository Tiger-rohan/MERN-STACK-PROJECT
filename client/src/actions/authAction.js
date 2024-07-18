import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/axios';
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.login(userData);
    const token = response.data.token;
    Cookies.set('token', token);
    localStorage.setItem('jwtToken', token);
    console.log(response)
    return response.data; // Assuming response.data contains user object
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
