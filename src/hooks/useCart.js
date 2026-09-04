// hooks/useCart.js
'use client';

import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

/**
 * Hook personalizado para acceder al contexto del carrito
 * @returns {Object} Estado y funciones del carrito
 */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }

  return context;
}