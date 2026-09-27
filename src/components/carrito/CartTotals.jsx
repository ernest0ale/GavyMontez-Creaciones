// components/carrito/CartTotals.jsx
'use client';

import { useCart } from '../../hooks/useCart';

export default function CartTotals() {
  const { subtotal, commission, total, items } = useCart();

  if (items.length === 0) return null;

  const handleWhatsAppCheckout = () => {
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
    <div className="mt-6 pt-4 border-t border-[var(--border)]">
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm text-[var(--text-primary)]">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm text-[var(--text-primary)] opacity-70">
          <span>Comisión (10%)</span>
          <span>${commission.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 mt-1 border-t border-[var(--border)]">
          <span className="text-[var(--text-primary)]">Total</span>
          <span className="text-[var(--accent)]">${total.toFixed(0)}</span>
        </div>
      </div>

      <button onClick={handleWhatsAppCheckout} className="cart-checkout-btn">
        <i className="fa-brands fa-whatsapp text-xl"></i> Comprar por WhatsApp
      </button>

      <button
        onClick={() => (window.location.href = '/catalogo')}
        className="w-full mt-2 py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-opacity-10 border border-[var(--border)] bg-transparent text-[var(--text-primary)]"
      >
        <i className="fa-solid fa-arrow-left"></i> Seguir comprando
      </button>
    </div>
  );
}