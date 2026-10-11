import React from 'react';

/**
 * TextWidget renders text-based widgets or metric summaries.
 */
export default function TextWidget({ widget }) {
  const { text, data } = widget;

  return (
    <div className="text-widget-container">
      {data?.metricValue && (
        <div className="text-widget-metric">
          <span className="text-widget-value">{data.metricValue}</span>
          {data.metricLabel && <span className="text-widget-metric-label">{data.metricLabel}</span>}
        </div>
      )}
      <div className="text-widget-content">
        <p className="text-widget-body">{text || 'No additional details provided.'}</p>
      </div>
      <div className="text-widget-footer">
        <span className="text-widget-tag">Custom Widget</span>
        <span className="text-widget-status-dot" />
      </div>
    </div>
  );
}
