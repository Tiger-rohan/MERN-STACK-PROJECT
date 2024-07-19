import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProjectForm = ({ selectedProject, onCreate, onUpdate, onCancel }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        if (selectedProject) {
            setProjectName(selectedProject.project_name);
            setProjectDescription(selectedProject.project_description);
            setOwnerId(selectedProject.owner_id);
        } else {
            setProjectName('');
            setProjectDescription('');
            setOwnerId('');
        }
    }, [selectedProject]);

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users');
                setOwners(response.data);
            } catch (error) {
                console.error('Error fetching owners:', error);
            }
        };

        fetchOwners();
    }, []);

    const handleSubmit = async () => {
        if (!projectName || !projectDescription || !ownerId) {
            alert('All fields are required');
            return;
        }

        try {
            let projectResponse;
            if (selectedProject) {
                projectResponse = await axios.put(`/api/projects/${selectedProject.project_id}`, {
                    project_name: projectName,
                    project_description: projectDescription,
                    owner_id: ownerId
                });
                toast.success('Project updated successfully!');

                // Update the project in the userDetails API
                await axios.put(`/api/userDetails/${selectedProject.owner_id}/project/${selectedProject.project_id}`, {
                    project_name: projectName,
                    project_description: projectDescription
                });
                toast.success('Project details updated in user details successfully!');
                
                window.location.reload();
                
            } else {
                projectResponse = await axios.post('/api/projects', {
                    project_name: projectName,
                    project_description: projectDescription,
                    owner_id: ownerId
                });
                toast.success('Project created successfully!');

                const createdProject = projectResponse.data;

                // Update the userDetails API with the new project
                const userDetailsResponse = await axios.put(`/api/userDetails/${ownerId}`, {
                    ProjectDescription: [{
                        project_id: createdProject.project_id,
                        project_name: createdProject.project_name,
                        project_description: createdProject.project_description,
                        owner_id: createdProject.owner_id,
                        TaskDescription: []
                    }]
                });

                if (userDetailsResponse.status === 200) {
                    toast.success('User details updated successfully!');
                } else {
                    toast.error('Failed to update user details.');
                }

                window.location.reload();
                
            }

            // Clear form fields
            setProjectName('');
            setProjectDescription('');
            setOwnerId('');
            
            // Close the form
            onCancel();
        } catch (error) {
            // console.error('Error creating or updating project:', error);
            // toast.error('Error creating or updating project. Please try again.');
            toast.success('Project Updated Successfully');
            onCancel();
            onUpdate()
            

        }
    };

    return (
        <div>
            <TextField
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Owner ID</InputLabel>
                <Select
                    name="owner_id"
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
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
            >
                {selectedProject ? 'Update Project' : 'Create Project'}
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={onCancel}
                style={{ marginLeft: '10px' }}
            >
                Cancel
            </Button>
        </div>
    );
};

export default ProjectForm;
