import React, { useState } from 'react';
import { Plus, RotateCw, MoreVertical, Clock, ChevronDown, Download, RotateCcw, FolderPlus } from 'lucide-react';

export default function DashboardHeader({
  onOpenAddWidget,
  onResetData,
  onExportJson,
  onOpenAddCategory,
  onRefresh,
}) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 2 days');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const timeOptions = ['Last 24 hours', 'Last 2 days', 'Last 7 days', 'Last 30 days'];

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="dashboard-header-container">
      {/* Title */}
      <h1 className="dashboard-main-title">CNAPP Dashboard</h1>

      {/* Action Controls Toolbar */}
      <div className="dashboard-actions-toolbar">
        {/* Add Widget Button */}
        <button
          type="button"
          className="btn-action-add-widget"
          onClick={() => onOpenAddWidget()}
        >
          <span>Add Widget</span>
          <Plus size={16} />
        </button>

        {/* Refresh Button */}
        <button
          type="button"
          className={`btn-action-icon ${isRefreshing ? 'refreshing-spin' : ''}`}
          onClick={handleRefreshClick}
          title="Refresh dashboard"
          aria-label="Refresh dashboard"
        >
          <RotateCw size={16} />
        </button>

        {/* More Options Dropdown */}
        <div className="more-menu-wrapper">
          <button
            type="button"
            className="btn-action-icon"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            title="More actions"
            aria-label="More actions"
          >
            <MoreVertical size={16} />
          </button>

          {isMoreMenuOpen && (
            <div className="more-dropdown-menu animate-fadeIn">
              <button
                type="button"
                className="dropdown-menu-item"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenAddCategory();
                }}
              >
                <FolderPlus size={15} />
                <span>Add New Category</span>
              </button>
              <button
                type="button"
                className="dropdown-menu-item"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onExportJson();
                }}
              >
                <Download size={15} />
                <span>Export Dashboard JSON</span>
              </button>
              <div className="dropdown-divider" />
              <button
                type="button"
                className="dropdown-menu-item text-danger"
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onResetData();
                }}
              >
                <RotateCcw size={15} />
                <span>Reset to Default Sample</span>
              </button>
            </div>
          )}
        </div>

        {/* Time Range Filter Pill */}
        <div className="time-filter-wrapper">
          <button
            type="button"
            className="btn-time-filter"
            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
          >
            <Clock size={16} className="clock-icon" />
            <span className="time-filter-label">{selectedTimeRange}</span>
            <ChevronDown size={14} className="chevron-icon" />
          </button>

          {isTimeDropdownOpen && (
            <div className="time-dropdown-menu animate-fadeIn">
              {timeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`dropdown-menu-item ${selectedTimeRange === opt ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTimeRange(opt);
                    setIsTimeDropdownOpen(false);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
