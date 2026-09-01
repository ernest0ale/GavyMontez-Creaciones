// components/modals/CompartirModal.jsx
'use client';

import { useState, useEffect } from 'react';

export default function CompartirModal({ isOpen, onClose, url, title, text }) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCurrentUrl(url || window.location.href);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, url]);

  const shareText = text || 'Mira esta hermosa creación de GavyMontez Creaciones';

  const handleShare = (platform) => {
    const shareUrls = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + currentUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          if (window.showToast) {
            window.showToast('Enlace copiado al portapapeles', 'success');
          }
          onClose();
        })
        .catch(() => {
          const input = document.createElement('input');
          input.value = currentUrl;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          if (window.showToast) {
            window.showToast('Enlace copiado al portapapeles', 'success');
          }
          onClose();
        });
      return;
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=500');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`compartir-modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="compartir-modal">
        <button onClick={onClose} className="modal-close" aria-label="Cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h3>
          <i className="fa-regular fa-share-from-square text-[var(--accent)]"></i> Compartir
        </h3>

        <div className="share-grid">
          <button onClick={() => handleShare('whatsapp')} className="share-option whatsapp">
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </button>

          <button onClick={() => handleShare('facebook')} className="share-option facebook">
            <i className="fa-brands fa-facebook-f"></i> Facebook
          </button>

          <button onClick={() => handleShare('telegram')} className="share-option telegram">
            <i className="fa-brands fa-telegram"></i> Telegram
          </button>

          <button onClick={() => handleShare('copy')} className="share-option copy">
            <i className="fa-regular fa-copy"></i> Copiar
          </button>

          <button onClick={onClose} className="share-option cancelar">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}