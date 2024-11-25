// Carousel.tsx

import React, { useRef, useState, useEffect, ReactNode } from "react";

interface CarouselProps {
  children: ReactNode[]; // Permite receber qualquer tipo de conteúdo como filhos
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Função para verificar a posição de rolagem
  const checkForScrollPosition = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Configurar eventos de scroll e resize
  useEffect(() => {
    checkForScrollPosition();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkForScrollPosition);
      window.addEventListener("resize", checkForScrollPosition);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkForScrollPosition);
        window.removeEventListener("resize", checkForScrollPosition);
      }
    };
  }, [children]);

  // Função para rolar para o próximo conjunto de itens
  const scrollNext = () => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Função para rolar para o conjunto de itens anterior
  const scrollPrev = () => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex items-center">
      {/* Botão Anterior */}
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 z-10 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
          aria-label="Anterior"
        >
          <i className="fa fa-chevron-left fa-2x text-blue-500"></i>
        </button>
      )}

      {/* Container dos Itens */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide"
      >
        {children.map((child, index) => (
          <div key={index} className="flex-shrink-0 w-[400px]">
            {child}
          </div>
        ))}
      </div>

      {/* Botão Próximo */}
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className="absolute right-0 z-10 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
          aria-label="Próximo"
        >
          <i className="fa fa-chevron-right fa-2x text-blue-500"></i>
        </button>
      )}
    </div>
  );
};

export default Carousel;
