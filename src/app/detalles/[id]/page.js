// app/detalles/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { productos } from '../../../data/productos';
import { useCart } from '../../../hooks/useCart';
import SignificadoModal from '../../../components/modals/SignificadoModal';
import InfoModal from '../../../components/modals/InfoModal';
import CompartirModal from '../../../components/modals/CompartirModal';
import { getCategoryLabel, getCategoryIcon, guardarVisto } from '../../../utils/helpers';

export default function DetallesPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const [product, setProduct] = useState(null);
  const [similares, setSimilares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [showSignificado, setShowSignificado] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showCompartir, setShowCompartir] = useState(false);

  useEffect(() => {
    const found = productos.find((p) => p.id === productId);
    setProduct(found);
    setSelectedImage(found?.img || '');

    // Guardar producto en vistos
    if (found) {
      guardarVisto(productId);

      // Cargar productos similares (misma categoría, excluyendo el actual)
      const similaresData = productos
        .filter(p => p.categoria === found.categoria && p.id !== found.id)
        .slice(0, 4);
      setSimilares(similaresData);
    }

    setLoading(false);
  }, [productId]);

  // Función para compartir (externa)
  const handleCompartir = () => {
    setShowCompartir(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <i className="fa-solid fa-spinner fa-spin text-3xl" style={{ color: 'var(--accent)' }}></i>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <i className="fa-solid fa-triangle-exclamation text-5xl mb-4" style={{ color: 'var(--accent)' }}></i>
        <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
          Producto no encontrado
        </h2>
        <p className="mt-2 text-[var(--text-primary)] opacity-70">
          La pieza que buscas no existe o fue removida.
        </p>
        <Link
          href="/catalogo"
          className="inline-block mt-6 text-white px-6 py-3 rounded-full transition-all hover:scale-105"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const cartItem = items.find((item) => item.id === product.id);
  const inCart = !!cartItem;
  const quantity = cartItem?.cantidad || 1;
  const isEspecial = product.tipo === 'espiritual';

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleRemoveFromCart = () => {
    removeItem(product.id);
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      updateQuantity(product.id, val);
    }
  };

  // Categorías para el icono
  const categoryIcons = {
    atrapasuenos: 'fa-solid fa-feather-pointed',
    collares: 'fa-solid fa-gem',
    aretes: 'fa-regular fa-circle',
    pulseras: 'fa-solid fa-hand-sparkles',
    esculturas: 'fa-solid fa-palette',
    sombreros: 'fa-solid fa-hat-cowboy',
    combos: 'fa-solid fa-gift',
  };

  const categoryLabels = {
    atrapasuenos: 'Atrapasueños',
    collares: 'Collares',
    aretes: 'Aretes',
    pulseras: 'Pulseras',
    esculturas: 'Esculturas',
    sombreros: 'Sombreros',
    combos: 'Combos',
  };

  return (
    <>
      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 font-medium mb-4 transition-all duration-300 hover:gap-3 text-[var(--text-primary)]"
          >
            <i className="fa-solid fa-arrow-left"></i> Volver al catálogo
          </Link>

          <div className="detalle-container">
            <div className="detalle-grid">
              {/* Imagen */}
              <div>
                <div
                  className="rounded-xl md:rounded-2xl overflow-hidden border"
                  style={{ backgroundColor: 'var(--hero-bg)', borderColor: 'var(--border)' }}
                >
                  <Image
                    src={selectedImage}
                    alt={product.nombre}
                    className="detalle-imagen-principal"
                    width={600}
                    height={500}
                    priority
                  />
                </div>
                {product.miniaturas && product.miniaturas.length > 0 && (
                  <div className="detalle-miniaturas">
                    {product.miniaturas.map((url, index) => (
                      <Image
                        key={index}
                        src={url}
                        alt={`${product.nombre} - vista ${index + 1}`}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 cursor-pointer transition-all hover:border-[var(--accent)] flex-shrink-0"
                        style={{
                          borderColor: selectedImage === url ? 'var(--accent)' : 'var(--border)',
                        }}
                        width={80}
                        height={80}
                        onClick={() => setSelectedImage(url)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Información */}
              <div className="space-y-4 md:space-y-5">
                <div className="detalle-badges">
                  <span className="badge-categoria">
                    <i className={categoryIcons[product.categoria] || 'fa-solid fa-tag'}></i>
                    {categoryLabels[product.categoria] || product.categoria}
                  </span>
                  {isEspecial ? (
                    <span className="badge-especial">
                      <i className="fa-solid fa-star"></i> Especial
                    </span>
                  ) : (
                    <span className="badge-clasico">
                      <i className="fa-regular fa-circle"></i> Clásico
                    </span>
                  )}
                </div>

                <h1 className="detalle-nombre">{product.nombre}</h1>
                <p className="detalle-precio">{product.precio}</p>

                <div className="detalle-descripcion-box">
                  <span className="label">Descripción de la artesana</span>
                  <p>{product.descripcion}</p>

                  <div className="btn-info-group">
                    <button
                      onClick={() => setShowInfo(true)}
                      className="btn-info"
                    >
                      <i className="fa-solid fa-circle-info"></i> Materiales y medidas
                    </button>
                    {product.significado && (
                      <button
                        onClick={() => setShowSignificado(true)}
                        className="btn-info"
                      >
                        <i className="fa-solid fa-spa"></i> Ver significado
                      </button>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="detalle-actions">
                  <div className="action-row">
                    {!inCart ? (
                      <button
                        onClick={handleAddToCart}
                        className="add-to-cart-btn"
                      >
                        <i className="fa-solid fa-cart-plus"></i> Añadir al carrito
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleRemoveFromCart}
                          className="added-btn"
                        >
                          <i className="fa-solid fa-check"></i> Añadido
                        </button>
                        <div className="cart-qty-elipse visible">
                          <button
                            onClick={() => updateQuantity(product.id, cartItem.cantidad - 1)}
                            className="qty-btn"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            className="qty-input"
                            value={cartItem.cantidad}
                            onChange={handleQuantityChange}
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(product.id, cartItem.cantidad + 1)}
                            className="qty-btn"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </>
                    )}

                    <button
                      onClick={handleCompartir}
                      className="btn-compartir"
                    >
                      <i className="fa-regular fa-share-from-square"></i>
                      <span className="hidden sm:inline">Compartir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Productos Similares */}
          {similares.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-[var(--text-primary)]">
                También te puede gustar
              </h2>
              <div className="similares-carousel">
                {similares.map((p) => {
                  const isSimEspecial = p.tipo === 'espiritual';
                  return (
                    <Link
                      key={p.id}
                      href={`/detalles/${p.id}`}
                      className="sim-item"
                    >
                      <div className="sim-img">
                        <Image
                          src={p.img}
                          alt={p.nombre}
                          width={256}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                        <span className="sim-badge">
                          <i className={categoryIcons[p.categoria] || 'fa-solid fa-tag'}></i>
                          {categoryLabels[p.categoria] || p.categoria}
                        </span>
                        {isSimEspecial ? (
                          <span className="sim-tipo-badge espiritual">
                            <i className="fa-solid fa-star"></i> Especial
                          </span>
                        ) : (
                          <span className="sim-tipo-badge clasico">
                            <i className="fa-regular fa-circle"></i> Clásico
                          </span>
                        )}
                      </div>
                      <div className="sim-body">
                        <h4>{p.nombre}</h4>
                        <div className="sim-footer">
                          <span className="price">{p.precio}</span>
                          <span className="btn-ver">
                            Ver <i className="fa-solid fa-chevron-right"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modales */}
      {showSignificado && (
        <SignificadoModal
          isOpen={showSignificado}
          onClose={() => setShowSignificado(false)}
          title={product.significado?.titulo || 'Significado Espiritual'}
          items={product.significado?.items || []}
        />
      )}

      {showInfo && (
        <InfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
          materiales={product.materiales || 'No especificado'}
          tamano={product.tamano || 'No especificado'}
        />
      )}

      {showCompartir && (
        <CompartirModal
          isOpen={showCompartir}
          onClose={() => setShowCompartir(false)}
          url={typeof window !== 'undefined' ? window.location.href : ''}
          text={`Mira esta hermosa creación: ${product.nombre}`}
        />
      )}
    </>
  );
}