// components/ui/PageTitle.jsx
'use client';

import { useEffect } from 'react';

/**
 * Componente para establecer el título de la página dinámicamente.
 * - Si `title` es null/undefined/'Inicio' → solo "GavyMontez Creaciones"
 * - En otro caso → "{title} | GavyMontez Creaciones"
 */
export default function PageTitle({ title }) {
  useEffect(() => {
    const SITE_NAME = 'GavyMontez Creaciones';

    // Si no hay título o es "Inicio", solo el nombre del sitio
    if (!title || title === 'Inicio') {
      document.title = SITE_NAME;
    } else {
      document.title = `${title} | ${SITE_NAME}`;
    }
  }, [title]);

  return null;
}