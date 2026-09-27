/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler (para optimización)
  reactCompiler: true,
  
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Experimentales
  experimental: {
    // ✅ SOLUCIÓN: optimizeCss SOLO en producción
    optimizeCss: process.env.NODE_ENV === 'production',
  },
  
  // Compilador
  
  
  // ⚠️ IMPORTANTE: NO incluyas swcMinify (obsoleto en Next.js 16)
};

module.exports = nextConfig;