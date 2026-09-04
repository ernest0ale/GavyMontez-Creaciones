// app/contacto/page.js
'use client';

import PageTitle from '../../components/ui/PageTitle';

export default function ContactoPage() {
  return (
    <>
      <PageTitle title="Contacto" />

      <main className="flex-grow py-12 md:py-16 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-8 md:mb-12">
            <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--accent)' }}>
              Canales de contacto
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
              Conecta con Gavy Montez
            </h1>
            <p className="mt-2 text-sm md:text-base text-[var(--text-primary)] opacity-70">
              Estamos aquí para ayudarte con tus consultas y pedidos
            </p>
          </div>

          <div
            className="rounded-2xl md:rounded-3xl p-6 md:p-8 border shadow-md"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
          >
            <div className="space-y-3 md:space-y-4">
              <a
                href="https://wa.me/5358481876"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:pl-6 group"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
              >
                <span
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: '#25D366', color: 'white' }}
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </span>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)]">WhatsApp</h3>
                  <p className="text-xs md:text-sm font-semibold" style={{ color: '#25D366' }}>
                    +53 58481876
                  </p>
                </div>
              </a>

              <a
                href="https://instagram.com/gavymontez_creaciones"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:pl-6 group"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
              >
                <span
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(to top right, #f9ce34, #ee2a7b, #6228d7)',
                    color: 'white',
                  }}
                >
                  <i className="fa-brands fa-instagram"></i>
                </span>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)]">Instagram</h3>
                  <p className="text-xs md:text-sm font-semibold" style={{ color: '#E1306C' }}>
                    @gavymontez_creaciones
                  </p>
                </div>
              </a>

              <a
                href="mailto:gavymontez@creaciones.com"
                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:pl-6 group"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border)' }}
              >
                <span
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: 'var(--secondary)', color: 'white' }}
                >
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <div>
                  <h3 className="font-bold text-sm md:text-base text-[var(--text-primary)]">Correo</h3>
                  <p className="text-xs md:text-sm font-semibold" style={{ color: 'var(--secondary)' }}>
                    gavymontez@creaciones.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}