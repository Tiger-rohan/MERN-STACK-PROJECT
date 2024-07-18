import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ProjectList = ({ projects, onEdit, onDelete }) => {
    return (
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
                                    onClick={() => onEdit(project)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => onDelete(project.project_id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectList;
