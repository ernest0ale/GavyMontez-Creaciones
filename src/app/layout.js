// src/app/layout.js
import '../styles/globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import GlobalToast from '@/components/ui/GlobalToast';

const SITE_URL = 'https://gavymontez-creaciones.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'GavyMontez Creaciones',
    template: '%s | GavyMontez Creaciones',
  },

  description:
    'Arte con intención y alma. Creaciones únicas hechas a mano con amor.',

  keywords: [
    'artesanía',
    'atrapasueños',
    'pulseras',
    'collares',
    'esculturas',
    'Cuba',
    'GavyMontez Creaciones',
    'Ernesto Alejandro García Seuret',
    'ernest0ale',
  ],

  // Autoría / creador / publicador
  authors: [
    {
      name: 'GavyMontez Creaciones',
      url: 'https://instagram.com/gavymontez_creaciones',
    },
    {
      name: 'Ernesto Alejandro García Seuret',
      url: 'https://github.com/ernest0ale',
    },
  ],
  creator: 'GavyMontez Creaciones',
  publisher: 'Ernesto Alejandro García Seuret (ernest0ale)',
  category: 'artesanía',

  // Favicon
  icons: {
    icon: [
      { url: '/resources/favicon.ico', type: 'image/x-icon' },
      { url: '/resources/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/resources/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    shortcut: '/resources/favicon.ico',
    apple: '/resources/favicon.ico',
  },

  // Metas adicionales de autoría
  other: {
    author: 'Ernesto Alejandro García Seuret',
    designer: 'Ernesto Alejandro García Seuret',
    developer: 'Ernesto Alejandro García Seuret',
    publisher: 'Ernesto Alejandro García Seuret (ernest0ale)',
    contact: 'ernest0ale',
    'instagram:creator': '@gavymontez_creaciones',
    'instagram:developer': '@ernest0ale',
  },

  // Verificación de Google Search Console
  verification: {
    google: 'APl7R9jLPAZuySiLVj3gSrFkP2tJEG_3b2Nn1dEfvFA',
  },

  openGraph: {
    title: 'GavyMontez Creaciones',
    description: 'Arte con intención y alma. Creaciones únicas hechas a mano.',
    url: SITE_URL,
    siteName: 'GavyMontez Creaciones',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'GavyMontez Creaciones — Arte hecho a mano',
      },
    ],
    authors: [
      'https://github.com/ernest0ale',
      'https://instagram.com/ernest0ale',
      'https://instagram.com/gavymontez_creaciones',
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GavyMontez Creaciones',
    description: 'Arte con intención y alma. Creaciones únicas hechas a mano.',
    images: [`${SITE_URL}/opengraph-image`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD: declara el sitio, la organización y tu autoría como desarrollador/publicador
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'GavyMontez Creaciones',
      description:
        'Arte con intención y alma. Creaciones únicas hechas a mano con amor.',
      inLanguage: 'es',
      creator: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#publisher` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'GavyMontez Creaciones',
      url: SITE_URL,
      sameAs: ['https://instagram.com/gavymontez_creaciones'],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#publisher`,
      name: 'Ernesto Alejandro García Seuret',
      alternateName: 'ernest0ale',
      url: 'https://github.com/ernest0ale',
      jobTitle: 'Desarrollador Web',
      sameAs: [
        'https://github.com/ernest0ale',
        'https://instagram.com/ernest0ale',
        'https://t.me/ernest0ale',
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        {/* JSON-LD con autoría, organización y desarrollador/publicador */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppButton />
            <GlobalToast />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}