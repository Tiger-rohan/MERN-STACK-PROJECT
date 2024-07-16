// const express = require('express');
// const router = express.Router();
// const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');
// const { protect } = require('../middleware/authMiddleware');

// router.post('/', protect, createProject);
// router.get('/', protect, getProjects);
// router.put('/:id', protect, updateProject);
// router.delete('/:id', protect, deleteProject);

// module.exports = router;

const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const router = express.Router();

// Create a new project
router.post('/', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get a single project by ID
router.get('/:id', getProjectById);

// Update a project
router.put('/:id', updateProject);

// Delete a project
router.delete('/:id', deleteProject);

module.exports = router;
