import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProjects } from '../actions/UserProjectActions';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    updateProject(state, action) {
      const index = state.projects.findIndex(p => p._id === action.payload._id);
      state.projects[index] = action.payload;
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter(p => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setProjects, addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
