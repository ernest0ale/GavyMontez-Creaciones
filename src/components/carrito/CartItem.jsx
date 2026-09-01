// components/carrito/CartItem.jsx
'use client';

import Image from 'next/image';
import { useCart } from '../../hooks/useCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      updateQuantity(item.id, value);
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

  const handleRemove = () => {
    removeItem(item.id);
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
        className="rounded-xl object-cover bg-[var(--hero-bg)] flex-shrink-0"
      />
      <div className="cart-item-info">
        <h3>{item.nombre}</h3>
        <p>{item.precio} c/u</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="qty-control">
          <button onClick={handleDecrement}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="number"
            value={item.cantidad}
            onChange={handleQuantityChange}
            min="1"
          />
          <button onClick={handleIncrement}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <span className="font-semibold min-w-[50px] text-right text-[var(--accent)]">
          ${subtotal.toFixed(0)}
        </span>
        <button onClick={handleRemove} className="remove-btn" aria-label="Eliminar artículo">
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}