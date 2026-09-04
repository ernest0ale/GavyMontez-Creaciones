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
      }
      return newSelection;
    });
  };

  const updateModalQty = (productId, value) => {
    // Permitir campo vacío para que el usuario pueda escribir
    if (value === '') {
      setSelectedProducts(prev => {
        const newSelection = { ...prev };
        if (newSelection[productId]) {
          newSelection[productId].quantity = '';
        }
        return newSelection;
      });
      return;
    }
    
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1) {
      setSelectedProducts(prev => {
        const newSelection = { ...prev };
        if (newSelection[productId]) {
          newSelection[productId].quantity = num;
        }
        return newSelection;
      });
    }
  };

  const handleModalQtyBlur = (productId) => {
    setSelectedProducts(prev => {
      const newSelection = { ...prev };
      if (newSelection[productId]) {
        // Si el campo está vacío o es 0, establecer a 1
        if (!newSelection[productId].quantity || newSelection[productId].quantity < 1) {
          newSelection[productId].quantity = 1;
        }
      }
      return newSelection;
    });
  };

  const handleAddSelected = () => {
    const selectedIds = Object.keys(selectedProducts);
    if (selectedIds.length === 0) return;

    selectedIds.forEach(id => {
      const { product, quantity } = selectedProducts[id];
      const finalQuantity = quantity || 1;
      addItem(product, finalQuantity);
    });

    if (typeof window.showToast === 'function') {
      window.showToast(`¡${selectedIds.length} artículo${selectedIds.length > 1 ? 's' : ''} añadido${selectedIds.length > 1 ? 's' : ''} al carrito!`, 'success');
    }

    onClose();
  };

  const selectedCount = Object.keys(selectedProducts).length;

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn" aria-label="Cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          <i className="fa-solid fa-plus-circle" style={{ color: 'var(--accent)' }}></i> Añadir artículos
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', opacity: 0.6 }}>
          Haz clic en las tarjetas para seleccionar múltiples artículos. Ajusta la cantidad con los botones.
        </p>

        <div className="modal-selection-counter">
          <span>Artículos seleccionados:</span>
          <span className="count">{selectedCount}</span>
        </div>

        {/* ===== BÚSQUEDA Y FILTRO - ESTILO SEARCH-OVERLAY ===== */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div
            className="flex-1 flex items-center gap-2 rounded-full px-4 py-2 transition-all focus-within:border-[var(--accent)]"
            style={{
              border: '2px solid var(--border)',
              backgroundColor: 'var(--card-bg)',
              fontFamily: 'inherit',
              boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
            }}
          >
            <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--text-primary)', opacity: 0.5, fontSize: '0.95rem' }}></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                background: 'transparent',
                padding: '0.2rem 0'
              }}
              autoComplete="off"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[var(--text-primary)] opacity-40 hover:opacity-100 text-sm"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-full text-sm outline-none cursor-pointer transition-all focus:border-[var(--accent)]"
            style={{
              border: '2px solid var(--border)',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.8rem center',
              paddingRight: '2.2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}>
                {categoryLabels[cat] || cat}
              </option>
            ))}
          </select>
        </div>

        {availableProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-primary)', opacity: 0.6 }}>
            <i className="fa-solid fa-check-circle" style={{ color: 'var(--accent)', fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}></i>
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
              const subtotal = priceNumber * (quantity || 1);

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
                      <div
                        className="qty-control"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border)',
                          borderRadius: '30px',
                          padding: '0.1rem 0.2rem',
                          marginTop: '0.4rem',
                          justifyContent: 'center'
                        }}
                      >
                        <button
                          onClick={() => changeModalQty(product.id, -1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            border: '1px solid var(--border)',
                            background: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--card-bg)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={quantity}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              // Permitir campo vacío
                              setSelectedProducts(prev => {
                                const newSelection = { ...prev };
                                if (newSelection[product.id]) {
                                  newSelection[product.id].quantity = '';
                                }
                                return newSelection;
                              });
                              return;
                            }
                            const num = parseInt(val);
                            if (!isNaN(num) && num >= 1) {
                              setSelectedProducts(prev => {
                                const newSelection = { ...prev };
                                if (newSelection[product.id]) {
                                  newSelection[product.id].quantity = num;
                                }
                                return newSelection;
                              });
                            }
                          }}
                          onBlur={() => {
                            setSelectedProducts(prev => {
                              const newSelection = { ...prev };
                              if (newSelection[product.id]) {
                                if (!newSelection[product.id].quantity || newSelection[product.id].quantity < 1) {
                                  newSelection[product.id].quantity = 1;
                                }
                              }
                              return newSelection;
                            });
                          }}
                          onFocus={(e) => e.target.select()}
                          min="1"
                          style={{
                            width: '32px',
                            textAlign: 'center',
                            border: 'none',
                            background: 'transparent',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            padding: 0,
                            flexShrink: 0
                          }}
                        />
                        <button
                          onClick={() => changeModalQty(product.id, 1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            border: '1px solid var(--border)',
                            background: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--card-bg)';
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <span className="subtotal-preview" style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-primary)',
                        opacity: 0.6,
                        marginTop: '0.2rem',
                        display: 'block'
                      }}>
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
          onClick={handleAddSelected}
          disabled={selectedCount === 0}
          className="modal-add-btn"
          style={{
            backgroundColor: selectedCount > 0 ? 'var(--accent)' : 'var(--border)',
            opacity: selectedCount > 0 ? 1 : 0.4,
            cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
            display: 'block',
            width: '100%',
            padding: '0.8rem',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'all 0.3s ease',
            marginTop: '1rem',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            if (selectedCount > 0) {
              e.currentTarget.style.backgroundColor = 'var(--btn-hover-bg)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCount > 0) {
              e.currentTarget.style.backgroundColor = 'var(--accent)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          {selectedCount > 0
            ? `Añadir ${selectedCount} artículo${selectedCount > 1 ? 's' : ''} al carrito`
            : 'Selecciona artículos para añadir'}
        </button>
      </div>
    </div>
  );
}