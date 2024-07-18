import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const ProjectForm = ({ selectedProject, onCreate, onUpdate, onCancel }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [ownerId, setOwnerId] = useState('');

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

    const handleSubmit = () => {
        if (!projectName || !projectDescription || !ownerId) {
            alert('All fields are required');
            return;
        }
        if (selectedProject) {
            onUpdate({ project_name: projectName, project_description: projectDescription, owner_id: ownerId });
        } else {
            onCreate({ project_name: projectName, project_description: projectDescription, owner_id: ownerId });
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
            <TextField
                label="Owner ID"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                fullWidth
                margin="normal"
            />
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
