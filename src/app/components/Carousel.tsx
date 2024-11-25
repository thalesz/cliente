import React, { useState, useEffect } from "react"; 
import CardMetricas from "./CardMetricas"; 
import  { filterCardData } from "../views/Home/SimuladoBox/cardDataArray2";
import 'font-awesome/css/font-awesome.min.css';

interface CarouselProps {
  select: string;
  idSimulado: string;
  idTurma: string;
  idDisciplina: string[];
}

const Carousel: React.FC<CarouselProps> = ({ select, idSimulado, idTurma, idDisciplina }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); 
  const [isSmallScreen, setIsSmallScreen] = useState(false); 

  const filteredCardData = filterCardData(select);

  // Efeito para reiniciar o índice quando 'select' muda
  useEffect(() => {
    setCurrentIndex(0);
  }, [select]);

  // Efeito para ajustar o número de cards por página e detectar telas pequenas
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Exibe 1 card em telas pequenas
        setIsSmallScreen(true); // Define que é uma tela pequena
      } else {
        setItemsPerPage(3); // Mantém 3 cards para telas maiores
        setIsSmallScreen(false); // Define que é uma tela maior
      }
    };

    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage(); // Chama ao montar o componente

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const next = () => {
    setCurrentIndex((prevIndex: number) =>
      Math.min(prevIndex + itemsPerPage, filteredCardData.length - itemsPerPage)
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex: number) =>
      Math.max(prevIndex - itemsPerPage, 0)
    );
  };

  const showPrevButton = currentIndex > 0;
  const showNextButton = currentIndex < filteredCardData.length - itemsPerPage;

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Botão Anterior */}
      <div style={{ visibility: showPrevButton ? 'visible' : 'hidden' }}>
        <button
          onClick={prev}
          className="text-blue-500 mx-2"
          disabled={!showPrevButton}
          aria-label="Anterior"
        >
          <i className="fa fa-chevron-left fa-2x"></i>
        </button>
      </div>

      {/* Container dos Cards */}
      <div className="overflow-hidden w-full pl-4">
        <div
          className="flex transition-transform duration-500"
          style={{
            width: '100%',
            transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
          }}
        >
          {filteredCardData.map((item, index) => (
            <div
              key={index}
              className={`flex justify-center ${
                isSmallScreen ? 'w-[calc(100%-50px)]' : 'w-[calc(100%/3)]'
              } flex-shrink-0 ${isSmallScreen ? 'px-8' : 'px-1'} `
            } 
            >
              <CardMetricas
                cardData={item}
                idSimulado={idSimulado}
                idTurma={idTurma}
                idDisciplina={idDisciplina}
              />
            </div>
          ))}
          {filteredCardData.length < itemsPerPage &&
            Array.from({ length: itemsPerPage - filteredCardData.length }).map((_, idx) => (
              <div key={`empty-${idx}`} className={`${
                isSmallScreen ? 'w-[calc(100%-50px)]' : 'w-[calc(100%/3)]'
              } flex-shrink-0 ${isSmallScreen ? 'px-8' : 'px-4'}`}></div>
            ))}
        </div>
      </div>

      {/* Botão Próximo */}
      <div style={{ visibility: showNextButton ? 'visible' : 'hidden' }}>
        <button
          onClick={next}
          className="text-blue-500 mx-2"
          disabled={!showNextButton}
          aria-label="Próximo"
        >
          <i className="fa fa-chevron-right fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
