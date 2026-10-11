import React from 'react';

/**
 * DonutChart renders an SVG donut chart matching the CNAPP dashboard design.
 * Props:
 *  - total: number
 *  - totalLabel: string
 *  - segments: Array<{ label: string, value: number, count?: number, color: string }>
 */
export default function DonutChart({ total = 0, totalLabel = 'Total', segments = [] }) {
  const size = 150;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate segment percentage and stroke offsets
  const totalValue = segments.reduce((sum, s) => sum + (Number(s.value) || 0), 0) || total || 1;

  let accumulatedPercent = 0;
  const strokeSegments = segments.map((seg) => {
    const val = Number(seg.value) || 0;
    const percent = val / totalValue;
    const dashLength = percent * circumference;
    const dashOffset = -accumulatedPercent * circumference;
    accumulatedPercent += percent;

    return {
      ...seg,
      dashLength,
      dashOffset,
      percent: Math.round(percent * 100),
    };
  });

  return (
    <div className="donut-chart-container">
      {/* Donut SVG */}
      <div className="donut-svg-wrapper">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-svg">
          {/* Base circle background */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {strokeSegments.map((seg, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.dashLength} ${circumference}`}
              strokeDashoffset={seg.dashOffset}
              transform={`rotate(-90 ${center} ${center})`}
              className="donut-segment"
            />
          ))}
        </svg>

        {/* Center Text */}
        <div className="donut-center-text">
          <span className="donut-center-number">{total}</span>
          <span className="donut-center-label">{totalLabel}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="donut-legend">
        {segments.map((seg, i) => {
          const count = seg.count !== undefined ? seg.count : seg.value;
          return (
            <div key={i} className="donut-legend-item">
              <span
                className="donut-legend-dot"
                style={{ backgroundColor: seg.color }}
              />
              <span className="donut-legend-label">
                {seg.label} <span className="donut-legend-count">({count})</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
