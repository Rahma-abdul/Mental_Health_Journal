import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../styles/Todo.css';


function Todo() {
  const [tasks, setTasks] = useState([
    {
      completed: false,
      text: '',
      priority: '',
      duration: '',
      id: Date.now()
    }
  ]);

  const priorityMap = {
    High: 3,
    Medium: 2,
    Low: 1,
    '': 0
  };

  const handleNewTasks = () => {
    setTasks([
      ...tasks,
      {
        completed: false,
        text: '',
        priority: '',
        duration: '',
        id: Date.now()
      }
    ]);
  };

  const handleInput = (id, field, value) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('user_id');
    const entryId = localStorage.getItem('entry_id');

    if (!userId || !entryId) {
      console.log('User ID or Entry ID is missing from localStorage.');
      return;
    }

    try {
      for (const task of tasks) {
        const body = {
          description: task.text,
          priority: priorityMap[task.priority] || 0,
          deadline: task.duration || '',
          isCompleted: task.completed
        };

        const response = await fetch(
          `http://localhost:8000/todoItem/${userId}/${entryId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error saving task:', errorData);
        }
      }

      console.log('Tasks submitted successfully!');
      setTasks([
      {
        completed: false,
        text: '',
        priority: '',
        duration: '',
        id: Date.now()
      }
    ]);

    } catch (error) {
      console.error('Failed to submit tasks:', error);
    }
  };

  return (
    <Sidebar>
      <h1>Today's To-Do List</h1>
      <div className="container">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => handleInput(task.id, 'completed', e.target.checked)}
              className="checkbox-style"
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => handleInput(task.id, 'text', e.target.value)}
              className="input"
              style={task.completed ? { textDecoration: 'line-through' } : {}}
            />
            <select
              value={task.priority}
              onChange={(e) => handleInput(task.id, 'priority', e.target.value)}
              className="dropdown"
            >
              <option value="">Select priority</option>
              <option value="High" className="high">High</option>
              <option value="Medium" className="medium">Medium</option>
              <option value="Low" className="low">Low</option>
            </select>
            <input
              type="text"
              value={task.duration}
              onChange={(e) => handleInput(task.id, 'duration', e.target.value)}
              className="time"
              placeholder="Time required for task"
            />
          </div>
        ))}
        <button className="add-task" onClick={handleNewTasks}>
          + New Task
        </button>
        <button className="add-task" onClick={handleSubmit}>End Day</button>
      </div>
    </Sidebar>
  );
}

export default Todo;
