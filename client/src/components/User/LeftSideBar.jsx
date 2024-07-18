import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@mui/material';

const LeftSideBar = ({ onSelectProject }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector(state => state.project);

  return (
    <div>
      <h2>Projects</h2>
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
