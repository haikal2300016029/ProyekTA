import React, { useState } from 'react';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', deadline: '', priority: '' });

  const addTask = () => {
    if (newTask.name && newTask.deadline && newTask.priority) {
      const updatedTasks = [...tasks, { ...newTask, id: Date.now(), completed: false }];
      setTasks(updatedTasks);
      setNewTask({ name: '', deadline: '', priority: '' });
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <div className="mb-4">
        <input
          className="p-2 mb-2 border rounded mr-2"
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          className="p-2 mb-2 border rounded mr-2"
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <select
          className="p-2 mb-2 border rounded"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded ml-2"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <ul className="list-disc pl-4">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className={`mr-2 ${task.completed ? 'line-through' : ''}`}>
                  {task.name}
                </span>
                <span className="text-sm text-gray-500">({task.priority})</span>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManagement;