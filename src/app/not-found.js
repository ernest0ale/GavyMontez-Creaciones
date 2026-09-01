// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="text-7xl md:text-9xl font-serif font-bold opacity-15" style={{ color: 'var(--accent)' }}>
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mt-4 text-[var(--text-primary)]">
          Página no encontrada
        </h1>
        <p className="mt-3 text-sm md:text-base text-[var(--text-primary)] opacity-70">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <p className="mt-1 text-sm text-[var(--text-primary)] opacity-50">
          Quizás puedas encontrar lo que buscas en nuestro catálogo.
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center">
          <Link
            href="/"
            className="text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <i className="fa-solid fa-house"></i> Volver al inicio
          </Link>
          <Link
            href="/catalogo"
            className="px-5 md:px-6 py-2.5 md:py-3 rounded-full border transition-all hover:bg-opacity-10"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <i className="fa-regular fa-rectangle-list"></i> Ver catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}