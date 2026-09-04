// contexts/CartContext.jsx
'use client';

import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gavy_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isInitialized && !isLoading) {
      try {
        localStorage.setItem('gavy_cart', JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items, isLoading, isInitialized]);

  // Añadir item al carrito
  const addItem = useCallback((product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, cantidad: quantity }];
    });
  }, []);

  // Eliminar item del carrito
  const removeItem = useCallback((productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  // Actualizar cantidad de un item
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, cantidad: quantity } : item
      )
    );
  }, []);

  // Vaciar carrito completamente
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Verificar si un producto está en el carrito
  const isInCart = useCallback(
    (productId) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  // Obtener cantidad de un producto específico
  const getItemQuantity = useCallback(
    (productId) => {
      const item = items.find((item) => item.id === productId);
      return item ? item.cantidad : 0;
    },
    [items]
  );

  // ===== totalItems = cantidad de productos ÚNICOS =====
  const totalItems = useMemo(() => {
    return items.length;
  }, [items]);

  // Calcular subtotal (sin comisión)
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = parseFloat(
        String(item.precio)
          .replace(/[$,]/g, '')
          .replace(' USD', '')
          .trim()
      );
      return sum + (isNaN(price) ? 0 : price * item.cantidad);
    }, 0);
  }, [items]);

  // Calcular comisión (10%)
  const commission = useMemo(() => {
    return subtotal * 0.1;
  }, [subtotal]);

  // Calcular total (subtotal + comisión)
  const total = useMemo(() => {
    return subtotal + commission;
  }, [subtotal, commission]);

  // Contar productos únicos en el carrito (alias)
  const uniqueItems = useMemo(() => {
    return items.length;
  }, [items]);

  const value = {
    items,
    isLoading,
    isInitialized,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    totalItems,
    subtotal,
    commission,
    total,
    uniqueItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}