// app/politica-envios/page.js
import Link from 'next/link';

export default function PoliticaEnviosPage() {
  return (
    <main className="flex-grow py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--accent)' }}>
            Información de envíos
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
            Política de Envíos
          </h1>
          <p className="mt-2 text-sm md:text-base text-[var(--text-primary)] opacity-70">
            Conoce cómo hacemos llegar nuestras creaciones hasta tu hogar.
          </p>
        </div>

        <div
          className="rounded-2xl md:rounded-3xl p-6 md:p-8 border shadow-md space-y-5 md:space-y-6"
          style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
        >
          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold flex items-center gap-2 text-[var(--text-primary)]">
              <i className="fa-solid fa-truck" style={{ color: 'var(--accent)' }}></i> Cobertura de envíos
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Realizamos envíos a toda Cuba a través de servicios de mensajería. Actualmente no realizamos envíos internacionales.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold flex items-center gap-2 text-[var(--text-primary)]">
              <i className="fa-solid fa-calculator" style={{ color: 'var(--accent)' }}></i> Costo de envío
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              El costo de envío se calcula según la ubicación del destinatario y el peso del paquete. Te informaremos el costo exacto antes de confirmar la compra para que puedas aceptarlo o rechazarlo.
            </p>
            <div
              className="mt-3 p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
            >
              <p className="text-sm text-[var(--text-primary)]">
                <i className="fa-regular fa-lightbulb" style={{ color: 'var(--accent)' }}></i>
                <strong> Nota:</strong> Para pedidos dentro de La Habana, el costo de envío es significativamente menor y en muchos casos podemos coordinar entrega personalizada sin costo adicional.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold flex items-center gap-2 text-[var(--text-primary)]">
              <i className="fa-regular fa-clock" style={{ color: 'var(--accent)' }}></i> Tiempos de entrega
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Los tiempos de entrega varían según la ubicación:
            </p>
            <ul className="mt-2 space-y-2 text-sm md:text-base text-[var(--text-primary)] opacity-80">
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--accent)' }}><i className="fa-solid fa-location-dot"></i></span>
                <span><strong>La Habana:</strong> 1-3 días hábiles</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--accent)' }}><i className="fa-solid fa-location-dot"></i></span>
                <span><strong>Resto del país:</strong> 3-7 días hábiles</span>
              </li>
            </ul>
            <p className="text-xs md:text-sm text-[var(--text-primary)] opacity-60 mt-1">
              <i className="fa-regular fa-info-circle"></i> Los plazos pueden variar según la disponibilidad del servicio de mensajería en cada zona.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold flex items-center gap-2 text-[var(--text-primary)]">
              <i className="fa-solid fa-box-open" style={{ color: 'var(--accent)' }}></i> Embalaje y protección
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Cada pieza es cuidadosamente empacada con materiales de protección para garantizar que llegue en perfectas condiciones. Utilizamos cajas resistentes, papel burbuja y materiales reciclados siempre que es posible.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold flex items-center gap-2 text-[var(--text-primary)]">
              <i className="fa-regular fa-circle-check" style={{ color: 'var(--accent)' }}></i> Seguimiento del pedido
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Una vez realizado el envío, te proporcionaremos el número de seguimiento para que puedas rastrear tu paquete. También estaremos en contacto por WhatsApp para mantenerte informado durante todo el proceso.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold flex items-center gap-2 text-[var(--text-primary)]">
              <i className="fa-solid fa-handshake" style={{ color: 'var(--accent)' }}></i> Entrega personalizada en La Habana
            </h2>
            <p className="text-sm md:text-base text-[var(--text-primary)] opacity-80 mt-1">
              Para clientes en La Habana, ofrecemos la opción de entrega personalizada en punto de encuentro acordado (sin costo adicional). Esta opción se coordina directamente por WhatsApp.
            </p>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <p className="text-xs text-center text-[var(--text-primary)] opacity-60">
              Última actualización: marzo 2025
            </p>
            <p className="text-xs text-center text-[var(--text-primary)] opacity-50 mt-1">
              <i className="fa-regular fa-envelope"></i> ¿Dudas? Contáctanos por{' '}
              <a href="https://wa.me/5358481876" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                WhatsApp
              </a>{' '}
              o{' '}
              <a href="mailto:gavymontez@creaciones.com" style={{ color: 'var(--accent)' }}>
                email
              </a>
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