// Formula.tsx

import React from 'react';
import Carousel from '../../../components/Carousel2';  // Ajuste o caminho conforme a estrutura do seu projeto
import { caminho } from "../../../../services/metrica.service";

interface FormulaProps {
  metrica: string;
}

const Formula: React.FC<FormulaProps> = ({ metrica }) => {
  const caminhos = caminho(metrica);

  // Verifica se o retorno foi "N/A"
  if (caminhos === "N/A") {
    return <div>Nenhuma imagem disponível</div>;
  }

  // Caso contrário, trata como string[]
  return (
    <div>
      <Carousel>
        {caminhos.map((imgPath, index) => (
          <img
            key={index}
            src={imgPath}
            alt={`Imagem ${index + 1}`}
            className="object-contain w-auto h-64" // Ajuste as classes conforme necessário
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Formula;
