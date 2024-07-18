const Task = require('../models/Task');
const User = require('../models/User');
const Project = require('../models/Project');
const UserDetails = require('../models/UserDetails');
const mongoose = require('mongoose');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { task_description, task_dueDate, task_status, owner_id, project_id } = req.body;

    // Validate if owner_id and project_id exist in their respective collections
    const userExists = await User.findOne({ user_id: owner_id });
    if (!userExists) {
      return res.status(400).json({ error: 'Owner not found' });
    }

    const projectExists = await Project.findOne({ project_id: project_id });
    if (!projectExists) {
      return res.status(400).json({ error: 'Project not found' });
    }

    const task = new Task({
      task_description,
      task_dueDate,
      task_status,
      owner_id,
      project_id
    });

    await task.save();

    // Update the userDetails collection
    await UserDetails.updateOne(
      { user_id: owner_id, "ProjectDescription.project_id": project_id },
      {
        $push: {
          "ProjectDescription.$.TaskDescription": {
            task_id: task.task_id,  // Use task._id here
            task_description,
            task_dueDate,
            task_status,
            owner_id,
            project_id
          }
        }
      }
    );

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
    const task = await Task.findOne({ task_id: req.params.id }) // Adjust to search by task_id
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

    // Validate if owner_id and project_id exist in their respective collections
    if (owner_id) {
      const userExists = await User.findOne({ user_id: owner_id });
      if (!userExists) {
        return res.status(400).json({ error: 'Owner not found' });
      }
    }

    if (project_id) {
      const projectExists = await Project.findOne({ project_id: project_id });
      if (!projectExists) {
        return res.status(400).json({ error: 'Project not found' });
      }
    }

    const task = await Task.findOneAndUpdate(
      { task_id: req.params.id }, // Adjust to search by task_id
      { task_description, task_dueDate, task_status, owner_id, project_id },
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
    const task = await Task.findOneAndDelete({ task_id: req.params.id }); // Adjust to search by task_id
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
