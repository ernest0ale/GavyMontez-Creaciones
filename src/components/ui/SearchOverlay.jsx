// src/components/ui/SearchOverlay.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { buscarProductos } from '../../data/productos';

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        const found = buscarProductos(searchTerm);
        setResults(found.slice(0, 8));
        setIsLoading(false);
      }, 200);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onClose();
      router.push(`/busqueda?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (productId) => {
    onClose();
    router.push(`/detalles/${productId}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`search-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-container">
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar artículos..."
            className="search-input"
            autoComplete="off"
          />
          <button onClick={handleSearch} className="search-submit-btn" aria-label="Buscar">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button onClick={onClose} className="search-close-btn" aria-label="Cerrar búsqueda">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className={`search-results ${results.length > 0 || isLoading ? 'active' : ''}`}>
          {isLoading ? (
            <div className="search-result-empty">
              <i className="fa-solid fa-spinner fa-spin"></i>
              <span>Buscando...</span>
            </div>
          ) : results.length === 0 && searchTerm.length >= 2 ? (
            <div className="search-result-empty">
              <i className="fa-regular fa-face-frown"></i>
              <span>No se encontraron artículos</span>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => handleResultClick(product.id)}
              >
                <Image
                  src={product.img}
                  alt={product.nombre}
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    objectFit: 'cover', 
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--hero-bg)',
                    flexShrink: 0
                  }}
                  width={44}
                  height={44}
                />
                <div className="search-result-info">
                  <div className="search-result-name">{product.nombre}</div>
                  <div className="search-result-meta">
                    <span className="search-result-categoria">{product.categoria}</span>
                    <span className="search-result-precio">{product.precio}</span>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-[var(--text-primary)] opacity-30 text-sm"></i>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}