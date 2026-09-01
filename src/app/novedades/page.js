// app/novedades/page.js
'use client';

import { useState, useEffect } from 'react';
import { getProductosRecientes, getProductosDestacados } from '../../data/productos';
import ProductGrid from '../../components/ui/ProductGrid';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

export default function NovedadesPage() {
  const [recientes, setRecientes] = useState([]);
  const [populares, setPopulares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const nuevos = getProductosRecientes(4);
      const popularesData = getProductosDestacados();
      setRecientes(nuevos);
      setPopulares(popularesData);
    } catch (error) {
      console.error('Error cargando novedades:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SkeletonLoader count={8} />
      </div>
    );
  }

  return (
    <main className="flex-grow py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--accent)' }}>
            Lo último del taller
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
            Novedades y más populares
          </h1>
          <p className="mt-2 text-sm md:text-base text-[var(--text-primary)] opacity-70">
            Descubre nuestras creaciones más recientes y los favoritos de nuestra comunidad.
          </p>
        </div>

        {/* Recientes */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="text-xl md:text-2xl" style={{ color: 'var(--accent)' }}>
              <i className="fa-regular fa-clock"></i>
            </span>
            <h2 className="text-xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Recientes
            </h2>
          </div>
          {recientes.length > 0 ? (
            <ProductGrid products={recientes} />
          ) : (
            <p className="text-center text-[var(--text-primary)] opacity-60 py-8">No hay productos recientes.</p>
          )}
        </div>

        {/* Populares */}
        <div>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="text-xl md:text-2xl" style={{ color: 'var(--accent)' }}>
              <i className="fa-solid fa-fire"></i>
            </span>
            <h2 className="text-xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Más popular
            </h2>
          </div>
          {populares.length > 0 ? (
            <ProductGrid products={populares} />
          ) : (
            <p className="text-center text-[var(--text-primary)] opacity-60 py-8">No hay productos populares.</p>
          )}
        </div>
      </div>
    </main>
  );
}