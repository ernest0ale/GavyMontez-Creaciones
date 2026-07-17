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
      if (icon) { icon.className = theme === 'dark' ? 'fa-regular fa-sun text-xl' : 'fa-regular fa-moon text-xl'; }
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

    function initSearch() {
      const trigger = document.getElementById('searchTrigger');
      const overlay = document.getElementById('searchOverlay');
      const close = document.getElementById('searchClose');
      const submitBtn = document.getElementById('searchSubmitBtn');
      const input = document.getElementById('searchInput');
      const results = document.getElementById('searchResults');

      function openSearch() { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; setTimeout(() => input.focus(), 150); }
      function closeSearch() { overlay.classList.remove('active'); document.body.style.overflow = ''; input.value = ''; results.classList.remove('active'); }
      function ejecutarBusqueda() { const termino = input.value.trim(); if (termino) { closeSearch(); window.location.href = `busqueda.html?q=${encodeURIComponent(termino)}`; } }
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

    let carrito = [];
    function loadCart() {
      const saved = localStorage.getItem('gavy_cart');
      if (saved) { try { carrito = JSON.parse(saved); } catch(e) { carrito = []; } }
      updateCartUI();
    }
    function saveCart() { localStorage.setItem('gavy_cart', JSON.stringify(carrito)); updateCartUI(); }
    function updateQuantity(productoId, delta) {
      const item = carrito.find(i => i.id === productoId);
      if (!item) return;
      const nueva = item.cantidad + delta;
      if (nueva <= 0) { carrito = carrito.filter(i => i.id !== productoId); saveCart(); return; }
      item.cantidad = nueva; saveCart();
    }
    function updateQtyFromInput(id, value) {
      const num = parseInt(value);
      if (isNaN(num) || num < 1) {
        const item = carrito.find(i => i.id === id);
        const input = document.querySelector(`#cartBody input[onchange*="updateQtyFromInput(${id}"]`);
        if (item && input) {
          input.value = item.cantidad;
        }
        return;
      }
      const item = carrito.find(i => i.id === id);
      if (!item) return;
      if (num === 0) {
        carrito = carrito.filter(i => i.id !== id);
        saveCart();
        return;
      }
      item.cantidad = num;
      saveCart();
    }
    function getCartTotal() { return carrito.reduce((sum, item) => sum + parseFloat(item.precio.replace('$', '').replace('.', '').trim()) * item.cantidad, 0); }
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
        tipoBadge = `<span class="absolute top-3 right-3 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1" style="background-color: #AD610E; color: white; border: 1px solid #AD610E;">
          <i class="fa-solid fa-star" style="font-size: 8px;"></i> Especial
        </span>`;
      } else {
        tipoBadge = `<span class="absolute top-3 right-3 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1" style="background-color: #756205; color: white; border: 1px solid #756205;">
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

    let currentPage = 1;
    let itemsPerPage = 12;
    let currentResults = [];
    let searchTerm = '';

    function getSearchTermFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    }

    function performSearch(termino) {
      if (typeof productos === 'undefined') { currentResults = []; return; }
      searchTerm = termino;
      const terminoLower = termino.toLowerCase().trim();
      if (!terminoLower) { currentResults = []; return; }
      currentResults = productos.filter(p =>
        p.nombre.toLowerCase().includes(terminoLower) ||
        p.categoria.toLowerCase().includes(terminoLower) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(terminoLower))
      );
    }

    function renderResultadosConPaginado() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const productosPagina = currentResults.slice(startIndex, endIndex);
      const totalPages = Math.ceil(currentResults.length / itemsPerPage);
      const grid = document.getElementById('busqueda-grid');
      const emptyState = document.getElementById('empty-search-state');
      const paginationContainer = document.getElementById('pagination-container');
      const searchTitle = document.getElementById('searchTitle');
      const searchCount = document.getElementById('searchCount');
      
      if (searchTerm) {
        searchTitle.textContent = `Resultados para "${searchTerm}"`;
      } else {
        searchTitle.textContent = 'Resultados de búsqueda';
      }
      searchCount.textContent = `${currentResults.length} producto${currentResults.length !== 1 ? 's' : ''} encontrado${currentResults.length !== 1 ? 's' : ''}`;
      
      if (currentResults.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        paginationContainer.classList.add('hidden');
        return;
      }
      
      grid.classList.remove('hidden');
      emptyState.classList.add('hidden');
      paginationContainer.classList.remove('hidden');
      grid.innerHTML = '';
      productosPagina.forEach(p => grid.appendChild(createProductCard(p)));
      
      const prevBtn = document.getElementById('prev-page-btn');
      const nextBtn = document.getElementById('next-page-btn');
      const pageInput = document.getElementById('page-input');
      const totalPagesSpan = document.getElementById('total-pages');
      
      pageInput.value = currentPage;
      totalPagesSpan.textContent = totalPages;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages || totalPages === 0;
      
      if (currentPage > totalPages && totalPages > 0) { currentPage = totalPages; }
    }

    document.addEventListener('DOMContentLoaded', function() {
      if (typeof productos === 'undefined') { console.warn('La variable productos no está definida.'); }
      initTheme();
      document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
      initSearch();
      loadCart();
      initCartUI();
      
      const termino = getSearchTermFromURL();
      if (termino) {
        performSearch(termino);
        currentPage = 1;
        renderResultadosConPaginado();
      } else {
        document.getElementById('searchTitle').textContent = 'Búsqueda vacía';
        document.getElementById('searchCount').textContent = '0 productos encontrados';
        document.getElementById('busqueda-grid').classList.add('hidden');
        document.getElementById('pagination-container').classList.add('hidden');
        document.getElementById('empty-search-state').classList.remove('hidden');
        document.getElementById('empty-search-state').innerHTML = `
          <i class="fa-regular fa-search text-5xl" style="color: var(--accent); opacity: 0.3;"></i>
          <p class="text-lg mt-4" style="color: var(--text-primary); opacity: 0.7;">No especificaste qué buscar.</p>
          <p class="text-sm mt-1" style="color: var(--text-primary); opacity: 0.5;">Usa el buscador para encontrar tus artículos favoritos.</p>
          <a href="catalogo.html" class="inline-block mt-6 text-white px-6 py-3 rounded-full" style="background-color: var(--accent);">Ver catálogo completo</a>
        `;
      }
      
      document.getElementById('prev-page-btn')?.addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; renderResultadosConPaginado(); }
      });
      document.getElementById('next-page-btn')?.addEventListener('click', () => {
        const total = Math.ceil(currentResults.length / itemsPerPage);
        if (currentPage < total) { currentPage++; renderResultadosConPaginado(); }
      });
      document.getElementById('page-input')?.addEventListener('change', function() {
        let np = parseInt(this.value);
        const total = Math.ceil(currentResults.length / itemsPerPage);
        if (isNaN(np)) np = 1;
        if (np < 1) np = 1;
        if (np > total && total > 0) np = total;
        currentPage = np;
        renderResultadosConPaginado();
      });
    });

    function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('hidden'); }