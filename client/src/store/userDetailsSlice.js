// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchUserProjects, fetchUserTasks } from '../actions/UserProjectActions';
// import axios from 'axios';

// // Initial state
// const initialState = {
//   userDetails: {},
//   projects: [],
//   tasks: [],
//   error: null,
//   loading: false,
// };

// // Async thunks
// export const fetchUserDetails = createAsyncThunk(
//   'userDetails/fetchUserDetails',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/userDetails/${id}`);
//       console.log(response.data)
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const updateUserDetails = createAsyncThunk(
//   'userDetails/updateUserDetails',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`/api/userDetails/${id}`, data);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const deleteUserDetails = createAsyncThunk(
//   'userDetails/deleteUserDetails',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`/api/userDetails/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );


// const userDetailsSlice = createSlice({
//   name: 'userDetails',
//   initialState,
//   reducers: {
//     userDetailsError(state, action) {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch User Details
//       .addCase(fetchUserDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserDetails.fulfilled, (state, action) => {
//         state.userDetails = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchUserDetails.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })
//       // Update User Details
//       .addCase(updateUserDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUserDetails.fulfilled, (state, action) => {
//         state.userDetails = action.payload;
//         state.loading = false;
//       })
//       .addCase(updateUserDetails.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })
//       // Delete User Details
//       .addCase(deleteUserDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteUserDetails.fulfilled, (state) => {
//         state.userDetails = {};
//         state.loading = false;
//       })
//       .addCase(deleteUserDetails.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })
//       // Fetch User Projects
//       .addCase(fetchUserProjects.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProjects.fulfilled, (state, action) => {
//         state.projects = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchUserProjects.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })
//       // Fetch User Tasks by Project
//       .addCase(fetchUserTasks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserTasks.fulfilled, (state, action) => {
//         state.tasks = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchUserTasks.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       });
//   },
// });

// export const { userDetailsError } = userDetailsSlice.actions;

// export default userDetailsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProjects, fetchUserTasks } from '../actions/UserProjectActions';
import axios from 'axios';

// Initial state
const initialState = {
  userDetails: {},
  projects: [],
  tasks: [],
  error: null,
  loading: false,
};

// Async thunks
export const fetchUserDetails = createAsyncThunk(
  'userDetails/fetchUserDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/userDetails/${id}`);
      console.log(response.data)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'userDetails/updateUserDetails',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/userDetails/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUserDetails = createAsyncThunk(
  'userDetails/deleteUserDetails',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/userDetails/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  'userDetails/updateTaskStatus',
  async ({ taskId, userId, projectId, newStatus }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/userDetails/${userId}/project/${projectId}/task/${taskId}`, {
        task_status: newStatus
      });

      await axios.put(`/api/tasks/${taskId}`, {
        task_status: newStatus
      });

      return { taskId, newStatus };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    userDetailsError(state, action) {
      state.error = action.payload;
    },
    updateTaskStatusLocally(state, action) {
      const { taskId, newStatus } = action.payload;
      state.tasks = state.tasks.map(task =>
        task.task_id === taskId ? { ...task, task_status: newStatus } : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Update User Details
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Delete User Details
      .addCase(deleteUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserDetails.fulfilled, (state) => {
        state.userDetails = {};
        state.loading = false;
      })
      .addCase(deleteUserDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Fetch User Projects
      .addCase(fetchUserProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Fetch User Tasks by Project
      .addCase(fetchUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Update Task Status
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const { taskId, newStatus } = action.payload;
        state.tasks = state.tasks.map(task =>
          task.task_id === taskId ? { ...task, task_status: newStatus } : task
        );
        state.loading = false;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { userDetailsError, updateTaskStatusLocally } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
