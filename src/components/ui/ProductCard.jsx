// src/components/ui/ProductCard.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getCategoryLabel, getCategoryIcon } from '../../utils/helpers';

export default function ProductCard({ product }) {
  const { id, nombre, precio, tipo, categoria, img, descripcion } = product;
  const isEspecial = tipo === 'espiritual';

  return (
    <Link href={`/detalles/${id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div>
        <div className="product-card-image">
          <Image
            src={img}
            alt={nombre}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            width={400}
            height={300}
            loading="lazy"
          />
          <span className="product-badge">
            <i className={getCategoryIcon(categoria)}></i>
            {getCategoryLabel(categoria)}
          </span>

          {isEspecial ? (
            <span className="product-badge-especial">
              <i className="fa-solid fa-star"></i> Especial
            </span>
          ) : (
            <span className="product-badge-clasico">
              <i className="fa-regular fa-circle"></i> Clásico
            </span>
          )}
        </div>
        <div className="product-card-body">
          <h3 className="product-card-title">{nombre}</h3>
          <p className="product-card-desc">{descripcion?.slice(0, 70) || ''}...</p>
        </div>
      </div>
      <div className="product-card-footer">
        <span className="product-card-price">{precio}</span>
        <span className="btn-ver-detalles" style={{ textDecoration: 'none' }}>
          Ver detalles <i className="fa-solid fa-chevron-right"></i>
        </span>
      </div>
    </Link>
  );
}