import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCreation from "./components/ProjectCreation";
import CreateTask from "./components/Tasks/CreateTasks";
import { Container, Typography, Button, Grid } from '@mui/material';
import ProjectPage from "./components/Project/ProjectPage";


function Admin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authorization token (example for cookies)
        document.cookie = 'authToken=; Max-Age=-1;'; // Set Max-Age to expire cookie immediately

        // Redirect to login page
        navigate('/');
    };

    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Admin
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ProjectCreation />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CreateTask />
                </Grid>
            </Grid>

            <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleLogout} 
                sx={{ mt: 4 }}
            >
                Logout
            </Button>
            <ProjectPage></ProjectPage>
        </Container>
        
    );
};

export default Admin;
