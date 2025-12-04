import React from 'react';

function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="empty-state-container">
      <div className="empty-illustration">
        <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="var(--surface-color)" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="10 10" className="spin-slow"/>
          <rect x="60" y="60" width="80" height="80" rx="10" fill="var(--bg-color)" stroke="var(--text-secondary)" strokeWidth="2"/>
          <path d="M80 90L120 90" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M80 110L120 110" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M85 100L95 135L140 60" stroke="var(--primary-color)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="draw-check"/>
        </svg>
      </div>
      <h3 className="empty-title">All Caught Up!</h3>
      <p className="empty-desc">{message || "You have no tasks on your list."}</p>
      {onAction && (
        <button className="btn btn-primary empty-action" onClick={onAction}>
          {actionLabel || "Create New Task"}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
