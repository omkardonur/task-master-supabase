import React, { useState } from 'react';
import TodoTableRow from './TodoTableRow';
import EmptyState from '../../../components/common/EmptyState';

function TodoTable({ todos, filter, onToggle, onDelete, onUpdate, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDate, setNewDate] = useState('');

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSaveNew = () => {
    if (!newText.trim()) return;
    onAdd(newText.trim(), newPriority, newDate);
    setNewText('');
    setNewPriority('medium');
    setNewDate('');
    setIsAdding(false);
  };

  const handleCancelNew = () => {
    setIsAdding(false);
    setNewText('');
    setNewPriority('medium');
    setNewDate('');
  };

  if (todos.length === 0 && !isAdding) {
    return (
      <EmptyState 
        message={filter === 'all' ? "You have no tasks on your list." : `No ${filter} tasks found.`}
        actionLabel="Add Your First Task"
        onAction={handleAddClick}
      />
    );
  }

  return (
    <div className="table-responsive">
      <table className="todo-table">
        <thead>
          <tr>
            <th style={{ width: '50px' }}>Status</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>State</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <TodoTableRow
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
          
          {isAdding ? (
            <tr className="todo-form-row">
              <td></td>
              <td>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Task name..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  autoFocus
                />
              </td>
              <td>
                <select 
                  className="form-control"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </td>
              <td>
                <input 
                  type="date" 
                  className="form-control"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </td>
              <td>
                <span className="status-badge status-todo">To Do</span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <div className="actions" style={{ justifyContent: 'flex-end', opacity: 1 }}>
                  <button className="btn btn-primary btn-icon" onClick={handleSaveNew} title="Save">✓</button>
                  <button className="btn btn-secondary btn-icon" onClick={handleCancelNew} title="Cancel">✕</button>
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: '1rem', textAlign: 'center', borderBottom: 'none' }}>
                <button className="btn btn-secondary" onClick={handleAddClick} style={{ width: '100%' }}>
                  + Add New Task
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTable;
