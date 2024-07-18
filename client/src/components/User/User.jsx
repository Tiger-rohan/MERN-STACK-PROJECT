import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = Cookies.get('token'); // Get the token from cookies
                console.log('Token:', token); // Log the token

                const response = await axios.get('http://localhost:8000/api/userDetails', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Response data:', response.data); // Log the response data

                setUserDetails(response.data);
            } catch (err) {
                console.error('Error fetching user details:', err); // Log the error
                setError(err.message);
            }
        };

        fetchUserDetails();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {userDetails.user_id}</p>
            <p>Name: {userDetails.user_name}</p>
            <p>Email: {userDetails.email}</p>
            <p>Role: {userDetails.role}</p>
            <h3>Projects:</h3>
            <ul>
                {userDetails.ProjectDescription && userDetails.ProjectDescription.map(project => (
                    <li key={project.project_id}>
                        <p>Project Name: {project.project_name}</p>
                        <p>Description: {project.project_description}</p>
                        <h4>Tasks:</h4>
                        <ul>
                            {project.TaskDescription && project.TaskDescription.map(task => (
                                <li key={task.task_id}>
                                    <p>Task Description: {task.task_description}</p>
                                    <p>Due Date: {new Date(task.task_dueDate).toLocaleDateString()}</p>
                                    <p>Status: {task.task_status}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDetails;
