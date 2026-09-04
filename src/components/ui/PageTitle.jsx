// components/ui/PageTitle.jsx
'use client';

import { useEffect } from 'react';

/**
 * Componente para establecer el título de la página dinámicamente
 * Usa el template definido en layout.js: '%s | GavyMontez Creaciones'
 */
export default function PageTitle({ title }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | GavyMontez Creaciones`;
    } else {
      document.title = 'GavyMontez Creaciones';
    }
  }, [title]);

  return null;
}