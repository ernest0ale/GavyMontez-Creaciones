// components/ui/WhatsAppButton.jsx
'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <a
      href="https://wa.me/5358481876"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
      <span className="whatsapp-tooltip">¡Escríbenos!</span>
    </a>
  );
}