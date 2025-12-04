import React, { useState, useEffect, useRef } from 'react';

function TodoDetailsModal({ todo, onClose, onUpdate, onAdd, onAddComment, onAddAttachment }) {
  const isNew = !todo.id;
  const [formData, setFormData] = useState(todo.id ? { ...todo } : { text: '', priority: 'medium', dueDate: '', description: '' });
  const [newComment, setNewComment] = useState('');
  const [isEditingMode, setIsEditingMode] = useState(isNew);

  useEffect(() => {
    if (todo.id) {
        setFormData({ ...todo });
        setIsEditingMode(false);
    } else {
        setFormData({ text: '', priority: 'medium', dueDate: '', description: '' });
        setIsEditingMode(true);
    }
  }, [todo]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isNew) {
        if (!formData.text.trim()) return;
        onAdd(formData);
    } else {
        onUpdate(todo.id, formData);
    }
    onClose();
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(todo.id, newComment.trim());
    setNewComment('');
  };

  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFile = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    };
    onAddAttachment(todo.id, newFile);
    e.target.value = ''; // Reset input
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius)',
        maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)'
      }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>{isNew ? 'New Task' : 'Task Details'}</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {!isEditingMode && !isNew && (
                <button 
                  className="btn btn-secondary btn-icon" 
                  onClick={() => setIsEditingMode(true)}
                  title="Edit"
                >
                  ✎
                </button>
              )}
              <button onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>&times;</button>
            </div>
          </div>

        {isEditingMode ? (
          <>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
              <input
                type="text"
                name="text"
                className="form-control"
                value={formData.text}
                onChange={handleChange}
                placeholder="Enter task title..."
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Priority</label>
                <select
                  name="priority"
                  className="form-control"
                  value={formData.priority || 'medium'}
                  onChange={handleChange}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  className="form-control"
                  value={formData.dueDate || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description / Notes</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                placeholder="What needs to be done?"
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <button className="btn btn-primary" onClick={handleSave}>
                {isNew ? 'Create Task' : 'Save Changes'}
              </button>
            </div>
          </>
        ) : (
          <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
             <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{todo.text}</h3>
             <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
               <span>Priority: <span className={`priority-badge priority-${todo.priority}`}>{todo.priority?.toUpperCase()}</span></span>
               {todo.dueDate && <span>Due: {todo.dueDate}</span>}
             </div>
             <div style={{ background: 'var(--background-color)', padding: '1rem', borderRadius: 'var(--radius)', minHeight: '60px' }}>
               {todo.description || <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>No description provided.</span>}
             </div>
          </div>
        )}

        {!isNew && (
        <>
            {/* Attachments Section */}
            <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Attachments</h3>
                <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
                />
                <button className="btn btn-secondary" onClick={handleAttachmentClick} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>+ Add File</button>
            </div>
            {todo.attachments && todo.attachments.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                {todo.attachments.map(file => (
                    <li key={file.id} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', background: 'var(--background-color)', marginBottom: '0.5rem', borderRadius: '4px' }}>
                    <span style={{ marginRight: '0.5rem' }}>📎</span>
                    <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
                    >
                        {file.name}
                    </a>
                    </li>
                ))}
                </ul>
            ) : (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>No attachments yet.</p>
            )}
            </div>

            {/* Comments Section */}
            <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Comments</h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                {todo.comments && todo.comments.length > 0 ? (
                todo.comments.map(comment => (
                    <div key={comment.id} style={{ padding: '0.75rem', background: 'var(--background-color)', marginBottom: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.9rem' }}>{comment.text}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        {new Date(comment.timestamp).toLocaleString()}
                    </div>
                    </div>
                ))
                ) : (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>No comments yet.</p>
                )}
            </div>
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                type="text"
                className="form-control"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="btn btn-secondary" title="Send">➤</button>
            </form>
            </div>
        </>
        )}

      </div>
    </div>
  );
}

export default TodoDetailsModal;
