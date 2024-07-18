import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const MainBar = ({ selectedProjectId }) => {
  const { tasks } = useSelector(state => state.task);

  const filteredTasks = tasks.filter(task => task.project_id === selectedProjectId);

  return (
    <div>
      <h2>Tasks</h2>
      {filteredTasks.length === 0 ? (
        <Typography>No tasks found for this project.</Typography>
      ) : (
        <List>
          {filteredTasks.map(task => (
            <ListItem key={task.task_id}>
              <ListItemText
                primary={task.task_description}
                secondary={
                  <>
                    {`Status: ${task.task_status}`}
                    <br />
                    {`Due Date: ${new Date(task.task_dueDate).toLocaleDateString()}`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default MainBar;
