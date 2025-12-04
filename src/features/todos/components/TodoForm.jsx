import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    onAdd(newTodo.trim(), priority, dueDate);
    setNewTodo('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <div className="todo-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-wrapper">
            <input
              type="text"
              className="form-control"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <select 
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            title="Priority"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input 
            type="date"
            className="priority-select"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            title="Due Date"
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
