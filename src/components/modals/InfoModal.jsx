// components/modals/InfoModal.jsx
'use client';

import { useEffect } from 'react';

export default function InfoModal({ isOpen, onClose, materiales, tamano }) {
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

  return (
    <div
      className={`info-modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="info-modal">
        <button onClick={onClose} className="modal-close" aria-label="Cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h3>
          <i className="fa-solid fa-circle-info text-[var(--accent)]"></i> Información del producto
        </h3>

        <div className="info-grid">
          <div className="info-item">
            <span className="label">
              <i className="fa-solid fa-cube"></i> Materiales
            </span>
            <span className="value">{materiales || 'No especificado'}</span>
          </div>

          <div className="info-item">
            <span className="label">
              <i className="fa-solid fa-ruler"></i> Tamaño / Medidas
            </span>
            <span className="value">{tamano || 'No especificado'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}