import { createSlice } from '@reduxjs/toolkit';
import initialData from '../data/dashboardData.json';

const STORAGE_KEY = 'cnapp_dashboard_state_v1';

const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized) {
      const parsed = JSON.parse(serialized);
      if (parsed && Array.isArray(parsed.categories)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load dashboard state from localStorage', e);
  }
  return initialData;
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save dashboard state to localStorage', e);
  }
};

const initialState = loadState();

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Add a brand new widget to a specific category
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        const newWidget = {
          id: widget.id || `w-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: widget.name || 'Untitled Widget',
          text: widget.text || '',
          type: widget.type || 'text',
          isVisible: true,
          data: widget.data || {}
        };
        category.widgets.push(newWidget);
        saveState(state);
      }
    },

    // Remove a widget from a specific category
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);
        saveState(state);
      }
    },

    // Remove widget directly by widgetId (used by the card cross icon)
    removeWidgetDirectly: (state, action) => {
      const { widgetId } = action.payload;
      state.categories.forEach((cat) => {
        cat.widgets = cat.widgets.filter((w) => w.id !== widgetId);
      });
      saveState(state);
    },

    // Toggle widget visibility (used by drawer checkbox)
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId, isVisible } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        const widget = category.widgets.find((w) => w.id === widgetId);
        if (widget) {
          widget.isVisible = isVisible !== undefined ? isVisible : !widget.isVisible;
          saveState(state);
        }
      }
    },

    // Sync whole category widget visibility from drawer "Confirm"
    syncCategoryVisibility: (state, action) => {
      const { categoryId, checkedWidgetIds } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        category.widgets.forEach((widget) => {
          widget.isVisible = checkedWidgetIds.includes(widget.id);
        });
        saveState(state);
      }
    },

    // Add a new Category dynamically
    addCategory: (state, action) => {
      const { name, shortName } = action.payload;
      const id = (shortName || name)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      state.categories.push({
        id: id || `cat-${Date.now()}`,
        name: name || 'New Category',
        shortName: shortName || name || 'CAT',
        widgets: []
      });
      saveState(state);
    },

    // Reset back to initial assignment mock JSON
    resetDashboard: (state) => {
      state.categories = JSON.parse(JSON.stringify(initialData.categories));
      saveState(state);
    }
  }
});

export const {
  addWidget,
  removeWidget,
  removeWidgetDirectly,
  toggleWidgetVisibility,
  syncCategoryVisibility,
  addCategory,
  resetDashboard
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
