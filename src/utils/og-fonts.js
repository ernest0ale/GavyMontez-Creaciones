// src/utils/og-fonts.js
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function loadOgFonts() {
  try {
    const [playfairBold, interRegular, interBold] = await Promise.all([
      readFile(join(process.cwd(), 'src', 'resources', 'fonts', 'PlayfairDisplay-Bold.ttf')),
      readFile(join(process.cwd(), 'src', 'resources', 'fonts', 'Inter_24pt-Regular.ttf')),
      readFile(join(process.cwd(), 'src', 'resources', 'fonts', 'Inter_24pt-Bold.ttf')),
    ]);

    return [
      { name: 'Playfair Display', data: playfairBold, style: 'normal', weight: 700 },
      { name: 'Inter', data: interRegular, style: 'normal', weight: 400 },
      { name: 'Inter', data: interBold, style: 'normal', weight: 700 },
    ];
  } catch (error) {
    console.error('Error cargando fuentes para OG image:', error);
    return [];
  }
}