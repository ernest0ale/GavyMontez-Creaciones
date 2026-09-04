// app/carrito/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageTitle from '../../components/ui/PageTitle';
import { useCart } from '../../hooks/useCart';
import AddProductsModal from '../../components/carrito/AddProductsModal';

export default function CarritoPage() {
  const { items, subtotal, commission, total, updateQuantity, removeItem } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartProductIds, setCartProductIds] = useState([]);

  useEffect(() => {
    setCartProductIds(items.map(item => item.id));
  }, [items]);

  const handleQuantityChange = (id, value) => {
    // Permitir campo vacío para que el usuario pueda escribir
    if (value === '') {
      // Actualizamos el estado local para mostrar el campo vacío
      // La actualización real se hará en onBlur o cuando se presione Enter
      return;
    }
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      updateQuantity(id, num);
    }
  };

  const handleQuantityBlur = (id, e) => {
    const value = e.target.value.trim();
    if (value === '') {
      // Si el campo está vacío, restaurar a 1
      updateQuantity(id, 1);
      return;
    }
    const num = parseInt(value);
    if (isNaN(num) || num < 1) {
      updateQuantity(id, 1);
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
      <PageTitle title="Mi Carrito" />

      <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">
            <i className="fa-solid fa-cart-shopping" style={{ color: 'var(--accent)' }}></i> Mi Carrito
          </h1>
        </div>

        <div
          className="rounded-3xl p-4 md:p-8 border shadow-md"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
        >
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <i className="fa-solid fa-basket-shopping"></i>
              <h3>Tu carrito está vacío</h3>
              <p className="text-sm mt-1">Explora nuestro catálogo y añade tus piezas favoritas</p>
              <Link
                href="/catalogo"
                className="mt-6 inline-block px-8 py-3 rounded-full font-semibold transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  textDecoration: 'none !important'
                }}
              >
                <i className="fa-solid fa-arrow-left mr-2"></i> Ver catálogo
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {items.map((item) => {
                  const priceNumber = parseFloat(
                    String(item.precio)
                      .replace(/[$,]/g, '')
                      .replace(' USD', '')
                      .trim()
                  );
                  const itemTotal = priceNumber * item.cantidad;

                  return (
                    <div key={item.id} className="cart-item-row">
                      <Image
                        src={item.img || 'https://picsum.photos/seed/1/80/80'}
                        alt={item.nombre}
                        width={80}
                        height={80}
                        style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover',
                          borderRadius: '0.75rem',
                          backgroundColor: 'var(--hero-bg)',
                          flexShrink: 0
                        }}
                      />
                      <div className="cart-item-info">
                        <h3>{item.nombre}</h3>
                        <p>{item.precio} c/u</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="qty-control" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border)',
                          borderRadius: '30px',
                          padding: '0.1rem 0.2rem'
                        }}>
                          <button
                            onClick={() => handleDecrement(item)}
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
                            value={item.cantidad}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '') {
                                // Permitir campo vacío
                                return;
                              }
                              const num = parseInt(val);
                              if (!isNaN(num) && num > 0) {
                                updateQuantity(item.id, num);
                              }
                            }}
                            onBlur={(e) => {
                              const val = e.target.value.trim();
                              if (val === '') {
                                updateQuantity(item.id, 1);
                              }
                            }}
                            onFocus={(e) => e.target.select()}
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
                            onClick={() => handleIncrement(item)}
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

                        <span className="font-semibold min-w-[50px] text-right text-[var(--accent)]">
                          ${itemTotal.toFixed(0)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="remove-btn"
                          aria-label="Eliminar artículo"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#e74c3c',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="add-more-btn w-full mt-4 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  textDecoration: 'none !important',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--btn-hover-bg)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <i className="fa-solid fa-plus-circle"></i> Añadir otro artículo
              </button>

              <div className="mt-6 pt-4 border-t border-[var(--border)]">
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

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Link
                    href="/catalogo"
                    className="flex-1 py-3 rounded-full font-semibold text-center transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      textDecoration: 'none !important',
                      fontSize: '1rem'
                    }}
                  >
                    <i className="fa-solid fa-arrow-left"></i> Seguir comprando
                  </Link>

                  <button
                    onClick={handleCheckout}
                    className="flex-1 py-3 rounded-full font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: '#25d366',
                      color: 'white',
                      border: 'none',
                      textDecoration: 'none !important',
                      fontSize: '1rem'
                    }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> Comprar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <AddProductsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          existingProductIds={cartProductIds}
        />
      </div>
    </>
  );
}