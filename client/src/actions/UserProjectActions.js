import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/axios';

export const fetchUserProjects = createAsyncThunk(
  'project/fetchUserProjects',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getUserProjects(userId);
      console.log(response.data)
      return response.data;
    } catch (err) {
        console.log(err)
      return rejectWithValue(err.response.data);
    }
  }
);
