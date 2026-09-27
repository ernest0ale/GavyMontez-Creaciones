// src/app/contacto/layout.js
const SITE_URL = 'https://gavymontez-creaciones.vercel.app';

export const metadata = {
  title: 'Contacto',
  description: 'Conecta con Gavy Montez. WhatsApp, Instagram y correo para consultas y pedidos.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: 'Contacto | GavyMontez Creaciones',
    description: 'Conecta con Gavy Montez por WhatsApp, Instagram o correo.',
    url: `${SITE_URL}/contacto`,
    siteName: 'GavyMontez Creaciones',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/contacto/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Contacto — GavyMontez Creaciones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | GavyMontez Creaciones',
    description: 'Conecta con Gavy Montez por WhatsApp, Instagram o correo.',
    images: [`${SITE_URL}/contacto/opengraph-image`],
  },
};

export default function ContactoLayout({ children }) {
  return children;
}