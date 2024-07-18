import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const TaskForm = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        task_description: '',
        task_dueDate: '',
        task_status: 'not started',
        owner_id: '',
        project_id: ''
    });

    useEffect(() => {
        if (task) {
            setFormData({
                ...task,
                task_dueDate: task.task_dueDate ? task.task_dueDate.split('T')[0] : ''
            });
        } else {
            setFormData({
                task_description: '',
                task_dueDate: '',
                task_status: 'not started',
                owner_id: '',
                project_id: ''
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...formData,
                task_dueDate: formData.task_dueDate ? formData.task_dueDate : null
            };

            if (task) {
                await axios.put(`/api/tasks/${task.task_id}`, formattedData);
            } else {
                await axios.post('/api/tasks', formattedData);
            }
            onSave();
        } catch (error) {
            console.error('Error saving task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Description"
                name="task_description"
                value={formData.task_description}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Due Date"
                name="task_dueDate"
                type="date"
                value={formData.task_dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    name="task_status"
                    value={formData.task_status}
                    onChange={handleChange}
                >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="not started">Not Started</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Owner ID"
                name="owner_id"
                value={formData.owner_id}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Project ID"
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
            <Button onClick={onCancel} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                Cancel
            </Button>
        </form>
    );
};

export default TaskForm;
