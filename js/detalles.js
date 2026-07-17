    // ========== TEMA OSCURO ==========
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
    function updateThemeIcons(theme) {
      const icon = document.getElementById('theme-icon');
      if (icon) {
        icon.className = theme === 'dark' ? 'fa-regular fa-sun text-xl' : 'fa-regular fa-moon text-xl';
      }
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

    // ========== BÚSQUEDA ==========
    function initSearch() {
      const trigger = document.getElementById('searchTrigger');
      const overlay = document.getElementById('searchOverlay');
      const close = document.getElementById('searchClose');
      const submitBtn = document.getElementById('searchSubmitBtn');
      const input = document.getElementById('searchInput');
      const results = document.getElementById('searchResults');

      function openSearch() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => input.focus(), 150);
      }
      function closeSearch() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        input.value = '';
        results.classList.remove('active');
      }
      function ejecutarBusqueda() {
        const termino = input.value.trim();
        if (termino) {
          closeSearch();
          window.location.href = `busqueda.html?q=${encodeURIComponent(termino)}`;
        }
      }
      trigger.addEventListener('click', openSearch);
      close.addEventListener('click', closeSearch);
      submitBtn.addEventListener('click', ejecutarBusqueda);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });

      let timeoutId = null;
      input.addEventListener('input', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const termino = input.value.trim();
          if (termino.length < 2) { results.classList.remove('active'); return; }
          const resultados = buscarProductos(termino);
          renderSearchResults(resultados, results);
          results.classList.add('active');
        }, 200);
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); ejecutarBusqueda(); }
        if (e.key === 'Escape') closeSearch();
      });
    }

    function buscarProductos(termino) {
      if (typeof productos === 'undefined') return [];
      const terminoLower = termino.toLowerCase().trim();
      return productos.filter(p =>
        p.nombre.toLowerCase().includes(terminoLower) ||
        p.categoria.toLowerCase().includes(terminoLower) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(terminoLower))
      ).slice(0, 8);
    }

    function renderSearchResults(resultados, container) {
      if (resultados.length === 0) {
        container.innerHTML = `<div class="search-result-empty"><i class="fa-regular fa-face-frown"></i><span>No se encontraron artículos</span></div>`;
        return;
      }
      container.innerHTML = resultados.map(p => `
        <div class="search-result-item" onclick="window.location.href='detalles.html?id=${p.id}'">
          <img src="${p.img}" onerror="this.src='https://picsum.photos/seed/${p.id}/50/50'" alt="${p.nombre}" loading="lazy">
          <div class="search-result-info">
            <div class="search-result-name">${p.nombre}</div>
            <div class="search-result-meta">
              <span class="search-result-categoria">${p.categoria}</span>
              <span class="search-result-precio">${p.precio}</span>
            </div>
          </div>
        </div>
      `).join('');
    }

    // ========== CARRITO ==========
    let carrito = [];
    function loadCart() {
      const saved = localStorage.getItem('gavy_cart');
      if (saved) { try { carrito = JSON.parse(saved); } catch(e) { carrito = []; } }
      updateCartUI();
    }
    function saveCart() {
      localStorage.setItem('gavy_cart', JSON.stringify(carrito));
      updateCartUI();
      const currentProductId = window.currentProductId;
      if (currentProductId) { updateDetailCartState(currentProductId); }
    }
    function addToCart(productoId, cantidad = 1) {
      const producto = productos.find(p => p.id === productoId);
      if (!producto) return;
      const existing = carrito.find(item => item.id === productoId);
      if (existing) { existing.cantidad += cantidad; } else { carrito.push({ ...producto, cantidad }); }
      saveCart();
      updateDetailCartState(productoId);
      showToast(`¡${producto.nombre} añadido al carrito!`, 'success');
    }
    function removeFromCart(productoId) {
      const producto = productos.find(p => p.id === productoId);
      carrito = carrito.filter(i => i.id !== productoId);
      saveCart();
      updateDetailCartState(productoId);
      if (producto) { showToast(`¡${producto.nombre} eliminado del carrito!`, 'info'); }
    }
    function updateQuantity(productoId, delta) {
      const item = carrito.find(i => i.id === productoId);
      if (!item) return;
      const nueva = item.cantidad + delta;
      if (nueva <= 0) { removeFromCart(productoId); return; }
      item.cantidad = nueva;
      saveCart();
      updateDetailCartState(productoId);
    }
    function updateQtyFromInput(id, value) {
      const num = parseInt(value);
      if (isNaN(num) || num < 1) {
        const item = carrito.find(i => i.id === id);
        const input = document.getElementById('qtyInput');
        if (item && input) {
          input.value = item.cantidad;
        }
        return;
      }
      const item = carrito.find(i => i.id === id);
      if (!item) return;
      if (num === 0) {
        removeFromCart(id);
        return;
      }
      item.cantidad = num;
      saveCart();
      updateDetailCartState(id);
    }
    function getCartTotal() {
      return carrito.reduce((sum, item) => sum + parseFloat(item.precio.replace('$', '').replace('.', '').trim()) * item.cantidad, 0);
    }
    function getCartProductCount() { return carrito.length; }
    function updateCartUI() {
      const badge = document.getElementById('cartBadge');
      const count = getCartProductCount();
      if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); }
      renderCartItems();
    }
    function renderCartItems() {
      const body = document.getElementById('cartBody');
      const footer = document.getElementById('cartFooter');
      if (carrito.length === 0) {
        body.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-basket-shopping"></i><p>Tu carrito está vacío</p><p style="font-size: 0.85rem; margin-top: 0.3rem;">Explora nuestro catálogo y añade tus piezas favoritas</p></div>`;
        footer.style.display = 'none'; return;
      }
      body.innerHTML = carrito.map(item => `
        <div class="cart-item">
          <div class="cart-item-info"><div class="cart-item-name">${item.nombre}</div><div class="cart-item-meta">${item.precio} c/u</div></div>
          <div class="cart-item-actions">
            <button onclick="updateQuantity(${item.id}, -1)"><i class="fa-solid fa-minus"></i></button>
            <input type="number" value="${item.cantidad}" min="1" onchange="updateQtyFromInput(${item.id}, this.value)">
            <button onclick="updateQuantity(${item.id}, 1)"><i class="fa-solid fa-plus"></i></button>
            <span class="cart-item-price">$${(parseFloat(item.precio.replace('$', '').replace('.', '').trim()) * item.cantidad).toFixed(0)}</span>
          </div>
        </div>
      `).join('');
      const subtotal = getCartTotal();
      const comision = subtotal * 0.1;
      const total = subtotal + comision;
      document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(0)}`;
      document.getElementById('cartCommission').textContent = `$${comision.toFixed(0)}`;
      document.getElementById('cartTotal').textContent = `$${total.toFixed(0)}`;
      footer.style.display = 'block';
    }
    function toggleCart() {
      const overlay = document.getElementById('cartOverlay');
      const backdrop = document.getElementById('cartBackdrop');
      overlay.classList.toggle('open');
      backdrop.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    }
    function initCartUI() {
      const toggle = document.getElementById('cartToggle');
      const close = document.getElementById('cartClose');
      const backdrop = document.getElementById('cartBackdrop');
      toggle.addEventListener('click', toggleCart);
      close.addEventListener('click', toggleCart);
      backdrop.addEventListener('click', toggleCart);
      document.getElementById('cartGoToBtn').addEventListener('click', () => { toggleCart(); window.location.href = 'carrito.html'; });
      document.getElementById('cartCheckoutBtn').addEventListener('click', () => {
        if (carrito.length === 0) return;
        let mensaje = 'Hola, vengo de la página web gavymontez-creaciones y estoy interesado en comprar estos artículos:\n\n';
        carrito.forEach(item => { mensaje += `·${item.nombre} x ${item.cantidad}\n`; });
        const total = getCartTotal() + (getCartTotal() * 0.1);
        mensaje += `\nEl precio total sería $${total.toFixed(0)}.`;
        window.open(`https://wa.me/5358481876?text=${encodeURIComponent(mensaje)}`, '_blank');
      });
    }

    // ========== ACTUALIZAR ESTADO EN DETALLES ==========
    function updateDetailCartState(productId) {
      const addBtn = document.getElementById('addToCartBtn');
      const addedBtn = document.getElementById('addedBtn');
      const qtyElipse = document.getElementById('cartQtyElipse');
      const qtyInput = document.getElementById('qtyInput');
      const existing = carrito.find(item => item.id === productId);
      
      if (existing) {
        if (addBtn) addBtn.style.display = 'none';
        if (addedBtn) {
          addedBtn.style.display = 'inline-flex';
          addedBtn.innerHTML = '<i class="fa-solid fa-check"></i> Añadido';
          addedBtn.onclick = function() { removeFromCart(productId); };
        }
        if (qtyElipse) {
          qtyElipse.classList.add('visible');
          qtyElipse.style.display = 'flex';
        }
        if (qtyInput) qtyInput.value = existing.cantidad;
        updateCartUI();
      } else {
        if (addBtn) {
          addBtn.style.display = 'inline-flex';
          addBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Añadir al carrito';
        }
        if (addedBtn) addedBtn.style.display = 'none';
        if (qtyElipse) {
          qtyElipse.classList.remove('visible');
          qtyElipse.style.display = 'none';
        }
      }
    }

    // ========== DETALLE DE PRODUCTO ==========
    let currentProducto = null;
    window.currentProductId = null;

    function cargarDetalleProducto(id) {
      const producto = productos.find(p => p.id === id);
      currentProducto = producto;
      window.currentProductId = id;
      
      if (!producto) {
        document.getElementById('detalle-container').innerHTML = `
          <div class="text-center py-12">
            <i class="fa-solid fa-triangle-exclamation text-5xl mb-4" style="color: var(--accent);"></i>
            <h2 class="text-2xl font-serif font-bold" style="color: var(--text-primary);">Producto no encontrado</h2>
            <p class="mt-2" style="color: var(--text-primary); opacity: 0.7;">La pieza que buscas no existe o fue removida.</p>
            <a href="catalogo.html" class="inline-block mt-6 text-white px-6 py-3 rounded-full" style="background-color: var(--accent);">Ver catálogo</a>
          </div>
        `;
        return;
      }
      
      guardarVisto(id);
      
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
      if (producto.tipo === 'espiritual') {
        tipoBadge = `<span class="tipo-badge espiritual"><i class="fa-solid fa-star"></i> Especial</span>`;
      } else {
        tipoBadge = `<span class="tipo-badge clasico"><i class="fa-regular fa-circle"></i> Clásico</span>`;
      }
      
      document.title = `${producto.nombre} - GavyMontez Creaciones`;
      
      const existing = carrito.find(item => item.id === producto.id);
      const enCarrito = !!existing;
      
      const materiales = producto.materiales || 'No especificado';
      const tamano = producto.tamano || 'No especificado';
      const tieneSignificado = producto.significado && producto.significado.items && producto.significado.items.length > 0;

      let miniaturasHTML = '';
      if (producto.miniaturas && producto.miniaturas.length > 0) {
        miniaturasHTML = producto.miniaturas.map(url => `
          <img src="${url}" onerror="this.style.display='none'" onclick="document.getElementById('detalle-img-principal').src='${url}'">
        `).join('');
      }
      
      const detalleHTML = `
        <div class="detalle-grid">
          <div>
            <div class="rounded-2xl overflow-hidden border" style="background-color: var(--hero-bg); border-color: var(--border);">
              <img id="detalle-img-principal" src="${producto.img}" alt="${producto.nombre}" class="detalle-imagen-principal">
            </div>
            ${miniaturasHTML ? `<div class="detalle-miniaturas">${miniaturasHTML}</div>` : ''}
          </div>
          
          <div class="space-y-5">
            <div class="detalle-badges">
              <span class="badge-categoria"><i class="${categoryIcons[producto.categoria] || 'fa-solid fa-tag'}"></i> ${categoryLabels[producto.categoria] || producto.categoria}</span>
              ${tipoBadge}
            </div>
            <h1 class="detalle-nombre">${producto.nombre}</h1>
            <p class="detalle-precio">${producto.precio}</p>
            
            <div class="detalle-descripcion-box">
              <span class="label">Descripción de la artesana</span>
              <p>${producto.descripcion}</p>
              
              <div class="btn-info-group">
                <button class="btn-info" onclick="abrirInformacion('${materiales.replace(/'/g, "\\'")}', '${tamano.replace(/'/g, "\\'")}')">
                  <i class="fa-solid fa-circle-info"></i> Materiales y medidas
                </button>
                ${tieneSignificado ? `
                  <button class="btn-info" onclick="abrirSignificado('${producto.significado.titulo || 'Significado Espiritual'}', ${JSON.stringify(producto.significado.items).replace(/"/g, '&quot;')})">
                    <i class="fa-solid fa-spa"></i> Ver significado
                  </button>
                ` : ''}
              </div>
            </div>
            
            <div class="detalle-actions">
              <div class="action-row">
                <button class="add-to-cart-btn" id="addToCartBtn" onclick="handleAddToCart()" style="${enCarrito ? 'display: none;' : ''}">
                  <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
                </button>
                
                <button class="added-btn" id="addedBtn" onclick="${enCarrito ? `removeFromCart(${producto.id})` : ''}" style="${enCarrito ? '' : 'display: none;'}">
                  <i class="fa-solid fa-check"></i> Añadido
                </button>
                
                <div class="cart-qty-elipse ${enCarrito ? 'visible' : ''}" id="cartQtyElipse" style="${enCarrito ? 'display: flex;' : 'display: none;'}">
                  <button class="qty-btn" onclick="updateQuantity(${producto.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                  <input type="number" class="qty-input" id="qtyInput" value="${enCarrito ? existing.cantidad : 1}" min="1" onchange="updateQtyFromInput(${producto.id}, this.value)">
                  <button class="qty-btn" onclick="updateQuantity(${producto.id}, 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
                
                <button class="btn-compartir" onclick="abrirCompartir()">
                  <i class="fa-regular fa-share-from-square"></i> Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.getElementById('detalle-container').innerHTML = detalleHTML;
      
      window.addToCartBtn = document.getElementById('addToCartBtn');
      window.addedBtn = document.getElementById('addedBtn');
      window.qtyElipse = document.getElementById('cartQtyElipse');
      window.qtyInput = document.getElementById('qtyInput');
      
      cargarSimilares(producto.categoria, producto.id);
    }

    function handleAddToCart() {
      if (!currentProducto) return;
      addToCart(currentProducto.id, 1);
    }

    // ========== CARGAR SIMILARES ==========
    function cargarSimilares(categoria, idActual) {
      const carousel = document.getElementById('similares-carousel');
      const section = document.getElementById('similares-section');
      if (!carousel) return;
      let similares = productos.filter(p => p.categoria === categoria && p.id !== idActual);
      if (similares.length < 3) {
        const extras = productos.filter(p => p.id !== idActual && !similares.includes(p));
        similares = [...similares, ...extras].slice(0, 4);
      }
      if (similares.length === 0) { if (section) section.style.display = 'none'; return; }
      if (section) section.style.display = 'block';
      carousel.innerHTML = '';
      
      const categoryIcons = {
        pulseras: 'fa-solid fa-hand-sparkles',
        atrapasuenos: 'fa-solid fa-feather-pointed',
        esculturas: 'fa-solid fa-palette',
        sombreros: 'fa-solid fa-hat-cowboy',
        combos: 'fa-solid fa-gift'
      };
      const categoryLabels = {
        pulseras: 'Pulseras',
        atrapasuenos: 'Atrapasueños',
        esculturas: 'Esculturas',
        sombreros: 'Sombreros',
        combos: 'Combos'
      };

      similares.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'sim-item';
        div.setAttribute('onclick', `window.location.href='detalles.html?id=${prod.id}'`);
        
        let tipoBadge = '';
        if (prod.tipo === 'espiritual') {
          tipoBadge = `<span class="sim-tipo-badge espiritual"><i class="fa-solid fa-star"></i> Especial</span>`;
        } else {
          tipoBadge = `<span class="sim-tipo-badge clasico"><i class="fa-regular fa-circle"></i> Clásico</span>`;
        }
        
        div.innerHTML = `
          <div class="sim-img">
            <img src="${prod.img}" alt="${prod.nombre}" loading="lazy">
            <span class="sim-badge"><i class="${categoryIcons[prod.categoria] || 'fa-solid fa-tag'}"></i> ${categoryLabels[prod.categoria] || prod.categoria}</span>
            ${tipoBadge}
          </div>
          <div class="sim-body">
            <h4>${prod.nombre}</h4>
            <div class="sim-footer">
              <span class="price">${prod.precio}</span>
              <span class="btn-ver">Ver <i class="fa-solid fa-chevron-right"></i></span>
            </div>
          </div>
        `;
        carousel.appendChild(div);
      });
    }

    // ========== GUARDAR VISTOS ==========
    function guardarVisto(productoId) {
      try {
        let vistos = JSON.parse(localStorage.getItem('gavy_vistos') || '[]');
        vistos = vistos.filter(id => id !== productoId);
        vistos.unshift(productoId);
        if (vistos.length > 10) vistos.pop();
        localStorage.setItem('gavy_vistos', JSON.stringify(vistos));
      } catch(e) { /* ignore */ }
    }

    // ========== MODALES ==========
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

    function abrirCompartir() {
      const overlay = document.getElementById('compartirModal');
      if (!overlay) {
        const modalHTML = `
          <div class="compartir-modal-overlay" id="compartirModal">
            <div class="compartir-modal">
              <button class="modal-close" onclick="cerrarCompartir()"><i class="fa-solid fa-xmark"></i></button>
              <h3><i class="fa-regular fa-share-from-square"></i> Compartir</h3>
              <div class="share-grid">
                <button class="share-option whatsapp" onclick="compartirRed('whatsapp')"><i class="fa-brands fa-whatsapp"></i> WhatsApp</button>
                <button class="share-option facebook" onclick="compartirRed('facebook')"><i class="fa-brands fa-facebook-f"></i> Facebook</button>
                <button class="share-option telegram" onclick="compartirRed('telegram')"><i class="fa-brands fa-telegram"></i> Telegram</button>
                <button class="share-option copy" onclick="compartirRed('copy')"><i class="fa-regular fa-copy"></i> Copiar</button>
                <button class="share-option cancelar" onclick="cerrarCompartir()">Cancelar</button>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        setTimeout(abrirCompartir, 50);
        return;
      }
      
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
      const url = window.location.href;
      const texto = 'Mira esta hermosa creación de GavyMontez Creaciones';
      
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

    // Cerrar modales con ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        cerrarSignificado();
        cerrarInformacion();
        cerrarCompartir();
      }
    });

    // Cerrar modales al hacer clic en overlay
    document.addEventListener('click', function(e) {
      const significado = document.getElementById('significadoModal');
      if (significado && e.target === significado) { cerrarSignificado(); }
      const info = document.getElementById('infoModal');
      if (info && e.target === info) { cerrarInformacion(); }
      const compartir = document.getElementById('compartirModal');
      if (compartir && e.target === compartir) { cerrarCompartir(); }
    });

    // ========== TOAST ==========
    function showToast(message, type = 'success', duration = 3000) {
      const toast = document.getElementById('toast');
      if (!toast) return;
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

    // ========== INIT ==========
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof productos === 'undefined') { console.warn('La variable productos no está definida.'); }
      initTheme();
      document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
      initSearch();
      loadCart();
      initCartUI();
      
      const urlParams = new URLSearchParams(window.location.search);
      const productoId = parseInt(urlParams.get('id'));
      if (productoId && !isNaN(productoId)) {
        cargarDetalleProducto(productoId);
      } else {
        document.getElementById('detalle-container').innerHTML = `
          <div class="text-center py-12">
            <i class="fa-solid fa-triangle-exclamation text-5xl mb-4" style="color: var(--accent);"></i>
            <h2 class="text-2xl font-serif font-bold" style="color: var(--text-primary);">Producto no encontrado</h2>
            <p class="mt-2" style="color: var(--text-primary); opacity: 0.7;">No se especificó un producto válido.</p>
            <a href="catalogo.html" class="inline-block mt-6 text-white px-6 py-3 rounded-full" style="background-color: var(--accent);">Ver catálogo</a>
          </div>
        `;
      }
    });

    function toggleMobileMenu() {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    }