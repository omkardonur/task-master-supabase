import React from 'react';
import EmptyState from '../../../components/common/EmptyState';

function TodoBoard({ todos, onUpdateStatus, onDelete, onUpdate }) {
  if (todos.length === 0) {
    return (
      <EmptyState 
        message="No tasks on the board yet." 
        actionLabel="Create Task" 
        onAction={() => document.querySelector('.fab-add')?.click()} // Hacky but works given FAB logic
      />
    );
  }

  const columns = [
    { id: 'todo', title: 'To Do', color: 'var(--text-secondary)' },
    { id: 'in-progress', title: 'In Progress', color: 'var(--primary-color)' },
    { id: 'done', title: 'Done', color: 'var(--priority-low)' }
  ];

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, status) => {
    const id = e.dataTransfer.getData('id');
    onUpdateStatus(Number(id), status);
  };

  return (
    <div className="board-container" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
      {columns.map(col => (
        <div 
          key={col.id} 
          className="board-column"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, col.id)}
          style={{ 
            flex: 1, 
            minWidth: '250px',
            background: 'var(--background-color)', 
            borderRadius: 'var(--radius)', 
            padding: '1rem',
            border: '1px solid var(--border-color)'
          }}
        >
          <h3 style={{ 
            marginBottom: '1rem', 
            borderBottom: `2px solid ${col.color}`, 
            paddingBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            {col.title}
          </h3>
          <div className="column-content" style={{ minHeight: '200px' }}>
            {todos
              .filter(t => (t.status || (t.completed ? 'done' : 'todo')) === col.id)
              .map(todo => (
                <div
                  key={todo.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, todo.id)}
                  className="board-card"
                  onClick={() => onUpdate(todo.id)}
                  style={{
                    background: 'var(--surface-color)',
                    padding: '1rem',
                    marginBottom: '0.75rem',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow)',
                    cursor: 'grab',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{todo.text}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {todo.priority && (
                      <span className={`priority-badge priority-${todo.priority}`}>
                        {todo.priority}
                      </span>
                    )}
                    <div onClick={(e) => e.stopPropagation()}>
                        <button 
                        className="btn-icon" 
                        onClick={() => onDelete(todo.id)}
                        style={{ color: 'var(--danger-color)', padding: 0 }}
                        >
                        🗑
                        </button>
                    </div>
                  </div>
                  {todo.dueDate && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      📅 {todo.dueDate}
                    </div>
                  )}
                  {(todo.comments?.length > 0 || todo.attachments?.length > 0) && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      🖇️ {todo.comments?.length || 0} | 📎 {todo.attachments?.length || 0}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoBoard;
