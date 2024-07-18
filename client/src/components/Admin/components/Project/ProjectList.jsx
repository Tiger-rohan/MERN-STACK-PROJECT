import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
                                <IconButton 
                                    color="primary" 
                                    onClick={() => onEdit(project)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    color="secondary" 
                                    onClick={() => onDelete(project.project_id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectList;
