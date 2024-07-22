import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppSelector } from '../../services/hooks';

const MainBar = ({ selectedProjectId }) => {
  const { tasks } = useAppSelector(state => state.userDetails);
  const [showAllTasks, setShowAllTasks] = useState(false);

  useEffect(() => {
    if (selectedProjectId) {
      setShowAllTasks(false);
    }
  }, [selectedProjectId]);

  // Filter tasks based on selected project ID
  const tasksToDisplay = selectedProjectId
    ? tasks.filter(task => task.project_id === selectedProjectId)
    : [];


  // Click handler to show all tasks
  const handleHeaderClick = () => {
    setShowAllTasks(true);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
          Tasks
        </Typography>
        <List>
          {selectedProjectId ? (
            tasksToDisplay.length > 0 ? (
              tasksToDisplay.map(task => (
                <ListItem key={task._id}>
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
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No tasks available for this project." />
              </ListItem>
            )
          ) : (
            <ListItem>
              <ListItemText primary="Select a project to display tasks." />
            </ListItem>
          )}
        </List>
      </motion.div>
    </div>
  );
};

export default MainBar;
