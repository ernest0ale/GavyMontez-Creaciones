// app/sitemap.js

export default function sitemap() {
  const baseUrl = 'https://gavymontez-creaciones.vercel.app';

  // Páginas estáticas importantes
  const rutas = [
    { ruta: '',              prioridad: 1.0,  frecuencia: 'weekly'  }, // Home
    { ruta: '/catalogo',     prioridad: 0.9,  frecuencia: 'weekly'  }, // Catálogo
    { ruta: '/novedades',    prioridad: 0.9,  frecuencia: 'weekly'  }, // Novedades
    { ruta: '/contacto',     prioridad: 0.7,  frecuencia: 'monthly' }, // Contacto
    { ruta: '/preguntas-frecuentes', prioridad: 0.6, frecuencia: 'monthly' },
    { ruta: '/politica-envios',      prioridad: 0.5, frecuencia: 'yearly'  },
    { ruta: '/terminos',             prioridad: 0.5, frecuencia: 'yearly'  },
  ];

  return rutas.map(({ ruta, prioridad, frecuencia }) => ({
    url: `${baseUrl}${ruta}`,
    lastModified: new Date(),
    changeFrequency: frecuencia,
    priority: prioridad,
  }));
}