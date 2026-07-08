# GavyMontez Creaciones - Arte con intención y alma

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![FontAwesome](https://img.shields.io/badge/FontAwesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📖 Descripción

**GavyMontez Creaciones** es una tienda en línea de artesanía cubana especializada en piezas espirituales y únicas. El proyecto presenta un catálogo de productos artesanales con funcionalidades de carrito de compras, búsqueda, filtros por categoría y tipo, y sistema de pedidos por WhatsApp.

### 🌟 Características principales

- 🛍️ **Catálogo de productos** con categorías y filtros
- 🛒 **Carrito de compras** con persistencia en localStorage
- 🔍 **Búsqueda en tiempo real** de productos
- 📱 **Diseño completamente responsivo**
- 🌙 **Modo oscuro/claro** con persistencia
- 📦 **Pedidos por WhatsApp** integrado
- 🏷️ **Etiquetas de tipo** (Clásico / Edición Especial)
- 🖼️ **Galería de imágenes** en detalles de producto
- 📄 **Páginas informativas** (Términos, Envíos, FAQs)

---

## 🚀 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **HTML5** | - | Estructura de las páginas |
| **CSS3** | - | Estilos personalizados y variables CSS |
| **TailwindCSS** | v3.x | Framework de utilidades CSS |
| **JavaScript** | ES6+ | Lógica de la aplicación |
| **Font Awesome** | v6.4.0 | Iconos vectoriales |
| **Google Fonts** | - | Playfair Display + Inter |

---

## 📝 Estructura de Datos

Los productos se definen en `backend/data.js` con la siguiente estructura:

```javascript
const productos = [
  {
    id: 1,                        // Identificador único
    nombre: "Nombre del producto",
    precio: "$1,500 CUP",
    categoria: "pulseras",        // pulseras, collares, aretes, atrapasuenos, esculturas, sombreros, combos
    tipo: "clasico",              // clasico o espiritual
    descripcion: "Descripción del producto...",
    img: "ruta/imagen.jpg",
    miniaturas: ["ruta/mini1.jpg", "ruta/mini2.jpg"], // Opcional
    destacado: true,              // Opcional
    materiales: "Hilo de algodón, mostacillas...", // Opcional
    tamano: "20 cm",              // Opcional
    significado: {                // Solo para productos espirituales
      titulo: "Significado...",
      items: ["Item 1", "Item 2"]
    }
  }
];
```

---

## 🎨 Paleta de Colores

| Variable | Color | Uso |
|----------|-------|-----|
| `--bg-primary` | #F5E6D3 | Fondo principal |
| `--surface` | #E8D5BE | Superficies y header |
| `--text-primary` | #3E2C1B | Texto principal |
| `--accent` | #AD610E | Color de acento |
| `--brand-dark` | #8B4E0B | Logo (tono oscuro) |
| `--secondary` | #756205 | Subtítulos y detalles |
| `--border` | #C6B09A | Bordes y separadores |
| `--card-bg` | #FCF8F2 | Fondos de tarjetas |
| `--footer-bg` | #3D2A1A | Fondo del footer |

---

## 🔧 Funcionalidades Principales

### 🛒 Carrito de Compras
- Añadir/eliminar productos
- Ajustar cantidades (botones - y +)
- Edición manual de cantidades (input numérico)
- Cálculo de subtotal, comisión (10%) y total
- Persistencia con `localStorage`
- Pedido por WhatsApp con resumen

### 🔍 Búsqueda
- Búsqueda en tiempo real (mínimo 2 caracteres)
- Filtrado por nombre, categoría y descripción
- Resultados con paginación (12 productos por página)

### 🏷️ Filtros
- Por categoría (Pulseras, Collares, Aretes, Atrapasueños, Esculturas, Sombreros, Combos)
- Por tipo (Todos, Clásicos, Especiales/Espirituales)

### 🌙 Modo Oscuro
- Toggle con persistencia en `localStorage`
- Colores adaptados para ambos modos

### 📱 Responsive
- Mobile-first design
- Grid adaptativo (1, 2, 3 o 4 columnas según pantalla)
- Footer con orden específico en móvil

---

## 📄 Páginas del Sitio

| Página | Descripción |
|--------|-------------|
| **Inicio** | Carrusel, servicios, combos y productos destacados |
| **Catálogo** | Todos los productos con filtros y paginación |
| **Detalles** | Información completa del producto, miniaturas, significado espiritual |
| **Novedades** | Productos recientes y más populares |
| **Búsqueda** | Resultados con paginación |
| **Carrito** | Resumen completo del pedido |
| **Política de Envíos** | Información sobre envíos a Cuba |
| **Preguntas Frecuentes** | FAQ con acordeón |
| **Términos** | Términos y condiciones |

---

## 🧩 Componentes Reutilizables

### Tarjeta de Producto
```css
.product-card  /* Contenedor principal */
.card-image    /* Imagen con overlay de badges */
.card-badge    /* Badge de categoría */
.tipo-badge    /* Badge de tipo (Clásico/Espiritual) */
.card-body     /* Nombre y descripción */
.card-footer   /* Precio y botón "Ver detalles" */
```

### Modales
- **Significado Modal**: Muestra el significado espiritual del producto
- **Información Modal**: Muestra materiales y medidas
- **Compartir Modal**: Compartir en WhatsApp, Facebook, Telegram o copiar enlace

---

## 📦 Productos de Ejemplo

Para probar el sitio, puedes agregar productos de ejemplo en `backend/data.js`:

```javascript
const productos = [
  {
    id: 1,
    nombre: "Pulsera de la Abundancia",
    precio: "$1,500 CUP",
    categoria: "pulseras",
    tipo: "espiritual",
    descripcion: "Pulsera tejida a mano con mostacillas y semillas...",
    img: "resources/productos/pulsera-abundancia.jpg",
    destacado: true,
    materiales: "Hilo de algodón, mostacillas, semillas de guayaba",
    tamano: "20 cm ajustable",
    significado: {
      titulo: "Significado de la Abundancia",
      items: [
        "Atrae la prosperidad y la buena fortuna",
        "Protege contra la envidia y las malas energías",
        "Fortalece la conexión con la naturaleza"
      ]
    }
  }
];
```

---

## Desarrollador

**Ernesto Alejandro**

- 🐙 [GitHub](https://github.com/ernest0ale)
- 📸 [Instagram](https://instagram.com/ernest0ale)
- ✈️ [Telegram](https://t.me/ernest0ale)
- 📧 [Email](mailto:ernest0ale428@gmail.com)

---

## Proyecto

**GavyMontez Creaciones** - Artesanía cubana con esencia espiritual
- 📸 [Instagram](https://instagram.com/gavymontez_creaciones)
- 📱 [WhatsApp](https://wa.me/5358481876)

---
