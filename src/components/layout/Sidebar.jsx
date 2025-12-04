import React from 'react';

function Sidebar({ currentView, onViewChange, isDarkMode, toggleTheme, isOffline }) {
  const navItems = [
    { id: 'list', label: 'List View', icon: '📋' },
    { id: 'board', label: 'Board View', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">TaskMaster</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <span className={`status-dot ${isOffline ? 'offline' : 'online'}`}></span>
          <span className="status-text">{isOffline ? 'Offline' : 'Syncing'}</span>
        </div>
        
        <button className="theme-toggle-mini" onClick={toggleTheme}>
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
