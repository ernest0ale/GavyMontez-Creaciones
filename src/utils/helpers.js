// utils/helpers.js

/**
 * Formatea un precio para mostrarlo con el símbolo de moneda
 */
export const formatPrice = (price, currency = '$') => {
  if (!price) return `${currency}0`;
  const num = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
  if (isNaN(num)) return `${currency}0`;
  return `${currency}${num.toFixed(0)}`;
};

/**
 * Formatea un precio con separador de miles
 */
export const formatPriceWithThousands = (price, currency = '$') => {
  if (!price) return `${currency}0`;
  const num = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
  if (isNaN(num)) return `${currency}0`;
  return `${currency}${num.toLocaleString('es-ES')}`;
};

/**
 * Genera un slug a partir de un texto
 */
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

/**
 * Obtiene el nombre de la categoría a partir de su clave
 */
export const getCategoryLabel = (key) => {
  const labels = {
    atrapasuenos: 'Atrapasueños',
    collares: 'Collares',
    aretes: 'Aretes',
    pulseras: 'Pulseras',
    esculturas: 'Esculturas',
    sombreros: 'Sombreros',
    combos: 'Combos',
  };
  return labels[key] || key || 'Categoría';
};

/**
 * Obtiene el ícono de la categoría a partir de su clave
 */
export const getCategoryIcon = (key) => {
  const icons = {
    atrapasuenos: 'fa-solid fa-feather-pointed',
    collares: 'fa-solid fa-gem',
    aretes: 'fa-regular fa-circle',
    pulseras: 'fa-solid fa-hand-sparkles',
    esculturas: 'fa-solid fa-palette',
    sombreros: 'fa-solid fa-hat-cowboy',
    combos: 'fa-solid fa-gift',
  };
  return icons[key] || 'fa-solid fa-tag';
};

/**
 * Trunca un texto a una longitud máxima
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitaliza la primera letra de un texto
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Convierte un texto a formato título (cada palabra capitalizada)
 */
export const toTitleCase = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Obtiene las categorías disponibles con sus conteos
 */
export const getCategoriesWithCount = (productos) => {
  const categories = {};
  productos.forEach((p) => {
    categories[p.categoria] = (categories[p.categoria] || 0) + 1;
  });
  return categories;
};

/**
 * Filtra productos por categoría y tipo
 */
export const filterProducts = (productos, filters = {}) => {
  let filtered = [...productos];

  if (filters.categoria && filters.categoria !== 'todos') {
    filtered = filtered.filter((p) => p.categoria === filters.categoria);
  }

  if (filters.tipo && filters.tipo !== 'todos') {
    filtered = filtered.filter((p) => p.tipo === filters.tipo);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchLower) ||
        p.categoria.toLowerCase().includes(searchLower) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(searchLower))
    );
  }

  if (filters.destacado) {
    filtered = filtered.filter((p) => p.destacado);
  }

  return filtered;
};

/**
 * Ordena productos por diferentes criterios
 */
export const sortProducts = (productos, orderBy = 'id', ascending = false) => {
  const sorted = [...productos];
  sorted.sort((a, b) => {
    let valA = a[orderBy];
    let valB = b[orderBy];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return ascending ? valA - valB : valB - valA;
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return 0;
  });
  return sorted;
};

/**
 * Agrupa productos por categoría
 */
export const groupProductsByCategory = (productos) => {
  const grouped = {};
  productos.forEach((p) => {
    if (!grouped[p.categoria]) {
      grouped[p.categoria] = [];
    }
    grouped[p.categoria].push(p);
  });
  return grouped;
};

/**
 * Calcula el total de un carrito
 */
export const calculateCartTotals = (cartItems, commission = 0.1) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(
      String(item.precio)
        .replace(/[$,]/g, '')
        .replace(' USD', '')
        .trim()
    );
    return sum + (isNaN(price) ? 0 : price * item.cantidad);
  }, 0);

  const commissionAmount = subtotal * commission;
  const total = subtotal + commissionAmount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  return {
    subtotal,
    commissionAmount,
    total,
    itemCount,
    uniqueItems: cartItems.length,
  };
};

/**
 * Genera un ID único simple
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Detecta si el dispositivo es móvil
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Detecta si el dispositivo es tablet
 */
export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Detecta si el dispositivo es desktop
 */
export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

/**
 * Obtiene el nombre del día de la semana
 */
export const getDayName = (date, locale = 'es-ES') => {
  const d = new Date(date);
  return d.toLocaleDateString(locale, { weekday: 'long' });
};

/**
 * Obtiene el nombre del mes
 */
export const getMonthName = (date, locale = 'es-ES') => {
  const d = new Date(date);
  return d.toLocaleDateString(locale, { month: 'long' });
};

/**
 * Formatea una fecha
 */
export const formatDate = (date, format = 'dd/MM/yyyy', locale = 'es-ES') => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year)
    .replace('HH', hours)
    .replace('mm', minutes);
};

/**
 * Debounce para limitar ejecuciones de funciones
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle para limitar ejecuciones de funciones
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Guarda un producto en el historial de vistos (localStorage)
 */
export const guardarVisto = (productoId) => {
  try {
    if (typeof window === 'undefined') return;
    let vistos = JSON.parse(localStorage.getItem('gavy_vistos') || '[]');
    vistos = vistos.filter(id => id !== productoId);
    vistos.unshift(productoId);
    if (vistos.length > 10) vistos.pop();
    localStorage.setItem('gavy_vistos', JSON.stringify(vistos));
  } catch (e) {
    // ignore
  }
};

/**
 * Obtiene el historial de productos vistos
 */
export const obtenerVistos = () => {
  try {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('gavy_vistos') || '[]');
  } catch (e) {
    return [];
  }
};

/**
 * Obtiene los productos vistos con sus datos completos
 */
export const getProductosVistos = (productos) => {
  const ids = obtenerVistos();
  return ids.map(id => productos.find(p => p.id === id)).filter(Boolean);
};