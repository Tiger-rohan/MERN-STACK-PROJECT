import { createSlice } from '@reduxjs/toolkit';
import { fetchUserTasks } from '../actions/taskActions';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(t => t._id === action.payload._id);
      state.tasks[index] = action.payload;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(t => t._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
