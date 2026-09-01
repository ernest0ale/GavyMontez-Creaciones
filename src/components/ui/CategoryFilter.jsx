// components/ui/CategoryFilter.jsx
'use client';

import { CATEGORIAS, CATEGORIA_LABELS, TIPOS, TIPO_LABELS } from '../../utils/constants';

export default function CategoryFilter({ selectedCategory, onCategoryChange, selectedType, onTypeChange }) {
  const categories = [
    { key: CATEGORIAS.TODOS, label: CATEGORIA_LABELS[CATEGORIAS.TODOS], icon: 'fa-solid fa-grid-2' },
    { key: CATEGORIAS.ATRAPASUENOS, label: CATEGORIA_LABELS[CATEGORIAS.ATRAPASUENOS], icon: 'fa-solid fa-feather-pointed' },
    { key: CATEGORIAS.COLLARES, label: CATEGORIA_LABELS[CATEGORIAS.COLLARES], icon: 'fa-solid fa-gem' },
    { key: CATEGORIAS.ARETES, label: CATEGORIA_LABELS[CATEGORIAS.ARETES], icon: 'fa-regular fa-circle' },
    { key: CATEGORIAS.PULSERAS, label: CATEGORIA_LABELS[CATEGORIAS.PULSERAS], icon: 'fa-solid fa-hand-sparkles' },
    { key: CATEGORIAS.ESCULTURAS, label: CATEGORIA_LABELS[CATEGORIAS.ESCULTURAS], icon: 'fa-solid fa-palette' },
    { key: CATEGORIAS.SOMBREROS, label: CATEGORIA_LABELS[CATEGORIAS.SOMBREROS], icon: 'fa-solid fa-hat-cowboy' },
    { key: CATEGORIAS.COMBOS, label: CATEGORIA_LABELS[CATEGORIAS.COMBOS], icon: 'fa-solid fa-gift' },
  ];

  const tipos = [
    { key: TIPOS.TODOS, label: TIPO_LABELS[TIPOS.TODOS], icon: 'fa-regular fa-circle' },
    { key: TIPOS.CLASICO, label: TIPO_LABELS[TIPOS.CLASICO], icon: 'fa-regular fa-circle', color: '#756205' },
    { key: TIPOS.ESPIRITUAL, label: TIPO_LABELS[TIPOS.ESPIRITUAL], icon: 'fa-solid fa-star', color: '#AD610E' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            className={`category-btn ${selectedCategory === cat.key ? 'active' : ''}`}
          >
            <i className={cat.icon}></i> {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2">
        <span className="text-sm font-medium mr-1 flex items-center gap-1.5 text-[var(--text-primary)] opacity-70">
          <i className="fa-solid fa-sliders"></i> Tipo:
        </span>
        {tipos.map((tipo) => (
          <label
            key={tipo.key}
            className={`tipo-filter-label ${selectedType === tipo.key ? 'active' : ''}`}
          >
            <input
              type="radio"
              name="tipo-filtro"
              value={tipo.key}
              checked={selectedType === tipo.key}
              onChange={() => onTypeChange(tipo.key)}
            />
            <i className={tipo.icon} style={{ color: tipo.color }}></i> {tipo.label}
          </label>
        ))}
      </div>
    </div>
  );
}