import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const CreateTask = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskStatus, setTaskStatus] = useState('not started');
  const [ownerId, setOwnerId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/tasks', {
        task_description: taskDescription,
        task_dueDate: taskDueDate,
        task_status: taskStatus,
        owner_id: ownerId,
        project_id: projectId,
      });
      setSuccess('Task created successfully!');
      setTaskDescription('');
      setTaskDueDate('');
      setOwnerId('');
      setProjectId('');
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Task
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Task Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
            <TextField
              label="Due Date"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="not started">Not Started</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Owner ID"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              required
            />
            <TextField
              label="Project ID"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Task
            </Button>
          </form>
          {error && <Typography color="error" mt={2}>{error}</Typography>}
          {success && <Typography color="success" mt={2}>{success}</Typography>}
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateTask;
