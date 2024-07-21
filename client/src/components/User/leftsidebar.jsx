import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const LeftSideBar = ({ onSelectProject }) => {
  const { projects } = useSelector(state => state.userDetails);

  return (
    <div>
      <Typography variant="h5">Projects Owned</Typography>
      <List>
        {projects.map(project => (
          <ListItem button key={project.project_id} onClick={() => onSelectProject(project.project_id)}>
            <ListItemText primary={project.project_name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LeftSideBar;
