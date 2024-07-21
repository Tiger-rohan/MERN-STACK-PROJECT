import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProjects, fetchUserTasks } from '../../actions/UserProjectActions';
import LeftSideBar from './leftsidebar';
import MainBar from './mainbar';
import { Container, Typography, Grid, Paper, AppBar, Toolbar, Box, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const userId = user?.user_id;

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProjects(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && selectedProjectId) {
      dispatch(fetchUserTasks({ userId, projectId: selectedProjectId }));
    }
  }, [userId, selectedProjectId, dispatch]);

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchUserTasks(userId));
//       dispatch(fetchUserProjects(userId));
//     }
//   }, [userId, dispatch]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (userId) {
//         dispatch(fetchUserTasks(userId));
//         dispatch(fetchUserProjects(userId));
//       }
//     }, 5000); // Fetch data every 5 seconds

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [userId, dispatch]);

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {user?.name ? `${user.name}'s Dashboard` : 'User Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1, p: 2 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
              <LeftSideBar onSelectProject={handleSelectProject} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
              <MainBar selectedProjectId={selectedProjectId} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default User;
