// src/components/layout/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import SearchOverlay from '../ui/SearchOverlay';
import CartOverlay from '../ui/CartOverlay';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  const isActive = (path) => {
    if (path === '/') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-inner">
            {/* Botón menú móvil con la clase correcta */}
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-btn"
              aria-label="Abrir menú"
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <Link href="/" className="header-logo">
              <Image
                id="headerLogo"
                src={
                  theme === 'dark'
                    ? '/resources/gavyMontezCreaciones_darkLogo.png'
                    : '/resources/gavyMontezCreaciones_lightLogo.png'
                }
                alt="GavyMontez Creaciones"
                style={{ height: '60px', width: 'auto' }}
                width={64}
                height={64}
                priority
              />
              <div className="logo-text-group">
                <span className="logo-main">GavyMontez</span>
                <span className="logo-sub">Creaciones</span>
              </div>
            </Link>

            <nav className="nav-desktop">
              <Link
                href="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                <i className="fa-solid fa-house"></i> Inicio
              </Link>
              <Link
                href="/novedades"
                className={`nav-link ${isActive('/novedades') ? 'active' : ''}`}
              >
                <i className="fa-regular fa-star"></i> Novedades
              </Link>
              <Link
                href="/catalogo"
                className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`}
              >
                <i className="fa-regular fa-rectangle-list"></i> Catálogo
              </Link>
            </nav>

            <div className="header-actions">
              <button
                onClick={toggleSearch}
                className="header-btn"
                aria-label="Buscar"
              >
                <i className="fa-solid fa-search header-btn-icon"></i>
              </button>

              <button
                onClick={toggleTheme}
                className="header-btn header-btn-accent"
                aria-label="Cambiar tema"
              >
                <i className={`fa-regular ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} header-btn-icon`}></i>
              </button>

              <div className="cart-icon-wrapper" onClick={toggleCart}>
                <button className="header-btn" aria-label="Carrito">
                  <i className="fa-solid fa-cart-shopping header-btn-icon"></i>
                </button>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </div>
            </div>
          </div>

          <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <Link href="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
              <i className="fa-solid fa-house"></i> Inicio
            </Link>
            <Link href="/novedades" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
              <i className="fa-regular fa-star"></i> Novedades
            </Link>
            <Link href="/catalogo" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>
              <i className="fa-regular fa-rectangle-list"></i> Catálogo
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartOverlay isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}