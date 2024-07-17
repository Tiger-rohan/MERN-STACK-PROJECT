import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCreation from "./components/ProjectCreation";
import CreateTask from "./components/Tasks/CreateTasks";
import './Admin.css';

function Admin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authorization token (example for cookies)
        document.cookie = 'authToken=; Max-Age=-1;'; // Set Max-Age to expire cookie immediately

        // Redirect to login page
        navigate('/');
    };

    return (
        <>
            <h1>Admin</h1>

            <div className="admin-container">
                <div className="form-container">
                    <ProjectCreation />
                </div>
                <div className="form-container">
                    <CreateTask />
                </div>
            </div>

            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Admin;
