import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TaskForm = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        task_description: '',
        task_dueDate: '',
        task_status: 'not started',
        owner_id: '',
        project_id: ''
    });
    const [projects, setProjects] = useState([]);
    const [owners, setOwners] = useState([]);

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

    useEffect(() => {
        const fetchProjectsAndOwners = async () => {
            try {
                const projectsResponse = await axios.get('http://localhost:8000/api/projects/');
                const ownersResponse = await axios.get('http://localhost:8000/users');
                setProjects(projectsResponse.data);
                setOwners(ownersResponse.data);
            } catch (error) {
                console.error('Error fetching projects and owners:', error);
            }
        };

        fetchProjectsAndOwners();
    }, []);

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
    
            console.log('Formatted Data:', formattedData); // Log formatted data
    
            let taskResponse;
            if (task) {
                taskResponse = await axios.put(`/api/tasks/${task.task_id}`, formattedData);
                toast.success('Task updated successfully!');
            } else {
                taskResponse = await axios.post('/api/tasks', formattedData);
                toast.success('Task created successfully!');
            }
    
            const createdTask = taskResponse.data;
    
            const userDetailsResponse = await axios.put(`/api/userDetails/${formData.owner_id}`, {
                project_id: formData.project_id,
                task: {
                    task_id: createdTask.task_id,
                    task_description: createdTask.task_description,
                    task_dueDate: createdTask.task_dueDate,
                    task_status: createdTask.task_status
                }
            });
    
            if (userDetailsResponse.status === 200) {
                toast.success('User details updated successfully!');
            } else {
                toast.error('Failed to update user details.');
            }
    
            onSave();
        } catch (error) {
            console.error('Error saving task:', error.response ? error.response.data : error.message);
            toast.error('Error saving task. Please try again.');
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
            <FormControl fullWidth margin="normal">
                <InputLabel>Project ID</InputLabel>
                <Select
                    name="project_id"
                    value={formData.project_id}
                    onChange={handleChange}
                    required
                >
                    {projects.map((project) => (
                        <MenuItem key={project.project_id} value={project.project_id}>
                            {project.project_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Owner ID</InputLabel>
                <Select
                    name="owner_id"
                    value={formData.owner_id}
                    onChange={handleChange}
                    required
                >
                    {owners.map((owner) => (
                        <MenuItem key={owner.user_id} value={owner.user_id}>
                            {owner.user_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
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
