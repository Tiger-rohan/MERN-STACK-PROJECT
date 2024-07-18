import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/axios';

export const fetchUserTasks = createAsyncThunk(
  'task/fetchUserTasks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUserTasks(userId);
      console.log(response)
      return response.data;
    } catch (err) {
        console.log(err)
      return rejectWithValue(err.response.data);
    }
  }
);
