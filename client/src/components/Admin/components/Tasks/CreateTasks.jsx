// src/components/Admin/components/CreateTask.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../actions/taskActions';

const CreateTask = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskStatus, setTaskStatus] = useState('not started');
  const [ownerId, setOwnerId] = useState('');
  const [projectId, setProjectId] = useState('');
  const dispatch = useDispatch();
  const { loading, error, task } = useSelector((state) => state.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({
      task_description: taskDescription,
      task_dueDate: taskDueDate,
      task_status: taskStatus,
      owner_id: ownerId,
      project_id: projectId
    }));
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
        <button type="submit" disabled={loading}>Create Task</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {task && <p style={{ color: 'green' }}>Task created successfully!</p>}
    </div>
  );
};

export default CreateTask;
