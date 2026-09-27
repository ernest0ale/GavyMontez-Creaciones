// components/ui/Toast.jsx
'use client';

import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!isVisible || !message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="fa-solid fa-circle-check"></i>;
      case 'error':
        return <i className="fa-solid fa-circle-xmark"></i>;
      case 'info':
      default:
        return <i className="fa-solid fa-circle-info"></i>;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return '#2e7d32';
      case 'error':
        return '#c62828';
      case 'info':
      default:
        return 'var(--accent)';
    }
  };

  return (
    <div
      className="fixed top-[90px] right-5 z-[9999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border animate-slideIn"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border)',
        maxWidth: '400px',
      }}
    >
      <span className="text-xl flex-shrink-0" style={{ color: getColor() }}>
        {getIcon()}
      </span>
      <span className="text-sm font-medium text-[var(--text-primary)]">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) setTimeout(onClose, 300);
        }}
        className="text-[var(--text-primary)] opacity-40 hover:opacity-100 text-lg ml-1"
        aria-label="Cerrar notificación"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(calc(100% + 30px));
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @media (max-width: 480px) {
          .fixed {
            right: 10px;
            left: 10px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}