
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProjects } from '../../actions/UserProjectActions';
// import { fetchUserTasks } from '../../actions/taskActions';

// const ProjectList = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector(state => state.user);
//   const userId = user?.user_id
//   const { projects, status, error } = useSelector(state => state.project);

//   console.log(tasks)
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchUserTasks(userId));
//       dispatch(fetchUserProjects(userId));
//     }
//   }, [userId, dispatch]);


//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Projects</h1>
//       <ul>
//         {projects.map(project => (
//           <li key={project.project_id}>{project.project_name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProjectList;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProjects } from '../../actions/UserProjectActions';
import { fetchUserTasks } from '../../actions/taskActions';
import LeftSideBar from './LeftSideBar';
import MainBar from './Mainbar';
import { Grid, Container } from '@mui/material';
const User = () => {
  const dispatch = useDispatch();
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
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <LeftSideBar onSelectProject={handleSelectProject} />
        </Grid>
        <Grid item xs={9}>
          <MainBar selectedProjectId={selectedProjectId} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default User;

