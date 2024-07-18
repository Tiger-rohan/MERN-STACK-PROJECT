import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import SnackbarAlert from './SnackbarAlert';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects', error);
            setError('Error fetching projects');
        }
    };

    const handleCreateProject = async (project) => {
        try {
            const response = await axios.post('/api/projects', project);
            setProjects([...projects, response.data]);
            setSnackbarOpen(true);
            setDialogOpen(false);
        } catch (error) {
            console.error('Error creating project', error);
            setError('Error creating project');
        }
    };

    const handleUpdateProject = async (project) => {
        if (!selectedProject) return;
        try {
            const response = await axios.put(`/api/projects/${selectedProject.project_id}`, project);
            setProjects(projects.map(proj => proj.project_id === selectedProject.project_id ? response.data : proj));
            setSelectedProject(null);
            setSnackbarOpen(true);
            setDialogOpen(false);
        } catch (error) {
            console.error('Error updating project', error);
            setError('Error updating project');
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`/api/projects/${projectId}`);
            setProjects(projects.filter(proj => proj.project_id !== projectId));
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting project', error);
            setError('Error deleting project');
        }
    };

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        setDialogOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleOpenDialog = () => {
        setSelectedProject(null);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Container>
            <h1>Project Page</h1>
            {error && <Typography color="error">{error}</Typography>}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleOpenDialog}
                style={{ marginBottom: '20px' }}
            >
                Create Project
            </Button>
            <ProjectList 
                projects={projects} 
                onEdit={handleSelectProject} 
                onDelete={handleDeleteProject} 
            />
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{selectedProject ? 'Update Project' : 'Create Project'}</DialogTitle>
                <DialogContent>
                    <ProjectForm 
                        selectedProject={selectedProject} 
                        onCreate={handleCreateProject} 
                        onUpdate={handleUpdateProject} 
                        onCancel={handleCloseDialog} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <SnackbarAlert 
                open={snackbarOpen} 
                onClose={handleCloseSnackbar} 
                message="Action completed successfully!" 
            />
        </Container>
    );
};

export default ProjectPage;
