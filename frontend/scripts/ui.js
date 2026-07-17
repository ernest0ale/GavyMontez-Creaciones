// js/ui.js - Renderizado de UI (tarjetas, detalles, filtros, tema, logo)

// ========== TEMA Y LOGO ==========
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcons('dark');
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeIcons('light');
  }
}

function updateHeaderLogo(theme) {
  const logo = document.getElementById('headerLogo');
  if (!logo) return;
  if (theme === 'dark') {
    logo.src = 'resources/gavyMontezCreaciones_darkLogo.png';
  } else {
    logo.src = 'resources/gavyMontezCreaciones_lightLogo.png';
  }
}

function updateThemeIcons(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-regular fa-sun text-xl' : 'fa-regular fa-moon text-xl';
  }
  updateHeaderLogo(theme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  if (isDark) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    updateThemeIcons('light');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateThemeIcons('dark');
  }
}

// ========== TOAST NOTIFICATION ==========
function showToast(message, type = 'success', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) {
    const toastHTML = `
      <div id="toast">
        <span class="toast-icon success"><i class="fa-solid fa-circle-check"></i></span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="hideToast()"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toastHTML);
    setTimeout(() => showToast(message, type, duration), 50);
    return;
  }
  
  const icon = toast.querySelector('.toast-icon');
  const messageEl = toast.querySelector('.toast-message');
  
  icon.className = 'toast-icon';
  icon.innerHTML = '';
  
  if (type === 'success') {
    icon.classList.add('success');
    icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  } else if (type === 'error') {
    icon.classList.add('error');
    icon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
  } else {
    icon.classList.add('info');
    icon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
  }
  
  messageEl.textContent = message;
  toast.classList.add('show');
  
  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(hideToast, duration);
}

function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.remove('show');
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
    window.toastTimeout = null;
  }
}

// ========== PRODUCTOS VISTOS ==========
function guardarVisto(productoId) {
  try {
    let vistos = JSON.parse(localStorage.getItem('gavy_vistos') || '[]');
    vistos = vistos.filter(id => id !== productoId);
    vistos.unshift(productoId);
    if (vistos.length > 10) vistos.pop();
    localStorage.setItem('gavy_vistos', JSON.stringify(vistos));
  } catch(e) { /* ignore */ }
}

function obtenerVistos() {
  try {
    return JSON.parse(localStorage.getItem('gavy_vistos') || '[]');
  } catch(e) { return []; }
}

// ========== SIGNIFICADO MODAL ==========
function abrirSignificado(titulo, items) {
  const overlay = document.getElementById('significadoModal');
  if (!overlay) {
    const modalHTML = `
      <div class="significado-modal-overlay" id="significadoModal">
        <div class="significado-modal">
          <button class="modal-close" onclick="cerrarSignificado()"><i class="fa-solid fa-xmark"></i></button>
          <h3 id="significadoModalTitulo">Significado Espiritual</h3>
          <ul id="significadoModalItems"></ul>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setTimeout(() => abrirSignificado(titulo, items), 50);
    return;
  }
  
  document.getElementById('significadoModalTitulo').textContent = titulo || 'Significado Espiritual';
  const list = document.getElementById('significadoModalItems');
  list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarSignificado() {
  const overlay = document.getElementById('significadoModal');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ========== INFORMACIÓN MODAL ==========
function abrirInformacion(materiales, tamano) {
  const overlay = document.getElementById('infoModal');
  if (!overlay) {
    const modalHTML = `
      <div class="info-modal-overlay" id="infoModal">
        <div class="info-modal">
          <button class="modal-close" onclick="cerrarInformacion()"><i class="fa-solid fa-xmark"></i></button>
          <h3>Información del producto</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="label"><i class="fa-solid fa-cube"></i> Materiales</span>
              <span class="value" id="infoMateriales">-</span>
            </div>
            <div class="info-item">
              <span class="label"><i class="fa-solid fa-ruler"></i> Tamaño / Medidas</span>
              <span class="value" id="infoTamano">-</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setTimeout(() => abrirInformacion(materiales, tamano), 50);
    return;
  }
  
  document.getElementById('infoMateriales').textContent = materiales || 'No especificado';
  document.getElementById('infoTamano').textContent = tamano || 'No especificado';
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarInformacion() {
  const overlay = document.getElementById('infoModal');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ========== COMPARTIR MODAL ==========
function abrirCompartir(url, titulo, texto) {
  const overlay = document.getElementById('compartirModal');
  if (!overlay) {
    const modalHTML = `
      <div class="compartir-modal-overlay" id="compartirModal">
        <div class="compartir-modal">
          <button class="modal-close" onclick="cerrarCompartir()"><i class="fa-solid fa-xmark"></i></button>
          <h3><i class="fa-regular fa-share-from-square"></i> Compartir</h3>
          <div class="share-grid">
            <button class="share-option whatsapp" onclick="compartirRed('whatsapp')">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </button>
            <button class="share-option facebook" onclick="compartirRed('facebook')">
              <i class="fa-brands fa-facebook-f"></i> Facebook
            </button>
            <button class="share-option telegram" onclick="compartirRed('telegram')">
              <i class="fa-brands fa-telegram"></i> Telegram
            </button>
            <button class="share-option copy" onclick="compartirRed('copy')">
              <i class="fa-regular fa-copy"></i> Copiar
            </button>
            <button class="share-option cancelar" onclick="cerrarCompartir()">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setTimeout(() => abrirCompartir(url, titulo, texto), 50);
    return;
  }
  
  window._shareUrl = url || window.location.href;
  window._shareTitulo = titulo || document.title;
  window._shareTexto = texto || 'Mira esta hermosa creación de GavyMontez Creaciones';
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarCompartir() {
  const overlay = document.getElementById('compartirModal');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function compartirRed(red) {
  const url = window._shareUrl || window.location.href;
  const texto = window._shareTexto || 'Mira esta hermosa creación de GavyMontez Creaciones';
  
  const redes = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(texto)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(texto + '\n' + url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`,
    copy: url
  };
  
  if (red === 'copy') {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Enlace copiado al portapapeles', 'success');
      cerrarCompartir();
    }).catch(() => {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast('Enlace copiado al portapapeles', 'success');
      cerrarCompartir();
    });
    return;
  }
  
  if (redes[red]) {
    window.open(redes[red], '_blank', 'width=600,height=500');
    cerrarCompartir();
  }
}

// ========== SKELETON LOADER ==========
function showSkeleton(containerId, count = 8) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    `;
    container.appendChild(skeleton);
  }
}

function hideSkeleton(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.skeleton-card').forEach(el => el.remove());
}

// ========== FUNCIONES DE UI ==========
function createProductCard(p) {
  const div = document.createElement('div');
  div.className = "rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group cursor-pointer flex flex-col justify-between product-card";
  div.style.backgroundColor = "var(--card-bg)";
  div.style.borderColor = "var(--border)";
  div.setAttribute('onclick', `window.location.href='detalles.html?id=${p.id}'`);
  
  const categoryIcons = {
    atrapasuenos: 'fa-solid fa-feather-pointed',
    collares: 'fa-solid fa-gem',
    aretes: 'fa-regular fa-circle',
    pulseras: 'fa-solid fa-hand-sparkles',
    esculturas: 'fa-solid fa-palette',
    sombreros: 'fa-solid fa-hat-cowboy',
    combos: 'fa-solid fa-gift'
  };
  
  const categoryLabels = {
    atrapasuenos: 'Atrapasueños',
    collares: 'Collares',
    aretes: 'Aretes',
    pulseras: 'Pulseras',
    esculturas: 'Esculturas',
    sombreros: 'Sombreros',
    combos: 'Combos'
  };
  
  let tipoBadge = '';
  if (p.tipo === 'espiritual') {
    tipoBadge = `<span class="absolute top-3 right-3 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1" style="background-color: #AD610E; color: white; border: 1px solid #756205;">
      <i class="fa-solid fa-star" style="font-size: 8px;"></i> Especial
    </span>`;
  } else {
    tipoBadge = `<span class="absolute top-3 right-3 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1" style="background-color: #756205; color: white; border: 1px solid #AD610E;">
      <i class="fa-regular fa-circle" style="font-size: 6px;"></i> Clásico
    </span>`;
  }
  
  div.innerHTML = `
    <div>
      <div class="relative h-64 overflow-hidden" style="background-color: var(--hero-bg);">
        <img src="${p.img}" alt="${p.nombre}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
        <span class="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1" style="background-color: var(--card-bg); color: var(--accent);">
          <i class="${categoryIcons[p.categoria] || 'fa-solid fa-tag'}" style="font-size: 10px;"></i> ${categoryLabels[p.categoria] || p.categoria}
        </span>
        ${tipoBadge}
      </div>
      <div class="p-5 space-y-1">
        <h3 class="font-serif font-bold text-lg transition-colors" style="color: var(--card-text-primary);">${p.nombre}</h3>
        <p class="text-xs line-clamp-2 mt-1" style="color: var(--card-text-secondary);">${p.descripcion?.slice(0, 70) || ''}...</p>
      </div>
    </div>
    <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t" style="border-color: var(--border);">
      <span class="text-xl font-bold" style="color: var(--accent);">${p.precio}</span>
      <span class="btn-ver-detalles">
        Ver detalles <i class="fa-solid fa-chevron-right"></i>
      </span>
    </div>
  `;
  return div;
}

function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const destacados = productos.filter(p => p.destacado);
  destacados.forEach(p => grid.appendChild(createProductCard(p)));
}

function renderCatalogo(categoria) {
  const grid = document.getElementById('catalogo-grid');
  const emptyState = document.getElementById('empty-catalog-state');
  if (!grid) return;
  grid.innerHTML = '';
  
  const filtrados = categoria === 'todos' ? productos : productos.filter(p => p.categoria === categoria);
  
  if (filtrados.length === 0) {
    grid.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
  } else {
    grid.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');
    filtrados.forEach(p => grid.appendChild(createProductCard(p)));
  }
}

function filterCategory(catId) {
  document.querySelectorAll('#category-filters .category-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-art-accent', 'text-white', 'border-art-accent');
    btn.classList.add('bg-white', 'text-art-text', 'border-art-border');
  });
  
  const activeBtn = document.querySelector(`#category-filters [data-cat="${catId}"]`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-art-text', 'border-art-border');
    activeBtn.classList.add('active', 'bg-art-accent', 'text-white', 'border-art-accent');
  }
  
  renderCatalogo(catId);
}

