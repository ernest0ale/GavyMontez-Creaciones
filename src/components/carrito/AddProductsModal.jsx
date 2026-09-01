// src/components/carrito/AddProductsModal.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { productos } from '../../data/productos';
import { useCart } from '../../hooks/useCart';

export default function AddProductsModal({ isOpen, onClose, existingProductIds = [] }) {
  const { addItem } = useCart();
  const [selectedProducts, setSelectedProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todos');

  useEffect(() => {
    if (isOpen) {
      setSelectedProducts({});
      setSearchTerm('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const availableProducts = useMemo(() => {
    let filtered = productos.filter(p => !existingProductIds.includes(p.id));

    if (filterCategory !== 'todos') {
      filtered = filtered.filter(p => p.categoria === filterCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [existingProductIds, filterCategory, searchTerm]);

  const categories = useMemo(() => {
    const cats = new Set(availableProducts.map(p => p.categoria));
    return ['todos', ...Array.from(cats)];
  }, [availableProducts]);

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      const newSelection = { ...prev };
      if (newSelection[productId]) {
        delete newSelection[productId];
      } else {
        const product = productos.find(p => p.id === productId);
        if (product) {
          newSelection[productId] = { product, quantity: 1 };
        }
      }
      return newSelection;
    });
  };

  const changeModalQty = (productId, delta) => {
    setSelectedProducts(prev => {
      const newSelection = { ...prev };
      if (newSelection[productId]) {
        const newQuantity = Math.max(1, newSelection[productId].quantity + delta);
        newSelection[productId].quantity = newQuantity;
        const product = newSelection[productId].product;
        const priceNumber = parseFloat(
          String(product.precio)
            .replace(/[$,]/g, '')
            .replace(' USD', '')
            .trim()
        );
        const subtotal = priceNumber * newQuantity;
        const subtotalSpan = document.getElementById(`modalSubtotal_${productId}`);
        if (subtotalSpan) {
          subtotalSpan.textContent = `$${subtotal.toFixed(0)}`;
        }
      }
      return newSelection;
    });
  };

  const updateModalQty = (productId, value) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1) {
      setSelectedProducts(prev => {
        const newSelection = { ...prev };
        if (newSelection[productId]) {
          newSelection[productId].quantity = num;
          const product = newSelection[productId].product;
          const priceNumber = parseFloat(
            String(product.precio)
              .replace(/[$,]/g, '')
              .replace(' USD', '')
              .trim()
          );
          const subtotal = priceNumber * num;
          const subtotalSpan = document.getElementById(`modalSubtotal_${productId}`);
          if (subtotalSpan) {
            subtotalSpan.textContent = `$${subtotal.toFixed(0)}`;
          }
        }
        return newSelection;
      });
    }
  };

  const handleAddSelected = () => {
    const selectedIds = Object.keys(selectedProducts);
    if (selectedIds.length === 0) return;

    selectedIds.forEach(id => {
      const { product, quantity } = selectedProducts[id];
      addItem(product, quantity);
    });

    if (typeof window.showToast === 'function') {
      window.showToast(`¡${selectedIds.length} artículo${selectedIds.length > 1 ? 's' : ''} añadido${selectedIds.length > 1 ? 's' : ''} al carrito!`, 'success');
    }

    onClose();
  };

  const selectedCount = Object.keys(selectedProducts).length;

  const categoryLabels = {
    todos: 'Todos',
    atrapasuenos: 'Atrapasueños',
    collares: 'Collares',
    aretes: 'Aretes',
    pulseras: 'Pulseras',
    esculturas: 'Esculturas',
    sombreros: 'Sombreros',
    combos: 'Combos',
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button onClick={onClose} className="modal-close" aria-label="Cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h3 className="modal-title">
          <i className="fa-solid fa-plus-circle"></i> Añadir artículos
        </h3>
        <p className="modal-subtitle">
          Haz clic en las tarjetas para seleccionar múltiples artículos. Ajusta la cantidad con los botones.
        </p>

        <div className="modal-selection-counter">
          <span>Artículos seleccionados:</span>
          <span className="count">{selectedCount}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 rounded-full border px-3 py-1.5 border-[var(--border)] bg-[var(--bg-primary)]">
            <i className="fa-solid fa-search text-[var(--text-primary)] opacity-50"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)]"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[var(--text-primary)] opacity-40 hover:opacity-100"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 rounded-full border text-sm outline-none border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat] || cat}
              </option>
            ))}
          </select>
        </div>

        {availableProducts.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-primary)] opacity-60">
            <i className="fa-solid fa-check-circle text-4xl block mb-3 text-[var(--accent)]"></i>
            <p>Ya has añadido todos los artículos disponibles</p>
          </div>
        ) : (
          <div className="modal-product-grid">
            {availableProducts.map((product) => {
              const isSelected = !!selectedProducts[product.id];
              const quantity = selectedProducts[product.id]?.quantity || 1;
              const priceNumber = parseFloat(
                String(product.precio)
                  .replace(/[$,]/g, '')
                  .replace(' USD', '')
                  .trim()
              );
              const subtotal = priceNumber * quantity;

              return (
                <div
                  key={product.id}
                  className={`modal-product-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleProductSelection(product.id)}
                >
                  <span className="selection-check">
                    <i className="fa-solid fa-check"></i>
                  </span>

                  <Image
                    src={product.img}
                    alt={product.nombre}
                    style={{ 
                      width: '100%', 
                      height: '120px', 
                      objectFit: 'cover', 
                      borderRadius: '0.5rem',
                      backgroundColor: 'var(--hero-bg)'
                    }}
                    width={150}
                    height={120}
                    loading="lazy"
                  />
                  <h4>{product.nombre}</h4>
                  <span className="price">{product.precio}</span>

                  {isSelected && (
                    <>
                      <div className="qty-control" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => changeModalQty(product.id, -1)}>
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                          type="number"
                          id={`modalQty_${product.id}`}
                          value={quantity}
                          onChange={(e) => updateModalQty(product.id, e.target.value)}
                          min="1"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button onClick={() => changeModalQty(product.id, 1)}>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <span className="subtotal-preview" id={`modalSubtotal_${product.id}`}>
                        Subtotal: ${subtotal.toFixed(0)}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button
          id="modalAddBtn"
          onClick={handleAddSelected}
          disabled={selectedCount === 0}
          className={`modal-add-btn ${selectedCount > 0 ? 'hover:scale-[1.02] hover:bg-[var(--btn-hover-bg)]' : 'opacity-40 cursor-not-allowed'}`}
          style={{ backgroundColor: selectedCount > 0 ? 'var(--accent)' : 'var(--border)' }}
        >
          {selectedCount > 0
            ? `Añadir ${selectedCount} artículo${selectedCount > 1 ? 's' : ''} al carrito`
            : 'Selecciona artículos para añadir'}
        </button>
      </div>
    </div>
  );
}