import React from 'react';

function Header({ title, todoCount, totalCount }) {
  const progress = totalCount > 0 ? ((totalCount - todoCount) / totalCount) * 100 : 0;

  return (
    <header className="topbar">
      <div className="topbar-content">
        <h2 className="view-title">{title}</h2>
        <div className="stats-pill">
          <span>{todoCount} Active Tasks</span>
          <div className="mini-progress-bg">
            <div className="mini-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
