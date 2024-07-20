// src/components/EditTask.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EditTask = ({ task, onClose, onSave }) => {
    const [taskDescription, setTaskDescription] = useState(task.task_description || '');
    const [taskDueDate, setTaskDueDate] = useState(task.task_dueDate ? task.task_dueDate.split('T')[0] : '');
    const [taskStatus, setTaskStatus] = useState(task.task_status || '');
    const [ownerId, setOwnerId] = useState(task.owner_id || '');
    const [projectId, setProjectId] = useState(task.project_id || '');
    const [projects, setProjects] = useState([]);
    const [owners, setOwners] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update the task in the tasks API
            await axios.put(`/api/tasks/${task.task_id}`, {
                task_description: taskDescription,
                task_dueDate: taskDueDate,
                task_status: taskStatus,
            });

            // Update the task in the userDetails API
            await axios.put(`/api/userDetails/${ownerId}/project/${projectId}/task/${task.task_id}`, {
                task_description: taskDescription,
                task_dueDate: taskDueDate,
                task_status: taskStatus,
            });

            toast.success('Task updated successfully');
            onSave(); // Refresh the task list
            onClose(); // Close the dialog
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Error updating task. Please try again.');
        }
    };
        // const handleSubmit = async (e) => {
        //     e.preventDefault();
    
        //     try {
        //         if (task.owner_id !== ownerId || task.project_id !== projectId) {
        //             // Delete the current task from both APIs
        //             await axios.delete(`/api/userDetails/${task.owner_id}/project/${task.project_id}/task/${task.task_id}`);
    
        //             // Create a new task with the updated details
        //             const newTask = {
        //                 task_description: taskDescription,
        //                 task_dueDate: taskDueDate,
        //                 task_status: taskStatus,
        //                 owner_id: ownerId,
        //                 project_id: projectId,
        //             };
    
        //             // Create the new task in both APIs
        //             await axios.post(`/api/userDetails/${ownerId}/project/${projectId}/task`, newTask);
        //         } else {
                        
        //             // Update the task in the userDetails API
        //             await axios.put(`/api/userDetails/${ownerId}/project/${projectId}/task/${task.task_id}`, {
        //                 task_description: taskDescription,
        //                 task_dueDate: taskDueDate,
        //                 task_status: taskStatus,
        //             });
    
        //         }

        //         await axios.put(`/api/tasks/${task.task_id}`, {
        //             task_description: taskDescription,
        //             task_dueDate: taskDueDate,
        //             task_status: taskStatus,
        //         });

        //         toast.success('Task updated successfully');
        //         onSave(); // Refresh the task list
        //         onClose(); // Close the dialog
        //     } catch (error) {
        //         console.error('Error updating task:', error);
        //         toast.error('Error updating task. Please try again.');
        //     }
        // };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Edit Task</Typography>
            <TextField
                label="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Due Date"
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    required
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
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
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
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}
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
            <Button variant="outlined" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
                Cancel
            </Button>
        </form>
    );
};

export default EditTask;
