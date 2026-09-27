// src/app/opengraph-image.js
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadOgFonts } from '@/utils/og-fonts';

export const runtime = 'nodejs';
export const alt = 'GavyMontez Creaciones — Arte hecho a mano';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fonts = await loadOgFonts();

  // ✅ Leer la imagen del carrusel desde el sistema de archivos
  const slideImageBuffer = await readFile(
    join(process.cwd(), 'src', 'resources', 'carrucel', 'slide1.jpg')
  );
  const slideImageBase64 = `data:image/jpeg;base64,${slideImageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
        <img
          src={slideImageBase64}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* ... resto del overlay y contenido ... */}
      </div>
    ),
    { ...size, fonts }
  );
}