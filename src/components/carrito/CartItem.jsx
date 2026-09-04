// components/carrito/CartItem.jsx
'use client';

import Image from 'next/image';
import { useCart } from '../../hooks/useCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Permitir campo vacío
    if (value === '') {
      // No actualizar, solo permitir que el usuario escriba
      return;
    }
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      updateQuantity(item.id, num);
    }
  };

  const handleQuantityBlur = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      updateQuantity(item.id, 1);
    }
  };

  const handleDecrement = () => {
    if (item.cantidad > 1) {
      updateQuantity(item.id, item.cantidad - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.cantidad + 1);
  };

  const priceNumber = parseFloat(
    String(item.precio)
      .replace(/[$,]/g, '')
      .replace(' USD', '')
      .trim()
  );
  const subtotal = priceNumber * item.cantidad;

  return (
    <div className="cart-item-row">
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
        {/* QTY CONTROL - ESTILO DETALLES */}
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
            onClick={handleDecrement}
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
            type="number"
            value={item.cantidad}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            min="1"
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
              flexShrink: 0,
              MozAppearance: 'textfield'
            }}
          />
          <button
            onClick={handleIncrement}
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
          ${subtotal.toFixed(0)}
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
}