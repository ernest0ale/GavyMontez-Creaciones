// app/terminos/page.js
import Link from 'next/link';

export default function TerminosPage() {
  return (
    <main className="flex-grow py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--accent)' }}>
            Información legal
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
            Términos y Condiciones
          </h1>
        </div>

        <div
          className="rounded-2xl md:rounded-3xl p-6 md:p-8 border shadow-md space-y-5 md:space-y-6"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
        >
          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[var(--text-primary)]">
              1. Política de Ventas
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Todas las creaciones de GavyMontez son piezas únicas hechas a mano. Cada artículo es cuidadosamente elaborado con materiales seleccionados y puede presentar ligeras variaciones que lo hacen especial.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[var(--text-primary)]">
              2. Precios y Comisiones
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Los precios mostrados son los establecidos por la artesana. A cada compra se le aplica un <strong>10% de comisión</strong> sobre el subtotal, que cubre los gastos de gestión y procesamiento del pedido.
            </p>
            <div
              className="mt-3 p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
            >
              <p className="text-sm text-[var(--text-primary)]">
                <strong>Ejemplo:</strong> Si el subtotal es $100, se añade $10 de comisión, totalizando $110.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[var(--text-primary)]">
              3. Formas de Pago
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Aceptamos pagos a través de transferencia bancaria, MLC y efectivo en punto de encuentro acordado. Los detalles de pago se proporcionan al confirmar el pedido por WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[var(--text-primary)]">
              4. Envíos
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Realizamos envíos a toda Cuba a través de servicios de mensajería. El costo de envío se calcula según la ubicación y se informa antes de confirmar la compra. Consulta nuestra{' '}
              <a href="/politica-envios" style={{ color: 'var(--accent)' }}>Política de Envíos</a> para más detalles.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[var(--text-primary)]">
              5. Devoluciones y Cambios
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Dado que cada pieza es única y hecha a mano, no se aceptan devoluciones. Sin embargo, si el producto llega dañado, contacta dentro de las 48 horas para evaluar una solución.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-[var(--text-primary)]">
              6. Atención al Cliente
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Estamos disponibles por WhatsApp y correo electrónico para resolver cualquier duda antes o después de tu compra.
            </p>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs text-center text-[var(--text-primary)] opacity-60">
              Última actualización: marzo 2025
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/catalogo"
              className="inline-block text-white px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <i className="fa-solid fa-arrow-left"></i> Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}