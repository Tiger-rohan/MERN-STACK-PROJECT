import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProjects } from '../../actions/UserProjectActions';
import { fetchUserTasks } from '../../actions/taskActions';
import LeftSideBar from './LeftSideBar';
import MainBar from './Mainbar';
import { Container, Typography, Grid, Paper, AppBar, Toolbar, Button, Box, CssBaseline } from '@mui/material';
import { logout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';


const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const userId = user?.user_id;

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserTasks(userId));
      dispatch(fetchUserProjects(userId));
    }
  }, [userId, dispatch]);

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
          {/* <Button color="inherit" onClick={handleLogout}>Logout</Button> */}
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
