

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Tooltip } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '20%' }}>Description</TableCell>
                        <TableCell style={{ width: '15%' }}>Due Date</TableCell>
                        <TableCell style={{ width: '15%' }}>Status</TableCell>
                        <TableCell style={{ width: '15%' }}>Owner ID</TableCell>
                        <TableCell style={{ width: '15%' }}>Project ID</TableCell>
                        <TableCell style={{ width: '20%' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.task_id} style={{ height: 'auto' }}>
                            <TableCell>
                                <Tooltip title={task.task_description} arrow>
                                    <Typography style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                        {task.task_description}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{formatDate(task.task_dueDate)}</TableCell>
                            <TableCell>{task.task_status}</TableCell>
                            <TableCell>{task.owner_id}</TableCell>
                            <TableCell>{task.project_id}</TableCell>
                            <TableCell>
                                <IconButton 
                                    color="primary" 
                                    onClick={() => onEdit(task)}
                                    size="small"
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton 
                                    color="secondary" 
                                    onClick={() => onDelete(task.task_id)}
                                    size="small"
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskList;

