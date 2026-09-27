// components/ui/Pagination.jsx
'use client';

import { useState, useEffect } from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [inputValue, setInputValue] = useState(currentPage);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    let page = parseInt(inputValue);
    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setInputValue(page);
    onPageChange(page);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        <i className="fa-solid fa-chevron-left"></i> Anterior
      </button>

      <div className="flex items-center gap-2">
        <span className="text-[var(--text-primary)] opacity-70">Página</span>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          min="1"
          max={totalPages}
          className="page-input"
        />
        <span className="text-[var(--text-primary)] opacity-70">
          de <span id="total-pages">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Siguiente <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}