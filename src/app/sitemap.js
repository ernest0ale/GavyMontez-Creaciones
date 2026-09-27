// app/sitemap.js

import { productos } from '@/data/productos';
const SITE_URL = 'https://gavymontez-creaciones.vercel.app';

export default function sitemap() {
  const rutas = [
    { ruta: '',              prioridad: 1.0,  frecuencia: 'weekly'  },
    { ruta: '/catalogo',     prioridad: 0.9,  frecuencia: 'weekly'  },
    { ruta: '/novedades',    prioridad: 0.9,  frecuencia: 'weekly'  },
    { ruta: '/contacto',     prioridad: 0.7,  frecuencia: 'monthly' },
    { ruta: '/preguntas-frecuentes', prioridad: 0.6, frecuencia: 'monthly' },
    { ruta: '/politica-envios',      prioridad: 0.5, frecuencia: 'yearly'  },
    { ruta: '/terminos',             prioridad: 0.5, frecuencia: 'yearly'  },
  ];

  const paginasEstaticas = rutas.map(({ ruta, prioridad, frecuencia }) => ({
    url: `${SITE_URL}${ruta}`,
    lastModified: new Date(),
    changeFrequency: frecuencia,
    priority: prioridad,
  }));

  const paginasProductos = productos.map((p) => ({
    url: `${SITE_URL}/detalles/${p.slug}`, // ✅ slug
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...paginasEstaticas, ...paginasProductos];
}