// authAction.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/axios';
import Cookies from 'js-cookie';
import { logout } from '../store/userSlice';
import {toast} from "react-hot-toast"

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.login(userData);
    const token = response.data.token;
    Cookies.set('token', token);
    localStorage.setItem('jwtToken', token);
    console.log(response.data)
    if(response.data.error === "No user found"){
      toast.error(response.data.error)
    } else if(response.data.error === "Wrong Password"){
      toast.error(response.data.error)
    }else{
    toast.success("Login successful");
    }
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
