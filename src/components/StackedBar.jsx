import React from 'react';

/**
 * StackedBar component for metrics like Registry Scan / Vulnerability breakdown.
 * Props:
 *  - total: number
 *  - totalLabel: string
 *  - segments: Array<{ label: string, value: number, color: string }>
 */
export default function StackedBar({ total = 0, totalLabel = '', segments = [] }) {
  const sum = segments.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0) || total || 1;

  return (
    <div className="stacked-bar-container">
      {/* Total Header */}
      <div className="stacked-bar-header">
        <span className="stacked-bar-total">{total}</span>
        <span className="stacked-bar-total-label">{totalLabel}</span>
      </div>

      {/* Stacked Progress Bar */}
      <div className="stacked-bar-track">
        {segments.map((seg, idx) => {
          const val = Number(seg.value) || 0;
          const pct = Math.max((val / sum) * 100, 2); // ensure at least 2% visibility if >0
          return (
            <div
              key={idx}
              className="stacked-bar-segment"
              style={{
                width: `${pct}%`,
                backgroundColor: seg.color,
              }}
              title={`${seg.label}: ${seg.value}`}
            />
          );
        })}
      </div>

      {/* Legend below */}
      <div className="stacked-bar-legend">
        {segments.map((seg, idx) => (
          <div key={idx} className="stacked-legend-item">
            <span
              className="stacked-legend-dot"
              style={{ backgroundColor: seg.color }}
            />
            <span className="stacked-legend-label">
              {seg.label} <span className="stacked-legend-count">({seg.value})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
