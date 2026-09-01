'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { productos } from '@/data/productos';

export function AddProductsModal({ isOpen, onClose }) {
  const { cartItems, addItem } = useCart();
  const [selectedProducts, setSelectedProducts] = useState({});
  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const cartIds = cartItems.map(item => item.id);
      const available = productos.filter(p => !cartIds.includes(p.id));
      setAvailableProducts(available);
      setSelectedProducts({});
    }
  }, [isOpen, cartItems]);

  const toggleProductSelection = (id) => {
    setSelectedProducts(prev => {
      const newSelected = { ...prev };
      if (newSelected[id]) {
        delete newSelected[id];
      } else {
        const producto = productos.find(p => p.id === id);
        if (producto) {
          newSelected[id] = { producto, cantidad: 1 };
        }
      }
      return newSelected;
    });
  };

  const changeModalQty = (id, delta) => {
    setSelectedProducts(prev => {
      const newSelected = { ...prev };
      if (newSelected[id]) {
        const newQty = Math.max(1, newSelected[id].cantidad + delta);
        newSelected[id] = { ...newSelected[id], cantidad: newQty };
      }
      return newSelected;
    });
  };

  const updateModalQty = (id, value) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1) return;
    setSelectedProducts(prev => {
      const newSelected = { ...prev };
      if (newSelected[id]) {
        newSelected[id] = { ...newSelected[id], cantidad: num };
      }
      return newSelected;
    });
  };

  const handleAddSelected = () => {
    const ids = Object.keys(selectedProducts);
    if (ids.length === 0) return;

    ids.forEach(id => {
      const { producto, cantidad } = selectedProducts[id];
      addItem(producto, cantidad);
    });

    onClose();
  };

  const selectedCount = Object.keys(selectedProducts).length;

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '750px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Selecciona artículos
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', opacity: 0.6 }}>
          Haz clic en las tarjetas para seleccionar múltiples artículos. Ajusta la cantidad con los botones.
        </p>

        <div className="modal-selection-counter">
          <span>Artículos seleccionados:</span>
          <span className="count">{selectedCount}</span>
        </div>

        {availableProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-primary)', opacity: 0.6 }}>
            <i className="fa-solid fa-check-circle" style={{ color: 'var(--accent)', fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}></i>
            Ya has añadido todos los artículos disponibles
          </div>
        ) : (
          <div className="modal-product-grid">
            {availableProducts.map(p => {
              const precioNum = parseFloat(p.precio.replace('$', '').replace('.', '').trim());
              const isSelected = !!selectedProducts[p.id];
              const qty = selectedProducts[p.id]?.cantidad || 1;
              const subtotal = precioNum * qty;

              return (
                <div
                  key={p.id}
                  className={`modal-product-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleProductSelection(p.id)}
                >
                  <span className="selection-check"><i className="fa-solid fa-check"></i></span>
                  <img
                    src={p.img}
                    onError={(e) => { e.target.src = `https://picsum.photos/seed/${p.id}/150/120`; }}
                    alt={p.nombre}
                  />
                  <h4>{p.nombre}</h4>
                  <span className="price">{p.precio}</span>
                  <div className="qty-control" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => changeModalQty(p.id, -1)}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      id={`modalQty_${p.id}`}
                      value={qty}
                      min="1"
                      onChange={(e) => { e.stopPropagation(); updateModalQty(p.id, e.target.value); }}
                    />
                    <button onClick={() => changeModalQty(p.id, 1)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <span className="subtotal-preview">${subtotal.toFixed(0)}</span>
                </div>
              );
            })}
          </div>
        )}

        <button
          className="modal-add-btn"
          onClick={handleAddSelected}
          disabled={selectedCount === 0}
        >
          {selectedCount > 0 ? `Añadir ${selectedCount} artículo${selectedCount > 1 ? 's' : ''} al carrito` : 'Añadir seleccionados al carrito'}
        </button>
      </div>
    </div>
  );
}