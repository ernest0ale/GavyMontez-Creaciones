// src/app/detalles/[slug]/layout.js
import { getProductoBySlug } from '@/data/productos';

const SITE_URL = 'https://gavymontez-creaciones.vercel.app';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);

  if (!producto) {
    return {
      title: 'Producto no encontrado',
      description: 'La pieza que buscas no está disponible.',
    };
  }

  const productUrl = `${SITE_URL}/detalles/${producto.slug}`;
  const ogImageUrl = `${productUrl}/opengraph-image`;

  return {
    title: producto.nombre,
    description: producto.descripcion,
    alternates: { canonical: `/detalles/${producto.slug}` },
    openGraph: {
      title: `${producto.nombre} | GavyMontez Creaciones`,
      description: producto.descripcion,
      url: productUrl,
      siteName: 'GavyMontez Creaciones',
      locale: 'es_ES',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: producto.nombre,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${producto.nombre} | GavyMontez Creaciones`,
      description: producto.descripcion,
      images: [ogImageUrl],
    },
  };
}

export default function DetalleLayout({ children }) {
  return children;
}