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
    let selectedProducts = {};

    function loadCart() {
      const saved = localStorage.getItem('gavy_cart');
      if (saved) { try { carrito = JSON.parse(saved); } catch(e) { carrito = []; } }
      updateCartUI();
      updateCartBadge();
    }

    function saveCart() {
      localStorage.setItem('gavy_cart', JSON.stringify(carrito));
      updateCartUI();
      updateCartBadge();
    }

    function getCartTotal() {
      return carrito.reduce((sum, item) => sum + parseFloat(item.precio.replace('$', '').replace('.', '').trim()) * item.cantidad, 0);
    }

    function getCartProductCount() { return carrito.length; }

    function updateCartBadge() {
      const badge = document.getElementById('cartBadge');
      const count = getCartProductCount();
      if (count > 0) { badge.textContent = count; badge.classList.remove('hidden'); } else { badge.classList.add('hidden'); }
    }

    function updateCartUI() {
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

    function updateQuantity(id, delta) {
      const item = carrito.find(i => i.id === id);
      if (!item) return;
      const nueva = item.cantidad + delta;
      if (nueva <= 0) { carrito = carrito.filter(i => i.id !== id); saveCart(); renderCartPage(); return; }
      item.cantidad = nueva;
      saveCart();
      renderCartPage();
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
        renderCartPage();
        return;
      }
      item.cantidad = num;
      saveCart();
      renderCartPage();
    }

    function removeItem(id) {
      carrito = carrito.filter(i => i.id !== id);
      saveCart();
      renderCartPage();
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
      document.getElementById('cartGoToBtn').addEventListener('click', () => { toggleCart(); });
      document.getElementById('cartCheckoutBtn').addEventListener('click', () => {
        if (carrito.length === 0) return;
        let mensaje = 'Hola, vengo de la página web gavymontez-creaciones y estoy interesado en comprar estos artículos:\n\n';
        carrito.forEach(item => { mensaje += `·${item.nombre} x ${item.cantidad}\n`; });
        const total = getCartTotal() + (getCartTotal() * 0.1);
        mensaje += `\nEl precio total sería $${total.toFixed(0)}.`;
        window.open(`https://wa.me/5358481876?text=${encodeURIComponent(mensaje)}`, '_blank');
      });
    }

    function renderCartPage() {
      const container = document.getElementById('cart-content');
      if (carrito.length === 0) {
        container.innerHTML = `
          <div class="text-center py-12">
            <i class="fa-solid fa-basket-shopping text-5xl" style="color: var(--accent); opacity: 0.3;"></i>
            <h3 class="text-xl font-serif font-bold mt-4" style="color: var(--text-primary);">Tu carrito está vacío</h3>
            <p class="mt-2" style="color: var(--text-primary); opacity: 0.6;">Explora nuestro catálogo y añade tus piezas favoritas</p>
            <a href="catalogo.html" class="inline-block mt-6 text-white px-6 py-3 rounded-full" style="background-color: var(--accent);">Ver catálogo</a>
          </div>
        `;
        return;
      }
      let html = `
        <div class="space-y-2">
          ${carrito.map(item => `
            <div class="cart-item-row">
              <img src="${item.img}" onerror="this.src='https://picsum.photos/seed/${item.id}/80/80'" alt="${item.nombre}">
              <div class="cart-item-info">
                <h3>${item.nombre}</h3>
                <p>${item.precio} c/u</p>
              </div>
              <div class="flex items-center gap-3">
                <div class="qty-control">
                  <button onclick="updateQty(${item.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                  <input type="number" value="${item.cantidad}" min="1" onchange="setQty(${item.id}, this.value)">
                  <button onclick="updateQty(${item.id}, 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
                <span style="font-weight: 600; color: var(--accent); min-width: 50px; text-align: right;">
                  $${(parseFloat(item.precio.replace('$', '').replace('.', '').trim()) * item.cantidad).toFixed(0)}
                </span>
                <button class="remove-btn" onclick="removeItem(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border);">
          <button class="add-more-btn" onclick="openModal()"><i class="fa-solid fa-plus"></i> Añadir otro artículo</button>
        </div>
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border);">
          <div style="display: flex; flex-direction: column; gap: 0.3rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem; color: var(--text-primary);">
              <span>Subtotal</span>
              <span id="subtotal">$${getCartTotal().toFixed(0)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-primary); opacity: 0.7;">
              <span>Comisión (10%)</span>
              <span id="commission">$${(getCartTotal() * 0.1).toFixed(0)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 700; color: var(--text-primary); border-top: 1px solid var(--border); padding-top: 0.5rem; margin-top: 0.3rem;">
              <span>Total</span>
              <span style="color: var(--accent);" id="total">$${(getCartTotal() * 1.1).toFixed(0)}</span>
            </div>
          </div>
          <button onclick="checkoutWhatsApp()" class="w-full mt-4 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-102" style="background: #25D366; color: white;">
            <i class="fa-brands fa-whatsapp text-xl"></i> Comprar por WhatsApp
          </button>
        </div>
      `;
      container.innerHTML = html;
    }

    function updateQty(id, delta) {
      const item = carrito.find(i => i.id === id);
      if (!item) return;
      const nueva = item.cantidad + delta;
      if (nueva <= 0) { removeItem(id); return; }
      item.cantidad = nueva;
      saveCart();
      renderCartPage();
    }

    function setQty(id, value) {
      const item = carrito.find(i => i.id === id);
      if (!item) return;
      const num = parseInt(value);
      if (isNaN(num) || num < 1) return;
      item.cantidad = num;
      saveCart();
      renderCartPage();
    }

    function checkoutWhatsApp() {
      if (carrito.length === 0) return;
      let mensaje = 'Hola, vengo de la página web gavymontez-creaciones y estoy interesado en comprar estos artículos:\n\n';
      carrito.forEach(item => { mensaje += `·${item.nombre} x ${item.cantidad}\n`; });
      const total = getCartTotal() * 1.1;
      mensaje += `\nEl precio total sería $${total.toFixed(0)}.`;
      window.open(`https://wa.me/5358481876?text=${encodeURIComponent(mensaje)}`, '_blank');
    }

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

    // ========== MODAL ==========
    function initModal() {
      const modal = document.getElementById('addModal');
      const closeBtn = document.getElementById('modalClose');
      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    function openModal() {
      const modal = document.getElementById('addModal');
      const grid = document.getElementById('modalProductGrid');
      selectedProducts = {};
      updateSelectedCount();
      const cartIds = carrito.map(i => i.id);
      const available = productos.filter(p => !cartIds.includes(p.id));
      if (available.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-primary); opacity: 0.6;">
          <i class="fa-solid fa-check-circle" style="color: var(--accent); font-size: 2rem; display: block; margin-bottom: 0.5rem;"></i>
          Ya has añadido todos los artículos disponibles
        </div>`;
        document.getElementById('modalAddBtn').disabled = true;
      } else {
        grid.innerHTML = available.map(p => {
          const precioNum = parseFloat(p.precio.replace('$', '').replace('.', '').trim());
          return `
            <div class="modal-product-card" data-id="${p.id}" onclick="toggleProductSelection(${p.id})">
              <span class="selection-check"><i class="fa-solid fa-check"></i></span>
              <img src="${p.img}" onerror="this.src='https://picsum.photos/seed/${p.id}/150/120'" alt="${p.nombre}">
              <h4>${p.nombre}</h4>
              <span class="price">${p.precio}</span>
              <div class="qty-control" onclick="event.stopPropagation();">
                <button onclick="changeModalQty(${p.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                <input type="number" id="modalQty_${p.id}" value="1" min="1" onchange="event.stopPropagation(); updateModalQty(${p.id}, this.value)">
                <button onclick="changeModalQty(${p.id}, 1)"><i class="fa-solid fa-plus"></i></button>
              </div>
              <span class="subtotal-preview" id="modalSubtotal_${p.id}">$${precioNum}</span>
            </div>
          `;
        }).join('');
        document.getElementById('modalAddBtn').disabled = true;
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('addModal').classList.remove('open');
      document.body.style.overflow = '';
    }

    function toggleProductSelection(id) {
      if (selectedProducts[id]) {
        delete selectedProducts[id];
        const card = document.querySelector(`.modal-product-card[data-id="${id}"]`);
        if (card) card.classList.remove('selected');
      } else {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;
        const qtyInput = document.getElementById(`modalQty_${id}`);
        const qty = parseInt(qtyInput?.value) || 1;
        selectedProducts[id] = { producto, cantidad: qty };
        const card = document.querySelector(`.modal-product-card[data-id="${id}"]`);
        if (card) card.classList.add('selected');
      }
      updateSelectedCount();
      updateModalAddButton();
    }

    function changeModalQty(id, delta) {
      const input = document.getElementById(`modalQty_${id}`);
      if (!input) return;
      let val = parseInt(input.value) || 1;
      val = Math.max(1, val + delta);
      input.value = val;
      updateModalQty(id, val);
    }

    function updateModalQty(id, value) {
      const num = parseInt(value);
      if (isNaN(num) || num < 1) return;
      if (selectedProducts[id]) {
        selectedProducts[id].cantidad = num;
        const producto = selectedProducts[id].producto;
        const precioNum = parseFloat(producto.precio.replace('$', '').replace('.', '').trim());
        const subtotalSpan = document.getElementById(`modalSubtotal_${id}`);
        if (subtotalSpan) { subtotalSpan.textContent = `$${(precioNum * num).toFixed(0)}`; }
      }
      if (!selectedProducts[id] && num > 0) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
          selectedProducts[id] = { producto, cantidad: num };
          const card = document.querySelector(`.modal-product-card[data-id="${id}"]`);
          if (card) card.classList.add('selected');
          const precioNum = parseFloat(producto.precio.replace('$', '').replace('.', '').trim());
          const subtotalSpan = document.getElementById(`modalSubtotal_${id}`);
          if (subtotalSpan) { subtotalSpan.textContent = `$${(precioNum * num).toFixed(0)}`; }
          updateSelectedCount();
          updateModalAddButton();
        }
      }
    }

    function updateSelectedCount() {
      const count = Object.keys(selectedProducts).length;
      document.getElementById('selectedCount').textContent = count;
    }

    function updateModalAddButton() {
      const btn = document.getElementById('modalAddBtn');
      const count = Object.keys(selectedProducts).length;
      btn.disabled = count === 0;
      btn.innerHTML = count > 0 ? `Añadir ${count} artículo${count > 1 ? 's' : ''} al carrito` : 'Añadir seleccionados al carrito';
    }

    document.getElementById('modalAddBtn')?.addEventListener('click', function() {
      const ids = Object.keys(selectedProducts);
      if (ids.length === 0) return;
      ids.forEach(id => {
        const { producto, cantidad } = selectedProducts[id];
        const existing = carrito.find(i => i.id === parseInt(id));
        if (existing) { existing.cantidad += cantidad; } else { carrito.push({ ...producto, cantidad }); }
      });
      saveCart();
      closeModal();
      renderCartPage();
      this.innerHTML = '✅ ¡Añadido!';
      setTimeout(() => {
        this.innerHTML = `Añadir ${ids.length} artículo${ids.length > 1 ? 's' : ''} al carrito`;
      }, 1500);
    });

    // ========== INICIALIZACIÓN ==========
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof productos === 'undefined') { console.warn('La variable productos no está definida.'); }
      initTheme();
      document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
      initSearch();
      loadCart();
      initCartUI();
      renderCartPage();
      initModal();
      
      window.toggleProductSelection = toggleProductSelection;
      window.changeModalQty = changeModalQty;
      window.updateModalQty = updateModalQty;
      window.openModal = openModal;
      window.closeModal = closeModal;
      window.updateQty = updateQty;
      window.setQty = setQty;
      window.removeItem = removeItem;
      window.checkoutWhatsApp = checkoutWhatsApp;
    });

    function toggleMobileMenu() {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    }