// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables de entorno existan
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Variables de entorno de Supabase no configuradas. ' +
    'Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local'
  );
}

// Cliente de Supabase para el frontend
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Obtiene la sesión actual del usuario
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Error obteniendo sesión:', error);
    return null;
  }
};

/**
 * Obtiene el usuario actual
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    return null;
  }
};

/**
 * Inicia sesión con email y contraseña
 */
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error iniciando sesión:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Cierra la sesión del usuario
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Registra un nuevo usuario
 */
export const signUp = async (email, password, metadata = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error registrando usuario:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene todos los productos desde Supabase
 */
export const getProductos = async () => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return [];
  }
};

/**
 * Obtiene un producto por su ID
 */
export const getProductoById = async (id) => {
  try {
    const { data, error } = await supabase
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

export default supabase;