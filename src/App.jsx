import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWidget,
  removeWidgetDirectly,
  syncCategoryVisibility,
  addCategory,
  resetDashboard
} from './store/dashboardSlice';

import Navbar from './components/Navbar';
import DashboardHeader from './components/DashboardHeader';
import CategorySection from './components/CategorySection';
import AddWidgetDrawer from './components/AddWidgetDrawer';
import AddCategoryModal from './components/AddCategoryModal';
import Toast from './components/Toast';

import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.dashboard.categories) || [];

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerActiveCategoryId, setDrawerActiveCategoryId] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Show Toast helper
  const showToast = (message, type = 'success', onUndo = null) => {
    setToast({ message, type, onUndo });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Open drawer, optionally targeting a specific category tab
  const handleOpenAddWidget = (categoryId = null) => {
    setDrawerActiveCategoryId(categoryId || categories[0]?.id || null);
    setIsDrawerOpen(true);
  };

  // Close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerActiveCategoryId(null);
  };

  // Remove widget directly by cross icon on widget card
  const handleRemoveWidget = (categoryId, widgetId) => {
    const targetCat = categories.find((c) => c.id === categoryId);
    const targetWidget = targetCat?.widgets.find((w) => w.id === widgetId);

    dispatch(removeWidgetDirectly({ widgetId }));

    showToast(
      `Removed "${targetWidget?.name || 'Widget'}"`,
      'info',
      targetWidget
        ? () => {
            dispatch(addWidget({ categoryId, widget: targetWidget }));
            showToast(`Restored "${targetWidget.name}"`, 'success');
          }
        : null
    );
  };

  // Add new widget from drawer form
  const handleAddNewWidget = (categoryId, newWidget) => {
    dispatch(addWidget({ categoryId, widget: newWidget }));
    showToast(`Added "${newWidget.name}" successfully!`, 'success');
  };

  // Delete widget permanently from drawer list
  const handleDeleteWidgetPermanently = (categoryId, widgetId) => {
    dispatch(removeWidgetDirectly({ widgetId }));
    showToast('Widget deleted permanently', 'info');
  };

  // Confirm visibility checklist from drawer
  const handleConfirmVisibility = (categoryId, checkedWidgetIds) => {
    dispatch(syncCategoryVisibility({ categoryId, checkedWidgetIds }));
    showToast('Dashboard widgets updated successfully', 'success');
  };

  // Reset to initial sample data
  const handleResetData = () => {
    if (window.confirm('Reset dashboard to default trainee sample data?')) {
      dispatch(resetDashboard());
      showToast('Dashboard reset to default configuration', 'info');
    }
  };

  // Export JSON file
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ categories }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'cnapp_dashboard_config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Dashboard configuration downloaded as JSON', 'success');
  };

  // Add new Category dynamically
  const handleAddCategory = ({ name, shortName }) => {
    dispatch(addCategory({ name, shortName }));
    showToast(`Created category "${name}"`, 'success');
  };

  // Calculate search match metrics
  const totalVisibleWidgets = categories.reduce(
    (acc, cat) => acc + (cat.widgets || []).filter((w) => w.isVisible !== false).length,
    0
  );

  const totalMatchingWidgets = categories.reduce(
    (acc, cat) =>
      acc +
      (cat.widgets || []).filter((w) => {
        if (w.isVisible === false) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return w.name?.toLowerCase().includes(q) || w.text?.toLowerCase().includes(q);
      }).length,
    0
  );

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onResetData={handleResetData}
      />

      {/* Main Dashboard Workspace */}
      <main className="dashboard-main">
        {/* Dashboard Title & Actions Bar */}
        <DashboardHeader
          onOpenAddWidget={() => handleOpenAddWidget()}
          onResetData={handleResetData}
          onExportJson={handleExportJson}
          onOpenAddCategory={() => setIsAddCategoryModalOpen(true)}
          onRefresh={() => showToast('Dashboard data refreshed', 'info')}
        />

        {/* Search Results Summary Banner (Visible when searching) */}
        {searchQuery.trim() && (
          <div className="search-results-banner animate-fadeIn">
            <span>
              Showing <strong>{totalMatchingWidgets}</strong> of {totalVisibleWidgets} widgets
              matching "<strong>{searchQuery}</strong>"
            </span>
            <button
              type="button"
              className="search-clear-link"
              onClick={() => setSearchQuery('')}
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Dynamic Category Sections */}
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            searchQuery={searchQuery}
            onRemoveWidget={handleRemoveWidget}
            onOpenAddWidget={handleOpenAddWidget}
          />
        ))}
      </main>

      {/* Add Widget Right-Side Drawer (Matches Screenshot 3) */}
      <AddWidgetDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        categories={categories}
        activeCategoryId={drawerActiveCategoryId}
        onConfirmVisibility={handleConfirmVisibility}
        onAddNewWidget={handleAddNewWidget}
        onDeleteWidgetPermanently={handleDeleteWidgetPermanently}
      />

      {/* Add Category Modal Dialog */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
