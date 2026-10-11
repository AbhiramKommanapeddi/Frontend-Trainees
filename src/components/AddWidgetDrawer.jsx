import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Search, CheckSquare, Square, PieChart, BarChart2, FileText, AlertCircle } from 'lucide-react';

export default function AddWidgetDrawer({
  isOpen,
  onClose,
  categories = [],
  activeCategoryId = null,
  onConfirmVisibility,
  onAddNewWidget,
  onDeleteWidgetPermanently,
}) {
  const [selectedTab, setSelectedTab] = useState(activeCategoryId || categories[0]?.id || 'cspm');
  const [checkedWidgetIds, setCheckedWidgetIds] = useState({});
  const [drawerSearch, setDrawerSearch] = useState('');

  // New Widget Form State
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [newWidgetType, setNewWidgetType] = useState('text');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formError, setFormError] = useState('');

  // Synchronize state when drawer opens or activeCategoryId changes
  useEffect(() => {
    if (activeCategoryId) {
      setSelectedTab(activeCategoryId);
    } else if (categories.length > 0 && !selectedTab) {
      setSelectedTab(categories[0].id);
    }
  }, [activeCategoryId, categories]);

  // Initialize checked state from categories prop
  useEffect(() => {
    if (isOpen) {
      const initialChecked = {};
      categories.forEach((cat) => {
        initialChecked[cat.id] = (cat.widgets || [])
          .filter((w) => w.isVisible !== false)
          .map((w) => w.id);
      });
      setCheckedWidgetIds(initialChecked);
      setDrawerSearch('');
      setFormError('');
    }
  }, [isOpen, categories]);

  if (!isOpen) return null;

  const currentCategory = categories.find((c) => c.id === selectedTab) || categories[0];
  const currentChecked = checkedWidgetIds[selectedTab] || [];

  // Toggle checkbox for a widget
  const handleToggleCheck = (widgetId) => {
    setCheckedWidgetIds((prev) => {
      const catList = prev[selectedTab] || [];
      const isCurrentlyChecked = catList.includes(widgetId);
      const updated = isCurrentlyChecked
        ? catList.filter((id) => id !== widgetId)
        : [...catList, widgetId];
      return {
        ...prev,
        [selectedTab]: updated,
      };
    });
  };

  // Submit visibility changes for all or current category
  const handleConfirm = () => {
    // Save visibility for all categories
    categories.forEach((cat) => {
      const checkedIds = checkedWidgetIds[cat.id] || [];
      onConfirmVisibility(cat.id, checkedIds);
    });
    onClose();
  };

  // Handle adding a new custom widget
  const handleCreateWidgetSubmit = (e) => {
    e.preventDefault();
    if (!newWidgetName.trim()) {
      setFormError('Widget name is required');
      return;
    }

    let customData = {};
    if (newWidgetType === 'donut') {
      customData = {
        total: 100,
        totalLabel: 'Total',
        segments: [
          { label: 'Active', value: 75, color: '#3B82F6' },
          { label: 'Inactive', value: 25, color: '#93C5FD' },
        ],
      };
    } else if (newWidgetType === 'stacked_bar') {
      customData = {
        total: 50,
        totalLabel: 'Total Items',
        segments: [
          { label: 'High', value: 15, color: '#EA580C' },
          { label: 'Medium', value: 20, color: '#EAB308' },
          { label: 'Low', value: 15, color: '#CBD5E1' },
        ],
      };
    } else if (newWidgetType === 'empty_graph') {
      customData = {
        message: newWidgetText || 'No Graph data available!',
      };
    }

    const newWidget = {
      name: newWidgetName.trim(),
      text: newWidgetText.trim() || 'Custom trainee dashboard widget',
      type: newWidgetType,
      data: customData,
    };

    onAddNewWidget(selectedTab, newWidget);

    // Reset form
    setNewWidgetName('');
    setNewWidgetText('');
    setNewWidgetType('text');
    setFormError('');
    setShowAddForm(false);
  };

  // Filter widgets by drawer search
  const visibleWidgetsInDrawer = (currentCategory?.widgets || []).filter((w) => {
    if (!drawerSearch.trim()) return true;
    const query = drawerSearch.toLowerCase();
    return (
      w.name?.toLowerCase().includes(query) ||
      w.text?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="drawer-panel animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Add and manage widgets"
      >
        {/* Dark Navy Blue Header (Exact match to mockup 3) */}
        <div className="drawer-header">
          <h3 className="drawer-title">Add Widget</h3>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close add widget drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Subtitle */}
        <div className="drawer-subtitle-section">
          <p className="drawer-subtitle">
            Personalise your dashboard by adding the following widget
          </p>
        </div>

        {/* Category Tabs */}
        <div className="drawer-tabs">
          {categories.map((cat) => {
            const isActive = cat.id === selectedTab;
            return (
              <button
                key={cat.id}
                type="button"
                className={`drawer-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTab(cat.id);
                  setFormError('');
                }}
              >
                {cat.shortName || cat.name}
              </button>
            );
          })}
        </div>

        {/* Drawer Body Scrollable Content */}
        <div className="drawer-body">
          {/* Filter Widgets Search Input */}
          <div className="drawer-search-box">
            <Search size={16} className="drawer-search-icon" />
            <input
              type="text"
              placeholder={`Filter widgets in ${currentCategory?.shortName || 'category'}...`}
              value={drawerSearch}
              onChange={(e) => setDrawerSearch(e.target.value)}
              className="drawer-search-input"
            />
            {drawerSearch && (
              <button
                type="button"
                onClick={() => setDrawerSearch('')}
                className="drawer-search-clear"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Widgets List with Checkboxes */}
          <div className="drawer-widget-list">
            {visibleWidgetsInDrawer.length === 0 ? (
              <div className="drawer-empty-state">
                <AlertCircle size={28} className="drawer-empty-icon" />
                <p>No widgets found in this category.</p>
                <span>Click the button below to add your first widget!</span>
              </div>
            ) : (
              visibleWidgetsInDrawer.map((widget) => {
                const isChecked = currentChecked.includes(widget.id);
                return (
                  <div key={widget.id} className="drawer-widget-item">
                    <label className="drawer-checkbox-label">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleCheck(widget.id)}
                        className="drawer-checkbox-native"
                      />
                      <span className={`drawer-checkbox-box ${isChecked ? 'checked' : ''}`}>
                        {isChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                      </span>
                      <div className="drawer-widget-info">
                        <span className="drawer-widget-name">{widget.name}</span>
                        {widget.text && (
                          <span className="drawer-widget-desc">{widget.text}</span>
                        )}
                      </div>
                    </label>

                    {/* Delete Permanently Button */}
                    <button
                      type="button"
                      className="drawer-delete-widget-btn"
                      onClick={() => onDeleteWidgetPermanently(selectedTab, widget.id)}
                      title="Permanently delete widget"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Create Custom Widget Section */}
          <div className="drawer-add-custom-container">
            {!showAddForm ? (
              <button
                type="button"
                className="drawer-open-add-form-btn"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={16} />
                <span>+ Create New Custom Widget in {currentCategory?.shortName}</span>
              </button>
            ) : (
              <form onSubmit={handleCreateWidgetSubmit} className="drawer-new-widget-form">
                <div className="drawer-form-header">
                  <h5>Add New Widget to {currentCategory?.name}</h5>
                  <button
                    type="button"
                    className="drawer-form-cancel-cross"
                    onClick={() => setShowAddForm(false)}
                  >
                    <X size={16} />
                  </button>
                </div>

                {formError && <div className="drawer-form-error">{formError}</div>}

                <div className="form-group">
                  <label htmlFor="widget-name-input">Widget Name *</label>
                  <input
                    id="widget-name-input"
                    type="text"
                    placeholder="e.g. Cloud Security Posture Summary"
                    value={newWidgetName}
                    onChange={(e) => {
                      setNewWidgetName(e.target.value);
                      if (formError) setFormError('');
                    }}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="widget-text-input">Widget Text / Details</label>
                  <textarea
                    id="widget-text-input"
                    placeholder="Enter widget description or random text..."
                    rows={3}
                    value={newWidgetText}
                    onChange={(e) => setNewWidgetText(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label>Widget Visual Style</label>
                  <div className="widget-type-selector">
                    <button
                      type="button"
                      className={`type-option-btn ${newWidgetType === 'text' ? 'active' : ''}`}
                      onClick={() => setNewWidgetType('text')}
                    >
                      <FileText size={16} />
                      <span>Custom Text</span>
                    </button>
                    <button
                      type="button"
                      className={`type-option-btn ${newWidgetType === 'donut' ? 'active' : ''}`}
                      onClick={() => setNewWidgetType('donut')}
                    >
                      <PieChart size={16} />
                      <span>Donut Chart</span>
                    </button>
                    <button
                      type="button"
                      className={`type-option-btn ${newWidgetType === 'stacked_bar' ? 'active' : ''}`}
                      onClick={() => setNewWidgetType('stacked_bar')}
                    >
                      <BarChart2 size={16} />
                      <span>Progress Bar</span>
                    </button>
                  </div>
                </div>

                <div className="drawer-form-actions">
                  <button
                    type="button"
                    className="drawer-form-btn-secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="drawer-form-btn-primary">
                    Add Widget
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Drawer Footer Buttons (Matches screenshot 3: Cancel and Confirm) */}
        <div className="drawer-footer">
          <button type="button" className="drawer-footer-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="drawer-footer-confirm-btn"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}
