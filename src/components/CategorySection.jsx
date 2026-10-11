import React from 'react';
import WidgetCard from './WidgetCard';
import AddWidgetCard from './AddWidgetCard';

export default function CategorySection({
  category,
  searchQuery = '',
  onRemoveWidget,
  onOpenAddWidget
}) {
  const { id, name, widgets = [] } = category;

  // Filter widgets by visibility and search query
  const visibleWidgets = widgets.filter((w) => w.isVisible !== false);

  const filteredWidgets = visibleWidgets.filter((w) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = w.name?.toLowerCase().includes(q);
    const textMatch = w.text?.toLowerCase().includes(q);
    return nameMatch || textMatch;
  });

  return (
    <section className="category-section" id={`section-${id}`}>
      <div className="category-header">
        <h3 className="category-title">{name}</h3>
      </div>

      <div className="category-grid">
        {filteredWidgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            categoryId={id}
            onRemove={onRemoveWidget}
            searchQuery={searchQuery}
          />
        ))}

        {/* Placeholder "+ Add Widget" Card */}
        <AddWidgetCard
          categoryName={name}
          onClick={() => onOpenAddWidget(id)}
        />
      </div>

      {searchQuery.trim() && filteredWidgets.length === 0 && (
        <div className="category-no-match">
          <p>No widgets matching "{searchQuery}" in this category.</p>
        </div>
      )}
    </section>
  );
}
