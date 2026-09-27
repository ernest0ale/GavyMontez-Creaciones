// src/app/catalogo/layout.js
const SITE_URL = 'https://gavymontez-creaciones.vercel.app';

export const metadata = {
  title: 'Catálogo',
  description: 'Explora nuestra colección de piezas únicas hechas a mano: atrapasueños, pulseras, collares, esculturas y más.',
  alternates: { canonical: '/catalogo' },
  openGraph: {
    title: 'Catálogo | GavyMontez Creaciones',
    description: 'Explora nuestra colección de piezas únicas hechas a mano.',
    url: `${SITE_URL}/catalogo`,
    siteName: 'GavyMontez Creaciones',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/catalogo/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Catálogo — GavyMontez Creaciones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo | GavyMontez Creaciones',
    description: 'Explora nuestra colección de piezas únicas hechas a mano.',
    images: [`${SITE_URL}/catalogo/opengraph-image`],
  },
};

export default function CatalogoLayout({ children }) {
  return children;
}