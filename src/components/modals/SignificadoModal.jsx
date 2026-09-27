// components/modals/SignificadoModal.jsx
'use client';

import { useEffect } from 'react';

export default function SignificadoModal({ isOpen, onClose, title, items }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="text-[var(--accent)]">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div
      className={`significado-modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="significado-modal">
        <button onClick={onClose} className="modal-close" aria-label="Cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h3>{title || 'Significado Espiritual'}</h3>

        <ul className="space-y-2 mt-4">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <li
                key={index}
                className="p-3 rounded-xl border-l-4 text-sm leading-relaxed bg-[var(--bg-primary)] text-[var(--text-primary)]"
                style={{ borderLeftColor: 'var(--accent)' }}
              >
                {formatText(item)}
              </li>
            ))
          ) : (
            <li className="p-4 text-center rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)]">
              <i className="fa-regular fa-face-frown text-[var(--accent)]"></i>
              <span className="block mt-1 text-sm opacity-70">No hay información de significado disponible.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}