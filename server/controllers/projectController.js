// const Project = require('../models/Project');

// const createProject = async (req, res) => {
//   const { name, description, startDate, endDate, owner } = req.body;
//   try {
//     const project = await Project.create({ name, description, startDate, endDate, owner });
//     res.status(201).json(project);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({}).populate('owner', 'name email');
//     res.json(projects);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const updateProject = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, startDate, endDate, owner } = req.body;
//   try {
//     const project = await Project.findByIdAndUpdate(id, { name, description, startDate, endDate, owner }, { new: true });
//     res.json(project);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const deleteProject = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Project.findByIdAndDelete(id);
//     res.json({ message: 'Project deleted' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = { createProject, getProjects, updateProject, deleteProject };

const Project = require('../models/Project');

// Create a new project
const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, owner } = req.body;

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      owner
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('owner', 'name email');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name email');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, owner } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, startDate, endDate, owner },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
};
