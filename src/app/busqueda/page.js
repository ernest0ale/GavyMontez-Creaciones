// src/app/busqueda/page.js
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { buscarProductos } from '../../data/productos';
import ProductGrid from '../../components/ui/ProductGrid';
import Pagination from '../../components/ui/Pagination';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

// 🔹 Componente que usa useSearchParams (envuelto en Suspense)
function BusquedaContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    const found = buscarProductos(query);
    setResults(found);
    setCurrentPage(1);
    setLoading(false);
  }, [query]);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = results.slice(startIndex, startIndex + itemsPerPage);

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
            Resultados de búsqueda
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
            {query ? `Resultados para "${query}"` : 'Búsqueda'}
          </h1>
          <p className="mt-2 text-sm md:text-base text-[var(--text-primary)] opacity-70">
            {results.length} producto{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <i className="fa-regular fa-face-frown text-4xl md:text-5xl" style={{ color: 'var(--accent)', opacity: 0.3 }}></i>
            <p className="text-lg mt-4 text-[var(--text-primary)] opacity-70">
              No se encontraron productos para tu búsqueda.
            </p>
            <p className="text-sm mt-1 text-[var(--text-primary)] opacity-50">
              Prueba con otras palabras clave o revisa nuestro catálogo completo.
            </p>
            <a
              href="/catalogo"
              className="inline-block mt-6 text-white px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Ver catálogo completo
            </a>
          </div>
        ) : (
          <>
            <ProductGrid products={currentProducts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </main>
  );
}

// 🔹 Componente principal con Suspense
export default function BusquedaPage() {
  return (
    <Suspense fallback={
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SkeletonLoader count={8} />
      </div>
    }>
      <BusquedaContent />
    </Suspense>
  );
}