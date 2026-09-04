// lib/supabase-client.js
'use client';

import { createClient } from '@supabase/supabase-js';
import Cookies from 'js-cookie';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cliente de Supabase para el cliente (con cookies)
export const supabaseClient = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
      removeItem: (key) => Cookies.remove(key),
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Guarda el carrito en Supabase
 * @param {string} userId - ID del usuario
 * @param {Array} cartItems - Items del carrito
 * @returns {Promise<Object>} Resultado de la operación
 */
export const syncCartToSupabase = async (userId, cartItems) => {
  try {
    // Eliminar carrito anterior
    const { error: deleteError } = await supabaseClient
      .from('carrito')
      .delete()
      .eq('usuario_id', userId);

    if (deleteError) throw deleteError;

    // Insertar nuevos items
    if (cartItems.length > 0) {
      const itemsToInsert = cartItems.map((item) => ({
        usuario_id: userId,
        producto_id: item.id,
        cantidad: item.cantidad,
      }));

      const { data, error } = await supabaseClient
        .from('carrito')
        .insert(itemsToInsert)
        .select();

      if (error) throw error;
      return { success: true, data };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sincronizando carrito:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene el carrito del usuario desde Supabase
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Items del carrito
 */
export const getCartFromSupabase = async (userId) => {
  try {
    const { data, error } = await supabaseClient
      .from('carrito')
      .select('*, productos(*)')
      .eq('usuario_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error obteniendo carrito:', error);
    return [];
  }
};

export default supabaseClient;