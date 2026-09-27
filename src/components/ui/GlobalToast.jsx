// components/ui/GlobalToast.jsx
'use client';

import { useEffect } from 'react';

export default function GlobalToast() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.showToast = (message, type = 'success', duration = 3000) => {
      let toast = document.getElementById('toast');
      if (!toast) {
        const toastHTML = `
          <div id="toast">
            <span class="toast-icon"></span>
            <span class="toast-message"></span>
            <button class="toast-close" onclick="window.hideToast()">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        toast = document.getElementById('toast');
      }

      const icon = toast.querySelector('.toast-icon');
      const messageEl = toast.querySelector('.toast-message');

      icon.className = 'toast-icon';
      icon.innerHTML = '';

      if (type === 'success') {
        icon.classList.add('success');
        icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      } else if (type === 'error') {
        icon.classList.add('error');
        icon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      } else {
        icon.classList.add('info');
        icon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
      }

      messageEl.textContent = message;
      toast.classList.add('show');

      if (window.toastTimeout) clearTimeout(window.toastTimeout);
      window.toastTimeout = setTimeout(window.hideToast, duration);
    };

    window.hideToast = () => {
      const toast = document.getElementById('toast');
      if (toast) toast.classList.remove('show');
      if (window.toastTimeout) {
        clearTimeout(window.toastTimeout);
        window.toastTimeout = null;
      }
    };

    return () => {
      delete window.showToast;
      delete window.hideToast;
    };
  }, []);

  return null;
}