// utils.js - Funciones utilitarias

/**
 * Formatea un precio para mostrarlo correctamente
 */
export const formatPrice = (price) => {
  if (typeof price === 'string') return price;
  return `$${price.toFixed(0)}`;
};

/**
 * Extrae el valor numérico de un precio en string
 */
export const parsePrice = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  return parseFloat(priceStr.replace('$', '').replace('.', '').trim()) || 0;
};

/**
 * Calcula el total del carrito
 */
export const calculateCartTotal = (items) => {
  return items.reduce((sum, item) => {
    const price = parsePrice(item.precio);
    return sum + price * item.cantidad;
  }, 0);
};

/**
 * Genera un mensaje para WhatsApp con los items del carrito
 */
export const generateWhatsAppMessage = (items, total) => {
  let mensaje = 'Hola, vengo de la página web gavymontez-creaciones y estoy interesado en comprar estos artículos:\n\n';
  items.forEach(item => {
    mensaje += `·${item.nombre} x ${item.cantidad}\n`;
  });
  mensaje += `\nEl precio total sería $${total.toFixed(0)}.`;
  return mensaje;
};

/**
 * Guarda un producto en el historial de vistos
 */
export const guardarVisto = (productoId) => {
  try {
    let vistos = JSON.parse(localStorage.getItem('gavy_vistos') || '[]');
    vistos = vistos.filter(id => id !== productoId);
    vistos.unshift(productoId);
    if (vistos.length > 10) vistos.pop();
    localStorage.setItem('gavy_vistos', JSON.stringify(vistos));
  } catch (e) {
    // Ignorar errores de localStorage
  }
};

/**
 * Obtiene los productos vistos
 */
export const obtenerVistos = () => {
  try {
    return JSON.parse(localStorage.getItem('gavy_vistos') || '[]');
  } catch (e) {
    return [];
  }
};

/**
 * Debounce para búsquedas
 */
export const debounce = (func, wait) => {
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
 * Obtiene el icono de una categoría
 */
export const getCategoryIcon = (categoria) => {
  const icons = {
    atrapasuenos: 'fa-solid fa-feather-pointed',
    collares: 'fa-solid fa-gem',
    aretes: 'fa-regular fa-circle',
    pulseras: 'fa-solid fa-hand-sparkles',
    esculturas: 'fa-solid fa-palette',
    sombreros: 'fa-solid fa-hat-cowboy',
    combos: 'fa-solid fa-gift',
  };
  return icons[categoria] || 'fa-solid fa-tag';
};

/**
 * Obtiene el nombre legible de una categoría
 */
export const getCategoryLabel = (categoria) => {
  const labels = {
    atrapasuenos: 'Atrapasueños',
    collares: 'Collares',
    aretes: 'Aretes',
    pulseras: 'Pulseras',
    esculturas: 'Esculturas',
    sombreros: 'Sombreros',
    combos: 'Combos',
  };
  return labels[categoria] || categoria;
};