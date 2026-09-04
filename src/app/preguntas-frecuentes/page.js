// app/preguntas-frecuentes/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageTitle from '../../components/ui/PageTitle';

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      pregunta: '¿Cómo puedo realizar un pedido?',
      respuesta: (
        <>
          Para realizar un pedido, simplemente navega por nuestro{' '}
          <a href="/catalogo" style={{ color: 'var(--accent)' }}>catálogo</a>
          , selecciona las piezas que te gusten y añádelas al carrito. Luego, ve al carrito y haz clic en{' '}
          <strong>"Comprar por WhatsApp"</strong>. Esto abrirá un chat con nosotros donde confirmaremos tu pedido, te daremos el costo total con envío y acordaremos el método de pago y entrega.
        </>
      ),
    },
    {
      pregunta: '¿Qué métodos de pago aceptan?',
      respuesta: (
        <>
          Aceptamos los siguientes métodos de pago:
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li>Transferencia bancaria (CUP y MLC)</li>
            <li>Efectivo en punto de encuentro acordado (dentro de La Habana)</li>
          </ul>
          <p className="mt-1">Los detalles de pago se proporcionan al confirmar el pedido por WhatsApp.</p>
        </>
      ),
    },
    {
      pregunta: '¿Cuánto cuesta el envío?',
      respuesta: (
        <>
          El costo de envío depende de tu ubicación. Te informamos el costo exacto antes de confirmar la compra. Generalmente:
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li><strong>La Habana:</strong> Costo reducido o entrega personalizada sin cargo</li>
            <li><strong>Resto del país:</strong> Se calcula según el peso y la distancia</li>
          </ul>
          <p className="mt-1">Consulta nuestra <a href="/politica-envios" style={{ color: 'var(--accent)' }}>Política de Envíos</a> para más detalles.</p>
        </>
      ),
    },
    {
      pregunta: '¿Cuánto tiempo tarda en llegar mi pedido?',
      respuesta: (
        <>
          Los tiempos de entrega varían según la ubicación:
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li><strong>La Habana:</strong> 1-3 días hábiles</li>
            <li><strong>Resto del país:</strong> 3-7 días hábiles</li>
          </ul>
          <p className="mt-1">Te proporcionaremos un número de seguimiento para que puedas rastrear tu paquete.</p>
        </>
      ),
    },
    {
      pregunta: '¿Puedo devolver o cambiar un producto?',
      respuesta: (
        <>
          Dado que cada pieza es única y hecha a mano, no aceptamos devoluciones por cambio de opinión. Sin embargo, si tu producto llega dañado o con algún defecto, contáctanos dentro de las <strong>48 horas</strong> de recibido para evaluar una solución.
        </>
      ),
    },
    {
      pregunta: '¿Cómo sé si un producto es "Clásico" o "Edición Especial"?',
      respuesta: (
        <>
          En la página de cada producto, encontrarás un badge (etiqueta) que indica el tipo:
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase px-2.5 py-1 rounded-full" style={{ backgroundColor: '#756205', color: 'white' }}>
              <i className="fa-regular fa-circle text-[0.5rem]"></i> Clásico
            </span>
            <span className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase px-2.5 py-1 rounded-full" style={{ backgroundColor: '#AD610E', color: 'white' }}>
              <i className="fa-solid fa-star text-[0.45rem]"></i> Edición Especial
            </span>
          </div>
          <ul className="list-disc pl-5 mt-1 space-y-0.5">
            <li><strong>Clásico</strong> — Precio en CUP, materiales tradicionales</li>
            <li><strong>Edición Especial</strong> — Precio en USD, con significado espiritual</li>
          </ul>
        </>
      ),
    },
    {
      pregunta: '¿Qué es la "Edición Especial" o "Espiritual"?',
      respuesta: (
        <>
          Nuestra <strong>Edición Especial</strong> está diseñada para conectar con lo espiritual y lo energético. Cada pieza incluye materiales seleccionados por su significado (cristales, plumas éticas, maderas sagradas) y viene con una descripción detallada de su simbolismo. Estas piezas están pensadas para quienes buscan algo más que una joya o decoración: una conexión con lo sagrado.
        </>
      ),
    },
    {
      pregunta: '¿Cómo puedo contactarlos?',
      respuesta: (
        <>
          Puedes contactarnos a través de:
          <ul className="list-none pl-0 mt-1 space-y-0.5">
            <li><i className="fa-brands fa-whatsapp" style={{ color: '#25D366' }}></i> <a href="https://wa.me/5358481876" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>WhatsApp: +53 58481876</a></li>
            <li><i className="fa-brands fa-instagram" style={{ color: '#E1306C' }}></i> <a href="https://instagram.com/gavymontez_creaciones" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Instagram: @gavymontez_creaciones</a></li>
            <li><i className="fa-regular fa-envelope"></i> <a href="mailto:gavymontez@creaciones.com" style={{ color: 'var(--accent)' }}>gavymontez@creaciones.com</a></li>
          </ul>
          <p className="mt-1">Respondemos en menos de 24 horas.</p>
        </>
      ),
    },
    {
      pregunta: '¿Hacen envíos internacionales?',
      respuesta: (
        <>
          Actualmente solo realizamos envíos dentro de Cuba. Estamos trabajando para ofrecer envíos internacionales en el futuro. ¡Mantente atento a nuestras novedades!
        </>
      ),
    },
    {
      pregunta: '¿Puedo encargar una pieza personalizada?',
      respuesta: (
        <>
          Sí, aceptamos pedidos personalizados. Contáctanos por WhatsApp con tu idea y trabajaremos juntos para crear una pieza única que refleje tu esencia. Los tiempos y precios se acuerdan según la complejidad del diseño.
        </>
      ),
    },
  ];

  return (
    <>
      <PageTitle title="Preguntas Frecuentes" />

      <main className="flex-grow py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--accent)' }}>
              Ayuda y soporte
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mt-1 text-[var(--text-primary)]">
              Preguntas Frecuentes
            </h1>
            <p className="mt-2 text-sm md:text-base text-[var(--text-primary)] opacity-70">
              Encuentra respuestas a las dudas más comunes sobre nuestras creaciones.
            </p>
          </div>

          <div
            className="rounded-2xl md:rounded-3xl p-6 md:p-8 border shadow-md"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item border-b last:border-b-0 py-2"
                style={{ borderColor: 'var(--border)' }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="faq-question w-full py-2 md:py-3 bg-none border-none flex justify-between items-center cursor-pointer font-serif font-semibold text-sm md:text-base text-left text-[var(--text-primary)] transition-all hover:text-[var(--accent)]"
                >
                  <span>{faq.pregunta}</span>
                  <i
                    className={`fa-solid fa-chevron-down transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--accent)' }}
                  ></i>
                </button>
                <div
                  className={`faq-answer overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-[500px] py-2 md:py-3' : 'max-h-0 py-0'
                  }`}
                  style={{ color: 'var(--text-primary)', opacity: 0.8, lineHeight: 1.7 }}
                >
                  {faq.respuesta}
                </div>
              </div>
            ))}

            <div className="pt-6 border-t text-center" style={{ borderColor: 'var(--border)' }}>
              <p className="text-sm text-[var(--text-primary)] opacity-60">
                <i className="fa-regular fa-message"></i> ¿No encontraste lo que buscabas?
              </p>
            </div>

            <div className="text-center pt-4">
              <Link
                href="/catalogo"
                className="inline-block text-white px-6 py-3 rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <i className="fa-solid fa-arrow-left"></i> Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}