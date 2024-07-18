import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TableContainer } from '@mui/material';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSave = () => {
        fetchTasks();
        setDialogOpen(false);
        setSelectedTask(null);
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setDialogOpen(true);
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCancel = () => {
        setDialogOpen(false);
        setSelectedTask(null);
    };

    const handleOpenDialog = () => {
        setSelectedTask(null);
        setDialogOpen(true);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Task Manager
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Create Task
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
            </TableContainer>
            <Dialog open={dialogOpen} onClose={handleCancel}>
                <DialogTitle>{selectedTask ? 'Update Task' : 'Create Task'}</DialogTitle>
                <DialogContent>
                    <TaskForm task={selectedTask} onSave={handleSave} onCancel={handleCancel} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TaskManager;
