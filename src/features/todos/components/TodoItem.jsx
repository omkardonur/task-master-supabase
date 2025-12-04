import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  const getPriorityLabel = (p) => {
    if (!p) return null;
    return p.charAt(0).toUpperCase() + p.slice(1);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
          <span 
            className="todo-text" 
            onClick={() => onUpdate(todo.id)} 
            style={{ marginRight: 'auto', cursor: 'pointer' }}
            title="Click to view details"
          >
            {todo.text}
          </span>
          {todo.priority && (
            <span className={`priority-badge priority-${todo.priority}`}>
              {getPriorityLabel(todo.priority)}
            </span>
          )}
          {todo.dueDate && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
              📅 {todo.dueDate}
            </span>
          )}
          {(todo.comments?.length > 0 || todo.attachments?.length > 0) && (
            <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>
              🖇️
            </span>
          )}
        </div>
      </div>
      <div className="actions">
        <button 
          className="btn btn-secondary btn-icon"
          onClick={() => onUpdate(todo.id)}
          title="Edit Details"
        >
          ✎
        </button>
        <button 
          className="btn btn-danger btn-icon"
          onClick={handleDelete}
          title="Delete"
        >
          🗑
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
