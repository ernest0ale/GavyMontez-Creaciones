// app/detalles/[slug]/opengraph-image.js
import { ImageResponse } from 'next/og';
import { getProductoBySlug } from '@/data/productos';
import { loadOgFonts } from '@/utils/og-fonts';

export const runtime = 'nodejs';
export const alt = 'Detalle del producto — GavyMontez Creaciones';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const producto = getProductoBySlug(slug);
  const fonts = await loadOgFonts();

  if (!producto) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, #ede0d4 0%, #a8954a 100%)',
            color: '#1a100c',
            fontSize: '48px',
            fontFamily: 'Playfair Display, serif',
          }}
        >
          Producto no encontrado
        </div>
      ),
      { ...size, fonts }
    );
  }

  const productImage = producto.img;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <img
          src={productImage}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.75) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '60px 80px',
            color: 'white',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backgroundColor: '#ad610e',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '999px',
              marginBottom: '20px',
            }}
          >
            {producto.categoria}
          </span>

          <h1
            style={{
              fontSize: '68px',
              fontWeight: 700,
              margin: 0,
              fontFamily: 'Playfair Display, serif',
              lineHeight: 1.1,
              textShadow: '0 2px 15px rgba(0,0,0,0.5)',
            }}
          >
            {producto.nombre}
          </h1>

          <p
            style={{
              fontSize: '32px',
              fontWeight: 700,
              marginTop: '16px',
              color: '#f0c27b',
              textShadow: '0 2px 15px rgba(0,0,0,0.5)',
            }}
          >
            {producto.precio}
          </p>

          {producto.descripcion && (
            <p
              style={{
                fontSize: '22px',
                marginTop: '12px',
                opacity: 0.9,
                maxWidth: '900px',
                textShadow: '0 2px 15px rgba(0,0,0,0.5)',
              }}
            >
              {producto.descripcion.slice(0, 120)}
              {producto.descripcion.length > 120 ? '...' : ''}
            </p>
          )}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}