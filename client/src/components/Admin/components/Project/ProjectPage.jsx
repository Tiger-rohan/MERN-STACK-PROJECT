import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Container, 
    TextField, 
    Button, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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

    const handleCreateProject = async () => {
        try {
            const response = await axios.post('/api/projects', {
                project_name: projectName,
                project_description: projectDescription,
                owner_id: ownerId
            });
            setProjects([...projects, response.data]);
            setProjectName('');
            setProjectDescription('');
            setOwnerId('');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error creating project', error);
            setError('Error creating project');
        }
    };

    const handleUpdateProject = async () => {
        if (!selectedProject) return;
        try {
            const response = await axios.put(`/api/projects/${selectedProject.project_id}`, {
                project_name: projectName,
                project_description: projectDescription,
                owner_id: ownerId
            });
            setProjects(projects.map(proj => proj.project_id === selectedProject.project_id ? response.data : proj));
            setSelectedProject(null);
            setProjectName('');
            setProjectDescription('');
            setOwnerId('');
            setSnackbarOpen(true);
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
        setProjectName(project.project_name);
        setProjectDescription(project.project_description);
        setOwnerId(project.owner_id);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <h1>Project Page</h1>
            {error && <Typography color="error">{error}</Typography>}
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
                onClick={selectedProject ? handleUpdateProject : handleCreateProject}
            >
                {selectedProject ? 'Update Project' : 'Create Project'}
            </Button>
            {selectedProject && (
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => {
                        setSelectedProject(null);
                        setProjectName('');
                        setProjectDescription('');
                        setOwnerId('');
                    }}
                >
                    Cancel
                </Button>
            )}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Project Description</TableCell>
                            <TableCell>Owner ID</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(project => (
                            <TableRow key={project.project_id}>
                                <TableCell>{project.project_name}</TableCell>
                                <TableCell>{project.project_description}</TableCell>
                                <TableCell>{project.owner_id}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleSelectProject(project)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => handleDeleteProject(project.project_id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Action completed successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProjectPage;
