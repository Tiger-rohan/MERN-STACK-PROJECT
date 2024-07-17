import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const ProjectCreation = () => {
    const [projectData, setProjectData] = useState({
        project_name: '',
        project_description: '',
        owner_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/projects', {
                ...projectData, // Convert string input to array of numbers
            });
            toast.success('Project created successfully!');
            console.log(response.data);
            setProjectData({ project_name: '', project_description: '', owner_id: '' }); // Reset form
        } catch (error) {
            console.error(error);
            toast.error('Error creating project. Please try again.');
        }
    };

    return (
        <div className="project-creation">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Project Name:</label>
                    <input
                        type="text"
                        name="project_name"
                        value={projectData.project_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Project Description:</label>
                    <textarea
                        name="project_description"
                        value={projectData.project_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Owner ID:</label>
                    <input
                        type="number"
                        name="owner_id"
                        value={projectData.owner_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default ProjectCreation;
