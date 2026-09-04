// app/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroCarousel from '../components/ui/HeroCarousel';
import ProductGrid from '../components/ui/ProductGrid';
import PageTitle from '../components/ui/PageTitle';
import { getProductosDestacados, getProductosByCategoria } from '../data/productos';
import { getProductosVistos } from '../utils/helpers';

export default function HomePage() {
  const [destacados, setDestacados] = useState([]);
  const [combos, setCombos] = useState([]);
  const [vistos, setVistos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allDestacados = getProductosDestacados();
      const destacadosData = allDestacados.filter(p => p.categoria !== 'combos');
      const combosData = getProductosByCategoria('combos');
      const vistosData = getProductosVistos(4);
      
      setDestacados(destacadosData);
      setCombos(combosData);
      setVistos(vistosData);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    { icon: 'fa-solid fa-feather-pointed', title: 'Atrapasueños', desc: 'Tejidos a mano con esencia cubana' },
    { icon: 'fa-solid fa-gem', title: 'Collares', desc: 'Piezas únicas con semillas y cuentas' },
    { icon: 'fa-solid fa-hand-sparkles', title: 'Pulseras', desc: 'Hilos y semillas con historia' },
    { icon: 'fa-solid fa-palette', title: 'Figuras de fornai', desc: 'Esculturas pintadas a mano' },
    { icon: 'fa-solid fa-handshake', title: 'Trato directo', desc: 'Atención personalizada' },
    { icon: 'fa-solid fa-truck', title: 'Envíos seguros', desc: 'Entregas en toda Cuba' },
  ];

  return (
    <>
      <PageTitle title="Inicio" />

      <HeroCarousel />

      <section
        id="sobre-nosotros"
        className="py-12 md:py-16 border-y"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center space-y-5 md:space-y-6">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[var(--text-primary)]">
            El valor de lo hecho a mano con amor
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-[var(--text-primary)] opacity-80">
            En el taller de GavyMontez Creaciones, seleccionamos hilos de algodón, maderas nobles y pigmentos naturales. Cada creación es un reflejo de nuestra pasión por la artesanía cubana, con esmero y cariño. No hay dos iguales.
          </p>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <span className="icon"><i className={service.icon}></i></span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {combos.length > 0 && (
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
            <div>
              <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--accent)' }}>
                Ofertas especiales
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
                Combos exclusivos
              </h2>
            </div>
            <Link href="/catalogo?cat=combos" className="featured-link">
              Ver combos <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <ProductGrid products={combos} />
        </section>
      )}

      <section className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="featured-header">
          <div className="featured-title-group">
            <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--accent)' }}>
              Favoritos del taller
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
              Creaciones destacadas
            </h2>
          </div>
          <Link href="/catalogo" className="featured-link">
            Ver todo el catálogo <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-3xl" style={{ color: 'var(--accent)' }}></i>
          </div>
        ) : destacados.length > 0 ? (
          <ProductGrid products={destacados} />
        ) : (
          <div className="text-center py-12 text-[var(--text-primary)] opacity-60">
            <p>No hay productos destacados disponibles</p>
          </div>
        )}

        <div className="mt-12 md:mt-16 text-center">
          <Link href="/catalogo" className="btn-catalogo-completo">
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {!loading && vistos.length > 0 && (
        <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
            <div>
              <span className="uppercase tracking-widest text-xs font-bold flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                <i className="fa-regular fa-eye"></i> Historial
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
                Recientemente vistos
              </h2>
              <p className="text-sm text-[var(--text-primary)] opacity-60 mt-1">
                Piezas que has explorado recientemente
              </p>
            </div>
          </div>
          <ProductGrid products={vistos} />
        </section>
      )}
    </>
  );
}