// lib/supabase-server.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validar que las variables de entorno existan
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    '⚠️ Variables de entorno de Supabase (server) no configuradas. ' +
    'Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local'
  );
}

// Cliente de Supabase para el servidor (con service role key)
export const supabaseServer = createClient(
  supabaseUrl || '',
  supabaseServiceKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Obtiene todos los productos desde Supabase (Server Side)
 * @param {Object} filters - Filtros a aplicar
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductsFromDB = async (filters = {}) => {
  try {
    let query = supabaseServer.from('productos').select('*');

    // Aplicar filtros
    if (filters.categoria && filters.categoria !== 'todos') {
      query = query.eq('categoria', filters.categoria);
    }

    if (filters.tipo && filters.tipo !== 'todos') {
      query = query.eq('tipo', filters.tipo);
    }

    if (filters.destacado) {
      query = query.eq('destacado', true);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.orderBy) {
      query = query.order(filters.orderBy, { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
};

/**
 * Obtiene un producto por su ID (Server Side)
 * @param {number} id - ID del producto
 * @returns {Promise<Object|null>} Producto o null
 */
export const getProductByIdFromDB = async (id) => {
  try {
    const { data, error } = await supabaseServer
      .from('productos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error obteniendo producto ${id}:`, error);
    return null;
  }
};

export default supabaseServer;