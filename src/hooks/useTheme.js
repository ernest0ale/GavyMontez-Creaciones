// hooks/useTheme.js
'use client';

import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Hook personalizado para acceder al contexto del tema
 * @returns {Object} Estado y funciones del tema
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }

  return context;
}