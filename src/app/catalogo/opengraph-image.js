// app/catalogo/opengraph-image.js
import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/utils/og-fonts';

export const runtime = 'nodejs';
export const alt = 'Catálogo — GavyMontez Creaciones';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 80px',
          background:
            'linear-gradient(180deg, #ede0d4 0%, #d9c8b8 25%, #c6b09a 50%, #b8a392 75%, #a8954a 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#ad610e',
            marginBottom: '16px',
          }}
        >
          Colección GavyMontez
        </span>

        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            margin: 0,
            color: '#1a100c',
            fontFamily: 'Playfair Display, serif',
            lineHeight: 1.15,
          }}
        >
          Piezas únicas, hechas con amor
        </h1>

        <p
          style={{
            fontSize: '26px',
            marginTop: '24px',
            color: '#1a100c',
            opacity: 0.7,
            maxWidth: '900px',
          }}
        >
          Filtra por categoría o tipo. Descubre nuestra colección completa.
        </p>

        <div
          style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#ad610e',
            borderRadius: '2px',
            marginTop: '32px',
          }}
        />
      </div>
    ),
    { ...size, fonts }
  );
}