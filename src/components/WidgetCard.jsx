import React from 'react';
import { X } from 'lucide-react';
import DonutChart from './DonutChart';
import StackedBar from './StackedBar';
import EmptyGraph from './EmptyGraph';
import TextWidget from './TextWidget';

/**
 * Utility to highlight search keywords
 */
function HighlightText({ text = '', query = '' }) {
  if (!query || !text) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function WidgetCard({ widget, categoryId, onRemove, searchQuery = '' }) {
  const { id, name, type, data } = widget;

  const renderContent = () => {
    switch (type) {
      case 'donut':
        return (
          <DonutChart
            total={data?.total}
            totalLabel={data?.totalLabel}
            segments={data?.segments}
          />
        );
      case 'stacked_bar':
        return (
          <StackedBar
            total={data?.total}
            totalLabel={data?.totalLabel}
            segments={data?.segments}
          />
        );
      case 'empty_graph':
        return <EmptyGraph message={data?.message || widget.text} />;
      case 'text':
      default:
        return <TextWidget widget={widget} />;
    }
  };

  return (
    <div className="widget-card animate-fadeIn">
      {/* Widget Header */}
      <div className="widget-card-header">
        <h4 className="widget-card-title" title={name}>
          <HighlightText text={name} query={searchQuery} />
        </h4>
        <button
          type="button"
          className="widget-remove-btn"
          onClick={() => onRemove(categoryId, id)}
          title="Remove widget"
          aria-label={`Remove ${name} widget`}
        >
          <X size={15} />
        </button>
      </div>

      {/* Widget Body */}
      <div className="widget-card-body">{renderContent()}</div>
    </div>
  );
}
