import React from 'react';

function TodoTableRow({ todo, onToggle, onDelete, onUpdate }) {
  const getPriorityLabel = (p) => {
    if (!p) return 'None';
    return p.charAt(0).toUpperCase() + p.slice(1);
  };

  return (
    <tr className={`todo-table-row ${todo.completed ? 'completed' : ''}`}>
      <td style={{ textAlign: 'center', width: '50px' }}>
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </td>
      <td 
        className="todo-text" 
        onClick={() => onUpdate(todo.id)} 
        style={{ cursor: 'pointer' }}
      >
        {todo.text}
      </td>
      <td>
        {todo.priority && (
          <span className={`priority-badge priority-${todo.priority}`}>
            {getPriorityLabel(todo.priority)}
          </span>
        )}
      </td>
      <td>
        {todo.dueDate || <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>-</span>}
      </td>
      <td>
        <span className={`status-badge ${todo.completed ? 'status-done' : 'status-todo'}`}>
          {todo.completed ? 'Done' : 'To Do'}
        </span>
      </td>
      <td style={{ textAlign: 'right' }}>
        <div className="actions" style={{ justifyContent: 'flex-end', opacity: 1 }}>
          <button 
            className="btn btn-danger btn-icon"
            onClick={() => onDelete(todo.id)}
            title="Delete"
          >
            🗑
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TodoTableRow;
