// app/carrito/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/carrito/CartItem';
import CartTotals from '../../components/carrito/CartTotals';
import AddProductsModal from '../../components/carrito/AddProductsModal';

export default function CarritoPage() {
  const { items, totalItems } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <i className="fa-solid fa-spinner fa-spin text-3xl" style={{ color: 'var(--accent)' }}></i>
      </div>
    );
  }

  return (
    <>
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
              <i className="fa-solid fa-cart-shopping" style={{ color: 'var(--accent)' }}></i> Mi Carrito
            </h1>
            <Link
              href="/catalogo"
              className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all text-[var(--accent)]"
            >
              <i className="fa-solid fa-arrow-left"></i> Seguir comprando
            </Link>
          </div>

          <div
            className="rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border shadow-md"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
          >
            {items.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <i className="fa-solid fa-basket-shopping text-4xl md:text-5xl" style={{ color: 'var(--accent)', opacity: 0.3 }}></i>
                <h3 className="text-lg md:text-xl font-serif font-bold mt-4 text-[var(--text-primary)]">
                  Tu carrito está vacío
                </h3>
                <p className="mt-1 md:mt-2 text-sm md:text-base text-[var(--text-primary)] opacity-60">
                  Explora nuestro catálogo y añade tus piezas favoritas
                </p>
                <Link
                  href="/catalogo"
                  className="inline-block mt-6 text-white px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-3 md:space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Botón para añadir más productos */}
                <div className="mt-4 md:mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="add-more-btn"
                  >
                    <i className="fa-solid fa-plus"></i> Añadir otro artículo
                  </button>
                </div>

                <CartTotals />
              </>
            )}
          </div>
        </div>
      </main>

      <AddProductsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingProductIds={items.map(item => item.id)}
      />
    </>
  );
}