// src/app/novedades/layout.js
const SITE_URL = 'https://gavymontez-creaciones.vercel.app';

export const metadata = {
  title: 'Novedades',
  description: 'Descubre las creaciones más recientes y los favoritos de nuestra comunidad.',
  alternates: { canonical: '/novedades' },
  openGraph: {
    title: 'Novedades | GavyMontez Creaciones',
    description: 'Descubre las creaciones más recientes y los favoritos de nuestra comunidad.',
    url: `${SITE_URL}/novedades`,
    siteName: 'GavyMontez Creaciones',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/novedades/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Novedades — GavyMontez Creaciones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novedades | GavyMontez Creaciones',
    description: 'Descubre las creaciones más recientes y los favoritos de nuestra comunidad.',
    images: [`${SITE_URL}/novedades/opengraph-image`],
  },
};

export default function NovedadesLayout({ children }) {
  return children;
}