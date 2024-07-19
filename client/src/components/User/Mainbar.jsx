import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const MainBar = ({ selectedProjectId }) => {
  const { tasks } = useSelector(state => state.task);
  const [showAllTasks, setShowAllTasks] = useState(false);

  useEffect(() => {
    if (selectedProjectId) {
      setShowAllTasks(false);
    }
  }, [selectedProjectId]);

  const tasksToDisplay = showAllTasks ? tasks : (selectedProjectId ? tasks.filter(task => task.project_id === selectedProjectId) : tasks);

  const handleHeaderClick = () => {
    setShowAllTasks(true);
  };

  return (
    <div>
      <Typography variant="h5" onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
        Tasks
      </Typography>
      <List>
        {tasksToDisplay.map(task => (
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
    </div>
  );
};

export default MainBar;
