const Project = require('../models/Project');

const createProject = async (req, res) => {
  const { name, description, startDate, endDate, owner } = req.body;
  try {
    const project = await Project.create({ name, description, startDate, endDate, owner });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate('owner', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, owner } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(id, { name, description, startDate, endDate, owner }, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
