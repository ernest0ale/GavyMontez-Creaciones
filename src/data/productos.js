// data/productos.js
// Datos de productos del catálogo con Nicho Espiritual

export const productos = [
  // ==================== ARTÍCULOS CLÁSICOS (CUP) ====================
  {
    id: 1,
    nombre: 'Pulsera Maya',
    precio: '$15.000',
    tipo: 'clasico',
    categoria: 'pulseras',
    destacado: true,
    img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Hilo de algodón natural, mostacillas',
    tamano: '18 cm ajustable',
    descripcion: 'Inspirada en textilerías tradicionales.',
    significado: null,
  },
  {
    id: 2,
    nombre: 'Atrapasueños Bosque Sagrado',
    precio: '$28.500',
    tipo: 'clasico',
    categoria: 'atrapasuenos',
    destacado: true,
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Aro de sauce, hilos de cáñamo, plumas éticas',
    tamano: 'Diámetro 25 cm',
    descripcion: 'Armoniza ambientes, tejido tradicional Ojibwa.',
    significado: null,
  },
  {
    id: 3,
    nombre: 'Atrapasueños Brisa de Verano',
    precio: '$24.000',
    tipo: 'clasico',
    categoria: 'atrapasuenos',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1594498653385-d527259017ef?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1594498653385-d527259017ef?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Bambú, encaje de algodón reciclado, amatista',
    tamano: '20 cm diámetro',
    descripcion: 'Liviano, ideal para espacios luminosos.',
    significado: null,
  },
  {
    id: 4,
    nombre: 'Escultura Flor de Cactus',
    precio: '$45.000',
    tipo: 'clasico',
    categoria: 'esculturas',
    destacado: true,
    img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Arcilla polimérica, base de madera',
    tamano: 'Alto 22 cm',
    descripcion: 'Escultura única pintada a mano.',
    significado: null,
  },
  {
    id: 5,
    nombre: 'Sombrero Universitario del Arte',
    precio: '$35.000',
    tipo: 'clasico',
    categoria: 'sombreros',
    destacado: true,
    img: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Fieltro de lana premium, pintura textil',
    tamano: 'Talla M (57-58cm)',
    descripcion: 'Diseño exclusivo pintado a mano.',
    significado: null,
  },
  {
    id: 6,
    nombre: 'Pulsera Tierra',
    precio: '$12.000',
    tipo: 'clasico',
    categoria: 'pulseras',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Cuentas de terracota, yute',
    tamano: 'Ajustable 15-22cm',
    descripcion: 'Rústica, textura artesanal.',
    significado: null,
  },
  {
    id: 7,
    nombre: 'Sombrero de Paja Atardecer',
    precio: '$39.000',
    tipo: 'clasico',
    categoria: 'sombreros',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Paja toquilla tejida, tintes naturales',
    tamano: 'Talla L (59-60cm)',
    descripcion: 'Degradado en tonos terracota.',
    significado: null,
  },
  {
    id: 8,
    nombre: 'Escultura Pequeña Madre Tierra',
    precio: '$48.000',
    tipo: 'clasico',
    categoria: 'esculturas',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Gres esmaltado, cuarzo blanco',
    tamano: 'Alto 15 cm',
    descripcion: 'Figura orgánica, celebra la tierra.',
    significado: null,
  },
  {
    id: 9,
    nombre: 'Pulsera de Semillas y Jade',
    precio: '$18.500',
    tipo: 'clasico',
    categoria: 'pulseras',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Jade patagónico, semillas huayruro',
    tamano: 'Ajustable',
    descripcion: 'Amuleto de protección.',
    significado: null,
  },
  {
    id: 10,
    nombre: 'Atrapasueños Guardián Nocturno',
    precio: '$32.000',
    tipo: 'clasico',
    categoria: 'atrapasuenos',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Sauce negro, obsidiana',
    tamano: '30 cm diámetro',
    descripcion: 'Energía protectora.',
    significado: null,
  },
  {
    id: 11,
    nombre: 'Jarrón Pintado Río de Barro',
    precio: '$55.000',
    tipo: 'clasico',
    categoria: 'esculturas',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Cerámica cocida, óxidos',
    tamano: 'Alto 28 cm',
    descripcion: 'Inspirado en ríos.',
    significado: null,
  },
  {
    id: 12,
    nombre: 'Sombrero Universitario de Gala',
    precio: '$42.000',
    tipo: 'clasico',
    categoria: 'sombreros',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Fieltro, cinta de raso',
    tamano: 'Talla M',
    descripcion: 'Elegante bordado a mano.',
    significado: null,
  },

  // ==================== EDICIÓN ESPECIAL - ESPIRITUAL (USD) ====================
  {
    id: 13,
    nombre: 'Amuleto de Protección Lunar',
    precio: '$25.00 USD',
    tipo: 'espiritual',
    categoria: 'pulseras',
    destacado: true,
    img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Cristal de Luna, Hilo de Seda, Plata',
    tamano: 'Ajustable',
    descripcion:
      'Amuleto de protección y conexión con la energía lunar, para atraer la intuición y la calma.',
    significado: {
      titulo: 'Significado de los Materiales',
      items: [
        '**Cristal de Luna**: Piedra de la intuición y la conexión espiritual. Ayuda a equilibrar las emociones y a conectar con el ciclo natural de la vida.',
        '**Hilo de Seda**: Simboliza la pureza y la conexión con lo divino. Se utiliza para tejer los sueños y las intenciones.',
        '**Plata**: Metal de la luna, asociado con la protección, la claridad mental y la conexión con el mundo espiritual.',
      ],
    },
  },
  {
    id: 14,
    nombre: 'Atrapasueños de la Cosmovisión Andina',
    precio: '$45.00 USD',
    tipo: 'espiritual',
    categoria: 'atrapasuenos',
    destacado: true,
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Aro de madera de algarrobo, plumas de cóndor (éticas), hilos de colores',
    tamano: 'Diámetro 30 cm',
    descripcion:
      'Inspirado en la cosmovisión andina, este atrapasueños protege y atrae la sabiduría de los ancestros.',
    significado: {
      titulo: 'Significado de los Materiales Andinos',
      items: [
        '**Madera de Algarrobo**: Árbol sagrado de los Andes, simboliza la conexión con la tierra y los ancestros. Su madera es protectora y da fuerza.',
        '**Plumas de Cóndor (éticas)**: El cóndor es el mensajero de los dioses en la cosmovisión andina. Sus plumas traen sabiduría, claridad y conexión espiritual.',
        '**Hilos de Colores**: Cada color representa una dirección sagrada: rojo (sur), azul (norte), verde (este), amarillo (oeste). Tejen el equilibrio cósmico.',
      ],
    },
  },
  {
    id: 15,
    nombre: 'Escultura del Sol y la Luna',
    precio: '$60.00 USD',
    tipo: 'espiritual',
    categoria: 'esculturas',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Cerámica, pintura al óleo, esmalte',
    tamano: 'Alto 20 cm',
    descripcion:
      'Figura que representa el equilibrio cósmico entre el sol y la luna, ideal para espacios de meditación.',
    significado: {
      titulo: 'Simbolismo del Sol y la Luna',
      items: [
        '**El Sol**: Representa la fuerza vital, la energía masculina, la claridad y la acción. Ilumina el camino y da poder.',
        '**La Luna**: Simboliza la intuición, la energía femenina, los ciclos y la conexión con el mundo interior.',
        '**El Equilibrio**: La unión de ambos representa la armonía perfecta entre lo consciente y lo inconsciente, lo activo y lo receptivo.',
      ],
    },
  },
  {
    id: 16,
    nombre: 'Pulsera de los 7 Chakras',
    precio: '$30.00 USD',
    tipo: 'espiritual',
    categoria: 'pulseras',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Piedras semipreciosas (amatista, cuarzo, citrino, etc.), hilo elástico',
    tamano: 'Ajustable',
    descripcion:
      'Pulsera con las 7 piedras de los chakras principales, para equilibrar y armonizar la energía vital.',
    significado: {
      titulo: 'Significado de los 7 Chakras',
      items: [
        '**Cuarzo Rojo / Jaspe**: Chakra Raíz (Muladhara). Conexión con la tierra, estabilidad y seguridad.',
        '**Cornalina / Ágata Naranja**: Chakra Sacro (Svadhisthana). Creatividad, pasión y emociones.',
        '**Citrino / Calcita Amarilla**: Chakra Plexo Solar (Manipura). Poder personal, confianza y voluntad.',
        '**Aventurina / Jade Verde**: Chakra Corazón (Anahata). Amor incondicional, compasión y sanación.',
        '**Aguamarina / Turquesa**: Chakra Garganta (Vishuddha). Comunicación, expresión y verdad.',
        '**Amatista / Lápiz Lázuli**: Chakra Tercer Ojo (Ajna). Intuición, visión y sabiduría.',
        '**Cuarzo Cristal / Selenita**: Chakra Corona (Sahasrara). Conexión espiritual, iluminación y paz.',
      ],
    },
  },
  {
    id: 17,
    nombre: 'Atrapasueños Estelar',
    precio: '$55.00 USD',
    tipo: 'espiritual',
    categoria: 'atrapasuenos',
    destacado: false,
    img: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600',
    miniaturas: [
      'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=600',
    ],
    materiales: 'Aro metálico dorado, hilos de seda, cuarzo ahumado, plumas de lechuza (éticas)',
    tamano: 'Diámetro 35 cm',
    descripcion:
      'Atrapasueños inspirado en las constelaciones, para conectar con la sabiduría de los astros.',
    significado: {
      titulo: 'Significado de los Elementos Estelares',
      items: [
        '**Aro Metálico Dorado**: Simboliza el sol y las estrellas. Representa la luz divina y la conexión con el universo.',
        '**Cuarzo Ahumado**: Piedra de protección y conexión con la tierra. Ayuda a disipar energías negativas y a mantener la claridad mental.',
        '**Plumas de Lechuza (éticas)**: La lechuza es el ave de la sabiduría en muchas culturas. Sus plumas traen conocimiento, paciencia y visión nocturna.',
        '**Hilos de Seda**: Representan los hilos del destino y la conexión con el tejido cósmico del universo.',
      ],
    },
  },
];

// Función para obtener todos los productos
export const getProductos = () => productos;

// Función para obtener un producto por ID
export const getProductoById = (id) => {
  return productos.find((p) => p.id === id);
};

// Función para obtener productos por categoría
export const getProductosByCategoria = (categoria) => {
  return productos.filter((p) => p.categoria === categoria);
};

// Función para obtener productos destacados
export const getProductosDestacados = () => {
  return productos.filter((p) => p.destacado);
};

// Función para obtener productos de tipo espiritual
export const getProductosEspirituales = () => {
  return productos.filter((p) => p.tipo === 'espiritual');
};

// Función para obtener productos de tipo clásico
export const getProductosClasicos = () => {
  return productos.filter((p) => p.tipo === 'clasico');
};

// Función para obtener productos recientes (ordenados por ID descendente)
export const getProductosRecientes = (limit = 4) => {
  return [...productos].sort((a, b) => b.id - a.id).slice(0, limit);
};

// Función para buscar productos por texto
export const buscarProductos = (termino) => {
  const terminoLower = termino.toLowerCase().trim();
  if (!terminoLower) return [];
  return productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(terminoLower) ||
      p.categoria.toLowerCase().includes(terminoLower) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(terminoLower))
  );
};