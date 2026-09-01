// components/ui/HeroCarousel.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 0,
    title: 'Arte <span>hecho a mano</span>',
    description: 'Descubre nuestras creaciones únicas, tejidas y moldeadas con esencia caribeña desde La Habana.',
    image: '/resources/carrucel/slide1.jpg',
    ctaText: 'Ver catálogo',
    ctaLink: '/catalogo',
    secondaryCta: 'Sobre nosotros',
  },
  {
    id: 1,
    title: 'Pulseras <span>únicas</span>',
    description: 'Hilos de algodón, mostacillas y semillas que cuentan historias.',
    image: '/resources/carrucel/slide2.jpg',
    ctaText: 'Ver pulseras',
    ctaLink: '/catalogo?cat=pulseras',
    secondaryCta: 'Sobre nosotros',
  },
  {
    id: 2,
    title: 'Atrapasueños <span>mágicos</span>',
    description: 'Armoniza tus espacios con nuestros atrapasueños tejidos a mano.',
    image: '/resources/carrucel/slide3.jpg',
    ctaText: 'Ver atrapasueños',
    ctaLink: '/catalogo?cat=atrapasuenos',
    secondaryCta: 'Sobre nosotros',
  },
  {
    id: 3,
    title: 'Figuras <span>de fornai</span>',
    description: 'Esculturas pintadas a mano que capturan la esencia de Cuba.',
    image: '/resources/carrucel/slide4.jpg',
    ctaText: 'Ver figuras',
    ctaLink: '/catalogo?cat=esculturas',
    secondaryCta: 'Sobre nosotros',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index) => {
      setCurrentSlide(index);
      setIsAutoPlaying(true);
    },
    []
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, goToSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }, [currentSlide, goToSlide, totalSlides]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div
            className="carousel-bg"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="carousel-overlay" />
          <div className="hero-content">
            <div className="hero-text">
              <h1 dangerouslySetInnerHTML={{ __html: slide.title }} />
              <p>{slide.description}</p>
              <div className="hero-buttons">
                <Link href={slide.ctaLink} className="btn-primary-hero">
                  <i className="fa-regular fa-rectangle-list"></i> {slide.ctaText}
                </Link>
                <button
                  onClick={() => scrollToSection('sobre-nosotros')}
                  className="btn-outline-hero"
                >
                  {slide.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="carousel-controls">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index);
              handleInteraction();
            }}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => {
          prevSlide();
          handleInteraction();
        }}
        className="carousel-arrow prev"
        aria-label="Slide anterior"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        onClick={() => {
          nextSlide();
          handleInteraction();
        }}
        className="carousel-arrow next"
        aria-label="Siguiente slide"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}