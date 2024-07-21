const express = require('express');
const router = express.Router();
const userDetailsController = require('../controllers/userDetailsControllers');

// Get all user details
router.get('/', userDetailsController.getAllUserDetails);

// Get user details by ID
router.get('/:id', userDetailsController.getUserDetailsById);

// Fetch all projects for a specific user by user ID
router.get('/:userId/projects', userDetailsController.getProjectsByUserId);

// Create new user details
router.post('/', userDetailsController.createUserDetails);

// Update user details by user ID
router.put('/:id', userDetailsController.updateUserDetails);

// Update project by project ID
router.put('/project/:projectId', userDetailsController.updateProjectById);


// Update task by user ID, project ID, and task ID
router.put('/:userId/project/:projectId/task/:taskId', userDetailsController.updateTaskById);

// Delete user details by ID
router.delete('/:id', userDetailsController.deleteUserDetails);

// Delete project by project ID from every user and remove all associated tasks
router.delete('/project/:projectId', userDetailsController.deleteProjectAndTasks);

// Delete task by user ID, project ID, and task ID
router.delete('/:userId/project/:projectId/task/:taskId', userDetailsController.deleteTaskById);


module.exports = router;
