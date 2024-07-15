const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { description, dueDate, status, owner, project } = req.body;
  try {
    const task = await Task.create({ description, dueDate, status, owner, project });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('owner project', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { description, dueDate, status, owner, project } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { description, dueDate, status, owner, project }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
