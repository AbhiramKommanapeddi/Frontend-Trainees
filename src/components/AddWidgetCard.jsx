import React from 'react';
import { Plus } from 'lucide-react';

/**
 * AddWidgetCard renders the "+ Add Widget" placeholder card at the end of each category row.
 */
export default function AddWidgetCard({ onClick, categoryName }) {
  return (
    <div className="add-widget-card" onClick={onClick}>
      <button
        type="button"
        className="add-widget-card-btn"
        aria-label={`Add Widget to ${categoryName}`}
      >
        <Plus size={16} className="add-widget-card-icon" />
        <span>Add Widget</span>
      </button>
    </div>
  );
}
