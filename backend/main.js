// js/main.js - Punto de entrada y eventos globales (BACKEND)

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tema
  if (typeof initTheme === 'function') {
    initTheme();
  }

  // Configurar toggle de tema
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle && typeof toggleTheme === 'function') {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Renderizar productos destacados en index.html
  if (document.getElementById('featured-grid') && typeof renderFeatured === 'function') {
    if (typeof productos !== 'undefined') {
      renderFeatured();
    } else {
      // Cargar data.js y luego renderizar
      const script = document.createElement('script');
      script.src = 'backend/data.js';
      script.onload = function() {
        if (typeof renderFeatured === 'function') {
          renderFeatured();
        }
      };
      document.head.appendChild(script);
    }
  }

  // Renderizar catálogo en catalogo.html
  if (document.getElementById('catalogo-grid') && typeof renderCatalogo === 'function') {
    if (typeof productos !== 'undefined') {
      renderCatalogo('todos');
    } else {
      const script = document.createElement('script');
      script.src = 'backend/data.js';
      script.onload = function() {
        if (typeof renderCatalogo === 'function') {
          renderCatalogo('todos');
        }
      };
      document.head.appendChild(script);
    }
  }
});