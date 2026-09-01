// hooks/useSearch.js
'use client';

import { useState, useCallback, useMemo } from 'react';
import { buscarProductos } from '../data/productos';

/**
 * Hook personalizado para manejar la búsqueda de productos
 * @param {number} initialResults - Cantidad inicial de resultados a mostrar
 * @returns {Object} Estado y funciones de búsqueda
 */
export function useSearch(initialResults = 8) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Realizar búsqueda
  const performSearch = useCallback(
    (term) => {
      setIsSearching(true);
      setSearchTerm(term);

      // Simular delay para dar feedback visual
      setTimeout(() => {
        const found = buscarProductos(term);
        setResults(found.slice(0, initialResults));
        setShowResults(term.length > 0);
        setIsSearching(false);
      }, 150);
    },
    [initialResults]
  );

  // Limpiar búsqueda
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setResults([]);
    setShowResults(false);
    setIsSearching(false);
  }, []);

  // Obtener conteo de resultados
  const resultCount = useMemo(() => results.length, [results]);

  // Verificar si hay resultados
  const hasResults = useMemo(() => results.length > 0, [results]);

  return {
    searchTerm,
    results,
    isSearching,
    showResults,
    resultCount,
    hasResults,
    performSearch,
    clearSearch,
  };
}