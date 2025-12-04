import React from 'react';

function SkeletonLoader({ type = 'list' }) {
  return (
    <div className="skeleton-container">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`skeleton-item skeleton-${type}`}>
          <div className="skeleton-avatar"></div>
          <div className="skeleton-content">
            <div className="skeleton-line short"></div>
            <div className="skeleton-line long"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
