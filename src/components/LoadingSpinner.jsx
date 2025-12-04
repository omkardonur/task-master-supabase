import React from 'react';
import SkeletonLoader from './common/SkeletonLoader';

function LoadingSpinner() {
  return (
    <div className="loading-wrapper" style={{ padding: '2rem' }}>
      <SkeletonLoader type="list" />
    </div>
  );
}

export default LoadingSpinner;
