import React from "react";
import ProjectCreation from "./components/ProjectCreation";
import CreateTask from "./components/Tasks/CreateTasks";

function Admin() {
    return <div>
        <ProjectCreation />
        <CreateTask/>
    </div>
};

export default Admin;