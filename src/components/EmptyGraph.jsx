import React from 'react';

/**
 * EmptyGraph renders the empty state placeholder matching CWPP widgets in the mockup.
 */
export default function EmptyGraph({ message = 'No Graph data available!' }) {
  return (
    <div className="empty-graph-container">
      <div className="empty-graph-icon-wrapper">
        <svg
          width="54"
          height="54"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="empty-graph-icon"
        >
          {/* Bar chart bars */}
          <rect x="3" y="14" width="3" height="7" rx="1" />
          <rect x="8" y="10" width="3" height="11" rx="1" />
          <rect x="13" y="6" width="3" height="15" rx="1" />
          <rect x="18" y="11" width="3" height="10" rx="1" />
          {/* Trend line */}
          <polyline points="4 12 9 7 14 11 20 4" />
        </svg>
      </div>
      <p className="empty-graph-text">{message}</p>
    </div>
  );
}
