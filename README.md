# GavyMontez Creaciones - Arte con intención y alma

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![FontAwesome](https://img.shields.io/badge/FontAwesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

---

## 📖 Descripción

**GavyMontez Creaciones** es una tienda en línea de artesanía cubana especializada en piezas espirituales y únicas. El proyecto presenta un catálogo de productos artesanales con funcionalidades de carrito de compras, búsqueda, filtros por categoría y tipo, y sistema de pedidos por WhatsApp.

La aplicación ha sido migrada desde HTML/CSS vanilla a **Next.js**, manteniendo la misma experiencia visual y funcional, pero con una arquitectura moderna, escalable y optimizada.

---

## 🛠️ Tecnologías

### Framework y Librerías
| Tecnología | Uso | Estado |
|------------|-----|--------|
| **[Next.js](https://nextjs.org/)** 16.3.1 | Framework principal | ✅ En uso |
| **[React](https://reactjs.org/)** 19.2.8 | UI y componentes | ✅ En uso |
| **[CSS3](https://developer.mozilla.org/es/docs/Web/CSS)** | Estilos puros con variables CSS | ✅ En uso |
| **[JavaScript (ES6+)](https://developer.mozilla.org/es/docs/Web/JavaScript)** | Lógica de la aplicación | ✅ En uso |

### Dependencias Instaladas
| Dependencia | Uso | Estado |
|-------------|-----|--------|
| `@supabase/supabase-js` | Conexión a base de datos (futuro) | 📦 Preparado |
| `eslint` | Linting de código | 🔧 Desarrollo |
| `eslint-config-next` | Reglas ESLint para Next.js | 🔧 Desarrollo |

### Recursos Externos
| Recurso | Uso | Estado |
|---------|-----|--------|
| **[Font Awesome](https://fontawesome.com/)** 6.4.0 | Iconografía | ✅ CDN |
| **[Google Fonts](https://fonts.google.com/)** | `Playfair Display` e `Inter` | ✅ CDN |

## ✨ Características

### Funcionalidades del Usuario
- ✅ **Tema oscuro/claro** - Persistente en localStorage
- ✅ **Carrito de compras** - Gestión local con localStorage
- ✅ **Búsqueda en tiempo real** - Resultados instantáneos
- ✅ **Filtros por categoría** - Atrapasueños, Collares, Aretes, Pulseras, Esculturas, Sombreros, Combos
- ✅ **Filtros por tipo** - Clásicos (CUP) / Especiales (USD)
- ✅ **Paginación** - 12 productos por página
- ✅ **Productos destacados** - En la página de inicio
- ✅ **Combos exclusivos** - Ofertas especiales
- ✅ **Productos recientemente vistos** - Historial local
- ✅ **Modales interactivos** - Significado, Información, Compartir
- ✅ **Selección múltiple** - Añadir varios productos al carrito
- ✅ **WhatsApp integrado** - Pedidos directos por chat
- ✅ **Diseño responsive** - Adaptado a móviles, tablets y desktop

### Funcionalidades del Sistema
- ✅ **Context API** - Gestión de estado global (carrito y tema)
- ✅ **Custom Hooks** - `useCart`, `useTheme`, `useSearch`
- ✅ **CSS Variables** - Paleta de colores otoñal con modo oscuro
- ✅ **Imágenes optimizadas** - Componente `next/image`
- ✅ **Rutas dinámicas** - Páginas de detalles de producto por `slug`
- ✅ **Página 404 personalizada** - Not Found
- ✅ **Open Graph dinámico** - Vista previa en WhatsApp/Telegram/Redes

## 🎨 Estilos

El proyecto utiliza **CSS puro** con variables CSS para el tema. Todos los estilos están centralizados en `src/styles/globals.css`.

### Paleta de Colores

| Variable | Valor (Claro) | Valor (Oscuro) |
|----------|---------------|----------------|
| `--bg-primary` | `#ede0d4` | `#211a17` |
| `--surface` | `#d9c8b8` | `#332a24` |
| `--text-primary` | `#1a100c` | `#ead7c1` |
| `--accent` | `#ad610e` | `#d68c5c` |
| `--secondary` | `#756205` | `#8aa86c` |
| `--card-bg` | `#e0d3c4` | `#332a24` |
| `--border` | `#b8a392` | `#4a3a2e` |

### Modo Oscuro

El modo oscuro se activa mediante la clase `dark-mode` en el elemento `body`, que cambia automáticamente todas las variables CSS.

---

## 📁 Estructura del Proyecto

```
gavymontez-creaciones-project/
├── public/                                 # Archivos estáticos servidos en la raíz
│   └── resources/
│       ├── favicon.ico                     # Favicon del sitio
│       ├── carrucel/                       # Imágenes del carrusel (fallback)
│       │   ├── slide1.jpg
│       │   ├── slide2.jpg
│       │   ├── slide3.jpg
│       │   └── slide4.jpg
│       ├── imagenes/                       # Imágenes generales del sitio
│       ├── gavyMontezCreaciones_aro_darkLogo.png
│       ├── gavyMontezCreaciones_darkLogo.png
│       └── gavyMontezCreaciones_lightLogo.png
│
├── src/                                    # Código fuente completo
│   │
│   ├── app/                                # App Router (páginas y layouts)
│   │   ├── busqueda/
│   │   │   └── page.js                     # Búsqueda de productos
│   │   ├── carrito/
│   │   │   └── page.js                     # Carrito de compras
│   │   ├── catalogo/
│   │   │   ├── layout.js                   # Metadata OpenGraph/Twitter
│   │   │   ├── opengraph-image.js          # Imagen OG dinámica
│   │   │   └── page.js                     # Catálogo con filtros
│   │   ├── contacto/
│   │   │   ├── layout.js                   # Metadata OpenGraph/Twitter
│   │   │   ├── opengraph-image.js          # Imagen OG dinámica
│   │   │   └── page.js                     # Contacto y redes sociales
│   │   ├── detalles/
│   │   │   └── [slug]/                     # Ruta dinámica por slug
│   │   │       ├── layout.js               # Metadata dinámica por producto
│   │   │       ├── opengraph-image.js      # Imagen OG del producto
│   │   │       └── page.js                 # Detalles del producto
│   │   ├── novedades/
│   │   │   ├── layout.js                   # Metadata OpenGraph/Twitter
│   │   │   ├── opengraph-image.js          # Imagen OG dinámica
│   │   │   └── page.js                     # Novedades y populares
│   │   ├── politica-envios/
│   │   │   └── page.js                     # Política de envíos
│   │   ├── preguntas-frecuentes/
│   │   │   └── page.js                     # FAQ con acordeón
│   │   ├── terminos/
│   │   │   └── page.js                     # Términos y condiciones
│   │   ├── layout.js                       # Layout principal + metadata raíz
│   │   ├── not-found.js                    # Página 404
│   │   ├── opengraph-image.js              # Imagen OG de la home
│   │   ├── page.js                         # Página de inicio
│   │   └── sitemap.js                      # Sitemap dinámico
│   │
│   ├── components/                         # Componentes React
│   │   ├── carrito/
│   │   │   ├── AddProductsModal.jsx        # Selección múltiple
│   │   │   ├── CartItem.jsx                # Item del carrito
│   │   │   └── CartTotals.jsx              # Totales y checkout
│   │   ├── layout/
│   │   │   ├── Footer.jsx                  # Pie de página
│   │   │   ├── Header.jsx                  # Cabecera y navegación
│   │   │   └── ThemeToggle.jsx             # Botón de tema
│   │   ├── modals/
│   │   │   ├── CompartirModal.jsx          # Compartir en redes
│   │   │   ├── InfoModal.jsx               # Información del producto
│   │   │   └── SignificadoModal.jsx        # Significado espiritual
│   │   └── ui/
│   │       ├── CartOverlay.jsx             # Overlay lateral del carrito
│   │       ├── CategoryFilter.jsx          # Filtros de categoría/tipo
│   │       ├── GlobalToast.jsx             # Toast notifications global
│   │       ├── HeroCarousel.jsx            # Carrusel del hero
│   │       ├── Pagination.jsx              # Controles de paginación
│   │       ├── ProductCard.jsx             # Tarjeta de producto
│   │       ├── ProductGrid.jsx             # Grid de productos
│   │       ├── SearchOverlay.jsx           # Overlay de búsqueda
│   │       ├── SkeletonLoader.jsx          # Loader esqueleto
│   │       └── WhatsAppButton.jsx          # Botón flotante de WhatsApp
│   │
│   ├── contexts/                           # Contextos globales
│   │   ├── CartContext.jsx                 # Estado del carrito
│   │   └── ThemeContext.jsx                # Estado del tema
│   │
│   ├── data/
│   │   └── productos.js                    # Datos de productos (estático)
│   │
│   ├── hooks/                              # Custom Hooks
│   │   ├── useCart.js                      # Hook del carrito
│   │   ├── useSearch.js                    # Hook de búsqueda
│   │   └── useTheme.js                     # Hook del tema
│   │
│   ├── lib/                                # Librerías y configuraciones
│   │   ├── supabase-client.js              # Cliente Supabase (frontend)
│   │   ├── supabase-server.js              # Cliente Supabase (server)
│   │   └── supabase.js                     # Configuración base
│   │
│   ├── resources/                          # Recursos locales (importables)
│   │   ├── carrucel/                       # Imágenes del carrusel
│   │   │   ├── slide1.jpg
│   │   │   ├── slide2.jpg
│   │   │   ├── slide3.jpg
│   │   │   └── slide4.jpg
│   │   ├── fonts/                          # Fuentes para OG images
│   │   │   ├── Inter_24pt-Regular.ttf
│   │   │   ├── Inter_24pt-Bold.ttf
│   │   │   ├── PlayfairDisplay-Regular.ttf
│   │   │   └── PlayfairDisplay-Bold.ttf
│   │   └── imagenes/                       # Imágenes generales del sitio
│   │
│   ├── styles/                             # Estilos
│   │   └── globals.css                     # Estilos globales (CSS puro)
│   │
│   └── utils/                              # Utilidades
│       ├── constants.js                    # Constantes globales
│       ├── helpers.js                      # Funciones de ayuda
│       ├── og-fonts.js                     # Carga de fuentes para OG
│       └── validators.js                   # Validadores de datos
│
├── .env.local                              # Variables de entorno
├── jsconfig.json                           # Configuración de rutas (@/* → ./src/*)
├── next.config.js                          # Configuración de Next.js
├── package.json                            # Dependencias y scripts
└── README.md                               # Este archivo
```

---

## 🔀 Alias de rutas

El proyecto usa el alias `@/*` configurado en `jsconfig.json` que apunta a `./src/*`. Esto permite imports limpios:

```js
// En lugar de:
import ProductCard from '../../../components/ui/ProductCard';

// Usamos:
import ProductCard from '@/components/ui/ProductCard';
```

Configuración en jsconfig.json:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/": ["./src/"]
    }
  }
}
```

---

## 🖼️ Open Graph dinámico

El proyecto genera vistas previas personalizadas para cada ruta usando `next/og`:

| Ruta | Archivo | Imagen generada |
|------|---------|-----------------|
| `/` | `src/app/opengraph-image.js` | Home con slide 1 del carrusel |
| `/catalogo` | `src/app/catalogo/opengraph-image.js` | Catálogo con texto estilizado |
| `/contacto` | `src/app/contacto/opengraph-image.js` | Contacto con canales |
| `/novedades` | `src/app/novedades/opengraph-image.js` | Novedades con texto |
| `/detalles/[slug]` | `src/app/detalles/[slug]/opengraph-image.js` | Imagen del producto |

**Metadata por ruta:** cada carpeta tiene un `layout.js` (server component) que exporta `metadata` con `openGraph.images` y `twitter.images` apuntando a su `opengraph-image`. Esto garantiza que WhatsApp, Telegram y redes sociales lean correctamente las vistas previas (los bots no ejecutan JavaScript).

---

## 📦 Dependencias

**Producción**

```json
{
  "@supabase/supabase-js": "^2.108.1",
  "next": "16.3.1",
  "react": "19.2.8",
  "react-dom": "19.2.8"
}
```

**Desarrollo**

```json
{
  "eslint": "^9",
  "eslint-config-next": "16.3.1"
}
```

---

## 🌐 Recursos Externos

| Recurso | URL | Uso |
|---------|-----|-----|
| Font Awesome | `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css` | Iconos |
| Google Fonts | `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap` | Fuentes |

---

## 📱 Responsive

- **Móvil:** Menú hamburguesa, grid de 1 columna
- **Tablet:** Grid de 2-3 columnas, navegación completa
- **Desktop:** Grid de 4 columnas, todas las funcionalidades

---

## 👨‍💻 Desarrollador

**Ernesto Alejandro**

- 🐙 [GitHub](#)
- 📸 [Instagram](#)
- ✈️ [Telegram](#)
- 📧 [Email](#)

---

## 🏪 Proyecto

**GavyMontez Creaciones - Arte con intención y alma**

- 📸 [Instagram](#)
- 📱 [WhatsApp](#)

---

## 📄 Licencia

Este proyecto es de uso privado para **GavyMontez Creaciones**. Todos los derechos reservados.

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Por su excelente framework
- [React](https://reactjs.org/) - Por la revolucionaria forma de construir UIs
- [Font Awesome](https://fontawesome.com/) - Por su increíble biblioteca de iconos
- [Google Fonts](https://fonts.google.com/) - Por las hermosas fuentes tipográficas

---

Hecho con ❤️ desde La Habana, Cuba