import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Owner ID</TableCell>
                        <TableCell>Project ID</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.task_id}>
                            <TableCell>{task.task_description}</TableCell>
                            <TableCell>{task.task_dueDate}</TableCell>
                            <TableCell>{task.task_status}</TableCell>
                            <TableCell>{task.owner_id}</TableCell>
                            <TableCell>{task.project_id}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => onEdit(task)}
                                >
                                    <Edit />
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => onDelete(task.task_id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    <Delete />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskList;
