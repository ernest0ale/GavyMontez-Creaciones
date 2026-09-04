// utils/constants.js

// Categorías del catálogo
export const CATEGORIAS = {
  TODOS: 'todos',
  ATRAPASUENOS: 'atrapasuenos',
  COLLARES: 'collares',
  ARETES: 'aretes',
  PULSERAS: 'pulseras',
  ESCULTURAS: 'esculturas',
  SOMBREROS: 'sombreros',
  COMBOS: 'combos',
};

// Etiquetas de categorías
export const CATEGORIA_LABELS = {
  [CATEGORIAS.TODOS]: 'Todos',
  [CATEGORIAS.ATRAPASUENOS]: 'Atrapasueños',
  [CATEGORIAS.COLLARES]: 'Collares',
  [CATEGORIAS.ARETES]: 'Aretes',
  [CATEGORIAS.PULSERAS]: 'Pulseras',
  [CATEGORIAS.ESCULTURAS]: 'Esculturas',
  [CATEGORIAS.SOMBREROS]: 'Sombreros',
  [CATEGORIAS.COMBOS]: 'Combos',
};

// Íconos de categorías
export const CATEGORIA_ICONS = {
  [CATEGORIAS.ATRAPASUENOS]: 'fa-solid fa-feather-pointed',
  [CATEGORIAS.COLLARES]: 'fa-solid fa-gem',
  [CATEGORIAS.ARETES]: 'fa-regular fa-circle',
  [CATEGORIAS.PULSERAS]: 'fa-solid fa-hand-sparkles',
  [CATEGORIAS.ESCULTURAS]: 'fa-solid fa-palette',
  [CATEGORIAS.SOMBREROS]: 'fa-solid fa-hat-cowboy',
  [CATEGORIAS.COMBOS]: 'fa-solid fa-gift',
};

// Tipos de productos
export const TIPOS = {
  TODOS: 'todos',
  CLASICO: 'clasico',
  ESPIRITUAL: 'espiritual',
};

// Etiquetas de tipos
export const TIPO_LABELS = {
  [TIPOS.TODOS]: 'Todos',
  [TIPOS.CLASICO]: 'Clásicos (CUP)',
  [TIPOS.ESPIRITUAL]: 'Especiales (USD)',
};

// Número de items por página
export const ITEMS_PER_PAGE = 12;

// Número de items destacados en el home
export const FEATURED_COUNT = 4;

// Porcentaje de comisión
export const COMMISSION_PERCENTAGE = 0.1;

// Número máximo de resultados de búsqueda
export const MAX_SEARCH_RESULTS = 8;

// Claves de localStorage
export const STORAGE_KEYS = {
  CART: 'gavy_cart',
  THEME: 'gavy_theme',
  FAVORITES: 'gavy_favorites',
  VIEWS: 'gavy_vistos',
};

// URLs
export const URLS = {
  WHATSAPP: 'https://wa.me/5358481876',
  INSTAGRAM: 'https://instagram.com/gavymontez_creaciones',
  EMAIL: 'mailto:gavymontez@creaciones.com',
};

// Metadatos del sitio
export const SITE_METADATA = {
  title: 'GavyMontez Creaciones',
  description: 'Arte con intención y alma. Creaciones únicas hechas a mano en La Habana.',
  keywords: 'artesanía, atrapasueños, pulseras, collares, esculturas, Cuba, arte cubano',
  author: 'GavyMontez Creaciones',
  siteUrl: 'https://gavymontez-creaciones.com',
};