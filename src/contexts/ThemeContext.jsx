// contexts/ThemeContext.jsx
'use client';

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar tema desde localStorage al inicio
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('gavy_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Aplicar tema al DOM y guardar en localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('gavy_theme', theme);
        if (theme === 'dark') {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      } catch (error) {
        console.error('Error saving theme to localStorage:', error);
      }
    }
  }, [theme, isLoading]);

  // Alternar entre tema claro y oscuro
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // Establecer tema específico
  const setThemeMode = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  }, []);

  // Determinar si el tema actual es oscuro
  const isDark = useMemo(() => theme === 'dark', [theme]);

  const value = {
    theme,
    isDark,
    isLoading,
    toggleTheme,
    setThemeMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}