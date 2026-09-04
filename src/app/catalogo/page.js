// src/app/catalogo/page.js
'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageTitle from '../../components/ui/PageTitle';
import { productos } from '../../data/productos';
import ProductGrid from '../../components/ui/ProductGrid';
import CategoryFilter from '../../components/ui/CategoryFilter';
import Pagination from '../../components/ui/Pagination';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

function CatalogoContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    const catParam = searchParams?.get('cat');
    if (catParam && catParam !== 'todos') {
      setSelectedCategory(catParam);
    }
    setLoading(false);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = productos;

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter((p) => p.categoria === selectedCategory);
    }

    if (selectedType !== 'todos') {
      filtered = filtered.filter((p) => p.tipo === selectedType);
    }

    return filtered;
  }, [selectedCategory, selectedType]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedType]);

  if (loading) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SkeletonLoader count={8} />
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Catálogo" />

      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2" style={{ color: 'var(--accent)' }}>
              <i className="fa-regular fa-rectangle-list"></i> Colección GavyMontez
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
              Piezas únicas, hechas con amor
            </h1>
            <p className="mt-2 md:mt-3 text-sm md:text-base text-[var(--text-primary)] opacity-70">
              Filtra por categoría o tipo. Mostrando {itemsPerPage} productos por página.
            </p>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <i className="fa-regular fa-face-frown text-4xl md:text-5xl" style={{ color: 'var(--accent)', opacity: 0.3 }}></i>
              <p className="text-lg mt-4 text-[var(--text-primary)] opacity-70">
                No hay productos en esta categoría.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSelectedType('todos');
                }}
                className="mt-4 text-white px-6 py-2 rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                Mostrar todos
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 md:mt-8">
                <ProductGrid products={currentProducts} />
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SkeletonLoader count={8} />
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}