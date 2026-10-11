import React from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
      case 'warning':
        return <AlertTriangle size={18} className="toast-icon warning" />;
      case 'info':
        return <Info size={18} className="toast-icon info" />;
      case 'success':
      default:
        return <CheckCircle size={18} className="toast-icon success" />;
    }
  };

  return (
    <div className="toast-banner animate-slideUp">
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
      {toast.onUndo && (
        <button type="button" className="toast-undo-btn" onClick={toast.onUndo}>
          Undo
        </button>
      )}
      <button type="button" className="toast-close-btn" onClick={onClose}>
        <X size={14} />
      </button>
    </div>
  );
}
