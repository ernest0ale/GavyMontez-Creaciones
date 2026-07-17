    function toggleFaq(button) {
      const answer = button.nextElementSibling;
      const icon = button.querySelector('i');
      answer.classList.toggle('open');
      icon.classList.toggle('rotated');
    }

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

    document.addEventListener('DOMContentLoaded', function() {
      if (typeof productos === 'undefined') { console.warn('La variable productos no está definida.'); }
      initTheme();
      document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
      initSearch();
      loadCart();
      initCartUI();
    });

    function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('hidden'); }