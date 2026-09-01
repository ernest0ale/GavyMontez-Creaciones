// utils/validators.js

/**
 * Valida que un email tenga formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida que un teléfono tenga formato correcto (cubano)
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} true si es válido
 */
export const isValidCubanPhone = (phone) => {
  const regex = /^(5[3-9])\d{7}$/;
  return regex.test(phone.replace(/[+\s]/g, ''));
};

/**
 * Valida que un texto tenga longitud mínima
 * @param {string} text - Texto a validar
 * @param {number} minLength - Longitud mínima
 * @returns {boolean} true si es válido
 */
export const hasMinLength = (text, minLength = 2) => {
  return text && text.trim().length >= minLength;
};

/**
 * Valida que un texto tenga longitud máxima
 * @param {string} text - Texto a validar
 * @param {number} maxLength - Longitud máxima
 * @returns {boolean} true si es válido
 */
export const hasMaxLength = (text, maxLength = 500) => {
  return text && text.trim().length <= maxLength;
};

/**
 * Valida que un campo sea requerido
 * @param {any} value - Valor a validar
 * @returns {boolean} true si tiene valor
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Valida un número entero positivo
 * @param {number} value - Valor a validar
 * @returns {boolean} true si es válido
 */
export const isPositiveInteger = (value) => {
  return Number.isInteger(value) && value > 0;
};

/**
 * Valida un número decimal positivo
 * @param {number} value - Valor a validar
 * @returns {boolean} true si es válido
 */
export const isPositiveNumber = (value) => {
  return typeof value === 'number' && value > 0 && !isNaN(value);
};

/**
 * Valida un rango de números
 * @param {number} value - Valor a validar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {boolean} true si está en el rango
 */
export const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Valida que un producto tenga todos los campos requeridos
 * @param {Object} product - Producto a validar
 * @returns {Object} Resultado de la validación
 */
export const validateProduct = (product) => {
  const errors = [];

  if (!product.nombre || product.nombre.trim().length < 2) {
    errors.push('El nombre del producto es requerido (mínimo 2 caracteres)');
  }

  if (!product.precio) {
    errors.push('El precio del producto es requerido');
  }

  if (!product.categoria) {
    errors.push('La categoría del producto es requerida');
  }

  if (!product.tipo) {
    errors.push('El tipo del producto es requerido');
  }

  if (!product.img) {
    errors.push('La imagen del producto es requerida');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valida que un carrito tenga items válidos
 * @param {Array} cartItems - Items del carrito
 * @returns {Object} Resultado de la validación
 */
export const validateCart = (cartItems) => {
  const errors = [];

  if (!Array.isArray(cartItems)) {
    errors.push('El carrito debe ser un array');
    return { isValid: false, errors };
  }

  cartItems.forEach((item, index) => {
    if (!item.id) {
      errors.push(`Item ${index + 1}: ID de producto requerido`);
    }
    if (!item.cantidad || item.cantidad < 1) {
      errors.push(`Item ${index + 1}: Cantidad debe ser mayor a 0`);
    }
    if (!item.precio) {
      errors.push(`Item ${index + 1}: Precio requerido`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};