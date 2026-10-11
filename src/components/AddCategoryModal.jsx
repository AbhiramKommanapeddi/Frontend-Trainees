import React, { useState } from 'react';
import { X, FolderPlus } from 'lucide-react';

export default function AddCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    onAddCategory({
      name: name.trim(),
      shortName: shortName.trim() || name.trim().slice(0, 6).toUpperCase(),
    });

    setName('');
    setShortName('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <FolderPlus size={18} className="modal-icon" />
            <h4 className="modal-title">Create New Category</h4>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="modal-error-alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="cat-name-input">Category Full Name *</label>
            <input
              id="cat-name-input"
              type="text"
              placeholder="e.g. Identity & Access Governance"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cat-short-input">Short Tab Name (for Add Widget Drawer)</label>
            <input
              id="cat-short-input"
              type="text"
              placeholder="e.g. IAM (defaults to first few letters)"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              className="form-input"
              maxLength={12}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal-submit">
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
