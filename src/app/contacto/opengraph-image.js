// app/contacto/opengraph-image.js
import { ImageResponse } from 'next/og';
import { loadOgFonts } from '@/utils/og-fonts';

export const runtime = 'nodejs';
export const alt = 'Contacto — GavyMontez Creaciones';
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
          padding: '60px 80px',
          background:
            'linear-gradient(180deg, #ede0d4 0%, #d9c8b8 25%, #c6b09a 50%, #b8a392 75%, #a8954a 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >

        <h1
          style={{
            fontSize: '64px',
            fontWeight: 700,
            margin: 0,
            color: '#1a100c',
            fontFamily: 'Playfair Display, serif',
            lineHeight: 1.15,
          }}
        >
          Conecta con Gavy Montez
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '40px',
            width: '100%',
            maxWidth: '820px',
            backgroundColor: '#e0d3c4',
            border: '2px solid #b8a392',
            borderRadius: '24px',
            padding: '32px',
          }}
        >
          {/* WhatsApp */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: '#ede0d4',
              border: '1px solid #b8a392',
              borderRadius: '16px',
              padding: '16px 24px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: '#25D366',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
              }}
            >
              W
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a100c' }}>
                WhatsApp
              </span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#25D366' }}>
                +53 58481876
              </span>
            </div>
          </div>

          {/* Instagram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: '#ede0d4',
              border: '1px solid #b8a392',
              borderRadius: '16px',
              padding: '16px 24px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background:
                  'linear-gradient(to top right, #f9ce34, #ee2a7b, #6228d7)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
              }}
            >
              IG
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a100c' }}>
                Instagram
              </span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#E1306C' }}>
                @gavymontez_creaciones
              </span>
            </div>
          </div>

          {/* Correo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: '#ede0d4',
              border: '1px solid #b8a392',
              borderRadius: '16px',
              padding: '16px 24px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: '#756205',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 700,
              }}
            >
              @
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#1a100c' }}>
                Correo
              </span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#756205' }}>
                gavymontez@creaciones.com
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}