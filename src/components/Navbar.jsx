import React from 'react';
import { Search, X, Bell, ChevronDown } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, onResetData }) {
  return (
    <header className="navbar-root">
      <div className="navbar-container">
        {/* Breadcrumb navigation */}
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-item active">Dashboard V2</span>
        </nav>

        {/* Global Search Bar */}
        <div className="navbar-search-wrapper">
          <div className="navbar-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              id="global-search-input"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
              aria-label="Search widgets"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Right User & Actions */}
        <div className="navbar-user-actions">
          <button
            type="button"
            className="navbar-icon-btn"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="notification-badge" />
          </button>

          <div className="navbar-user-profile" title="Signed in as Administrator">
            <div className="user-avatar">
              <span>AK</span>
            </div>
            <span className="user-name">Admin</span>
            <ChevronDown size={14} className="user-chevron" />
          </div>
        </div>
      </div>
    </header>
  );
}
