import React from "react";
import { Container, Typography, Grid, Paper } from '@mui/material';
import TaskManager from "./components/Tasks/TaskManager";
import ProjectPage from "./components/Project/ProjectPage";
import { motion } from 'framer-motion';


function Admin() {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
            <Typography variant="h3" gutterBottom align="center">
                Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>
                          
                        </Typography>
                        <TaskManager />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>
                                                  </Typography>
                        <ProjectPage />
                    </Paper>
                </Grid>
            </Grid>
            </motion.div>
        </Container>
    );
}

export default Admin;
