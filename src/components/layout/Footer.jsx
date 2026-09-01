// components/layout/Footer.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer-transition" />
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-columns">
            {/* Columna 1 - Navegación */}
            <div className="footer-col footer-col-1">
              <h3 className="footer-title">Navegación</h3>
              <ul className="footer-links">
                <li>
                  <Link href="/" className="footer-link">
                    <i className="fa-solid fa-house"></i> Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/novedades" className="footer-link">
                    <i className="fa-regular fa-star"></i> Novedades
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo" className="footer-link">
                    <i className="fa-regular fa-rectangle-list"></i> Catálogo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 2 - Logo y Redes Sociales */}
            <div className="footer-col footer-col-2">
              <div className="footer-logo-block">
                <Image
                  src="/resources/gavyMontezCreaciones_aro_darkLogo.png"
                  alt="GavyMontez Creaciones"
                  className="footer-logo-img"
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <span className="footer-logo-text">GavyMontez</span>
                <span className="footer-logo-sub">Creaciones</span>
              </div>
              <p className="footer-description">
                Arte con intención y alma.
              </p>
              <div className="footer-social">
                <a
                  href="https://instagram.com/gavymontez_creaciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://wa.me/5358481876"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  aria-label="WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* Columna 3 - Información */}
            <div className="footer-col footer-col-3">
              <h3 className="footer-title">Información</h3>
              <ul className="footer-links">
                <li>
                  <Link href="/terminos" className="footer-link">
                    <i className="fa-solid fa-file-contract"></i> Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/politica-envios" className="footer-link">
                    <i className="fa-solid fa-truck"></i> Política de Envíos
                  </Link>
                </li>
                <li>
                  <Link href="/preguntas-frecuentes" className="footer-link">
                    <i className="fa-regular fa-circle-question"></i> Preguntas Frecuentes
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} GavyMontez Creaciones · Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}