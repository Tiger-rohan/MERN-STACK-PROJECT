import React, { useState } from 'react';
import axios from 'axios';


const CreateTask = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskStatus, setTaskStatus] = useState('not started');
  const [ownerId, setOwnerId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/tasks', {
        task_description: taskDescription,
        task_dueDate: taskDueDate,
        task_status: taskStatus,
        owner_id: ownerId,
        project_id: projectId,
      });
      setSuccess('Task created successfully!');
      setTaskDescription('');
      setTaskDueDate('');
      setOwnerId('');
      setProjectId('');
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Description:</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="not started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Owner ID:</label>
          <input
            type="number"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project ID:</label>
          <input
            type="number"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateTask;
