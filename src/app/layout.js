// app/layout.js
import '../styles/globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import GlobalToast from '../components/ui/GlobalToast';

export const metadata = {
  title: 'GavyMontez Creaciones',
  description: 'Arte con intención y alma. Creaciones únicas hechas a mano en La Habana.',
  keywords: 'artesanía, atrapasueños, pulseras, collares, esculturas, Cuba',
  authors: [{ name: 'GavyMontez Creaciones' }],
  openGraph: {
    title: 'GavyMontez Creaciones',
    description: 'Arte con intención y alma. Creaciones únicas hechas a mano.',
    url: 'https://gavymontez-creaciones.com',
    siteName: 'GavyMontez Creaciones',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
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