// ========== CARGAR DATA.JS SOLO DONDE SE NECESITA ==========
function loadDataAndRender(renderFn) {
  if (typeof productos !== 'undefined') {
    renderFn();
  } else {
    // Intentar cargar data.js dinámicamente
    const script = document.createElement('script');
    script.src = 'backend/data.js';
    script.onload = function() {
      if (typeof productos !== 'undefined') {
        renderFn();
      }
    };
    document.head.appendChild(script);
  }
}

// ========== EXPONER FUNCIONES GLOBALES ==========
window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.updateThemeIcons = updateThemeIcons;
window.updateHeaderLogo = updateHeaderLogo;
window.filterCategory = filterCategory;
window.cargarDetalleProducto = cargarDetalleProducto;
window.showToast = showToast;
window.hideToast = hideToast;
window.guardarVisto = guardarVisto;
window.obtenerVistos = obtenerVistos;
window.abrirSignificado = abrirSignificado;
window.cerrarSignificado = cerrarSignificado;
window.abrirInformacion = abrirInformacion;
window.cerrarInformacion = cerrarInformacion;
window.abrirCompartir = abrirCompartir;
window.cerrarCompartir = cerrarCompartir;
window.compartirRed = compartirRed;
window.showSkeleton = showSkeleton;
window.hideSkeleton = hideSkeleton;
window.loadDataAndRender = loadDataAndRender;
window.createProductCard = createProductCard;
window.renderFeatured = renderFeatured;
window.renderCatalogo = renderCatalogo;