import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  userDetails: {},
  error: null,
  loading: false,
};

// Async thunks
export const fetchUserDetails = createAsyncThunk(
  'userDetails/fetchUserDetails',
  async (id) => {
    const response = await axios.get(`/api/userDetails/${id}`);
    return response.data;
  }
);

export const updateUserDetails = createAsyncThunk(
  'userDetails/updateUserDetails',
  async ({ id, data }) => {
    const response = await axios.put(`/api/userDetails/${id}`, data);
    return response.data;
  }
);

export const deleteUserDetails = createAsyncThunk(
  'userDetails/deleteUserDetails',
  async (id) => {
    await axios.delete(`/api/userDetails/${id}`);
    return id;
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    userDetailsError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserDetails.fulfilled, (state, action) => {
        // Assuming that deleting a user will clear out the details
        state.userDetails = {};
        state.loading = false;
      })
      .addCase(deleteUserDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { userDetailsError } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
