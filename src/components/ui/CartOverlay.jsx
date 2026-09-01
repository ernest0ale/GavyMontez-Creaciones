// components/ui/CartOverlay.jsx
'use client';

import { useCart } from '../../hooks/useCart';
import Image from 'next/image';

export default function CartOverlay({ isOpen, onClose }) {
  const { items, subtotal, commission, total, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (id, value) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      updateQuantity(id, num);
    }
  };

  const handleDecrement = (item) => {
    if (item.cantidad > 1) {
      updateQuantity(item.id, item.cantidad - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.cantidad + 1);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    let mensaje =
      'Hola, vengo de la página web gavymontez-creaciones y estoy interesado en comprar estos artículos:\n\n';
    items.forEach((item) => {
      mensaje += `·${item.nombre} x ${item.cantidad}\n`;
    });
    mensaje += `\nEl precio total sería $${total.toFixed(0)}.`;

    window.open(`https://wa.me/5358481876?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <>
      <div
        className={`cart-overlay-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-header-title">
            <i className="fa-solid fa-cart-shopping"></i> Tu carrito
          </h2>
          <button onClick={onClose} className="cart-close-btn" aria-label="Cerrar carrito">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="fa-solid fa-basket-shopping"></i>
              <p>Tu carrito está vacío</p>
              <p className="text-sm mt-1">Explora nuestro catálogo y añade tus piezas favoritas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const priceNumber = parseFloat(
                  String(item.precio)
                    .replace(/[$,]/g, '')
                    .replace(' USD', '')
                    .trim()
                );
                const itemTotal = priceNumber * item.cantidad;

                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.nombre}</div>
                      <div className="cart-item-meta">{item.precio} c/u</div>
                    </div>
                    <div className="cart-item-actions">
                      <button onClick={() => handleDecrement(item)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        value={item.cantidad}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        min="1"
                      />
                      <button onClick={() => handleIncrement(item)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <span className="cart-item-price">${itemTotal.toFixed(0)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <button
              onClick={() => {
                onClose();
                window.location.href = '/carrito';
              }}
              className="cart-go-to-btn"
            >
              <i className="fa-solid fa-arrow-right"></i> Ir al carrito
            </button>

            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span className="price">${subtotal.toFixed(0)}</span>
              </div>
              <div className="cart-total-row">
                <span>Comisión (10%)</span>
                <span className="price">${commission.toFixed(0)}</span>
              </div>
              <div className="cart-total-row total">
                <span>Total</span>
                <span className="price">${total.toFixed(0)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="cart-checkout-btn">
              <i className="fa-brands fa-whatsapp text-xl"></i> Comprar por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}