const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require('../models/user'); // Ensure the correct case for the file name
const Project = require('../models/Project'); // Assuming you have a Project model

// Create a new task
const createTask = async (req, res) => {
  try {
    const { task_description, task_dueDate, task_status, owner_id, project_id } = req.body;

    // Convert IDs to numbers
    const ownerId = Number(owner_id);
    const projectId = Number(project_id);

    // Validate if owner_id and project_id are valid numbers
    if (isNaN(ownerId) || isNaN(projectId)) {
      return res.status(400).json({ error: 'Invalid owner ID or project ID' });
    }

    // Validate if owner_id and project_id exist in their respective collections
    const userExists = await User.findOne({ user_id: ownerId });
    if (!userExists) {
      return res.status(400).json({ error: 'Owner not found' });
    }

    const projectExists = await Project.findOne({ project_id: projectId });
    if (!projectExists) {
      return res.status(400).json({ error: 'Project not found' });
    }

    const task = new Task({
      task_description,
      task_dueDate,
      task_status,
      owner_id: ownerId,
      project_id: projectId
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('owner_id', 'user_name') // Change 'name' to 'user_name' to match the User model
      .populate('project_id', 'project_name');
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findOne({ task_id: taskId }) // Adjust to search by task_id
      .populate('owner_id', 'user_name') // Change 'name' to 'user_name'
      .populate('project_id', 'project_name');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { task_description, task_dueDate, task_status, owner_id, project_id } = req.body;

    // Convert IDs to numbers
    const ownerId = owner_id ? Number(owner_id) : undefined;
    const projectId = project_id ? Number(project_id) : undefined;

    // Validate if owner_id and project_id are valid numbers
    if ((ownerId && isNaN(ownerId)) || (projectId && isNaN(projectId))) {
      return res.status(400).json({ error: 'Invalid owner ID or project ID' });
    }

    // Validate if owner_id and project_id exist in their respective collections
    if (ownerId) {
      const userExists = await User.findOne({ user_id: ownerId });
      if (!userExists) {
        return res.status(400).json({ error: 'Owner not found' });
      }
    }

    if (projectId) {
      const projectExists = await Project.findOne({ project_id: projectId });
      if (!projectExists) {
        return res.status(400).json({ error: 'Project not found' });
      }
    }

    const taskId = Number(req.params.id);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findOneAndUpdate(
      { task_id: taskId }, // Adjust to search by task_id
      { task_description, task_dueDate, task_status, owner_id: ownerId, project_id: projectId },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findOneAndDelete({ task_id: taskId }); // Adjust to search by task_id
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get tasks by owner ID
const getTasksByOwnerId = async (req, res) => {
  const ownerId = Number(req.params.ownerId);
  try {
    if (isNaN(ownerId)) {
      return res.status(400).json({ error: 'Invalid owner ID' });
    }

    const tasks = await Task.find({ owner_id: ownerId });
    if (tasks.length === 0) {
      return res.status(404).json({ error: 'No tasks found for this owner' });
    }
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getTasksByOwnerId,
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
