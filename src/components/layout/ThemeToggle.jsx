// components/layout/ThemeToggle.jsx
'use client';

import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${className}`}
      style={{
        backgroundColor: 'var(--surface)',
        color: 'var(--accent)',
        border: '1px solid var(--border)',
      }}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <i className={`fa-regular ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
    </button>
  );
}