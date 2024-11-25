import React, { useState } from "react";
import ModalComponent from "./Modal";
import GraphZone from "../views/Home/GraphZone";
import GraphZone2 from "../views/Home/GraphZona2";

interface CardMetricasProps {
  cardData: {
    title: string;
    info: string;
    tags: string[];
    link: string;
    metrica: string;
  };
  idSimulado?: string;
  idTurma?: string;
  idDisciplina?: string[];
}

const CardMetricas: React.FC<CardMetricasProps> = ({
  cardData,
  idSimulado,
  idTurma,
  idDisciplina,
}) => {
  const { title, info, tags, metrica } = cardData;

  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal

  const handleClick = () => {
    // Abre o modal ao clicar no botão "Entrar"
    setShowModal(true);
  };

  // Função para lidar com a tecla "Enter"
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-72">
      <div className="header bg-blue-500 text-white text-center rounded-t-lg flex items-center justify-center h-16">
        <p className="title text-lg font-semibold">{title}</p>
      </div>
      <div className="info text-center align-center p-4 h-[100px]">
        <p className="text-gray-700 mx-auto">{info}</p>
      </div>

      <div className="footer flex justify-around items-center bg-blue-50 h-16 rounded-b-lg border-t">
        <p className="tag text-xs font-light">
          {tags.map((tag) => `#${tag} `)}
        </p>
        <button
          type="button"
          className="action bg-blue-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow-lg"
          onClick={handleClick} // Chama o modal ao clicar
          onKeyPress={handleKeyPress} // Abre o modal ao pressionar "Enter"
          tabIndex={0} // Permite que o botão receba foco
        >
          Entrar
        </button>
      </div>

      {/* Renderiza o ModalComponent com condicional ternária */}
      {showModal && (
        <ModalComponent title="Detalhes do Simulado" openImmediately={true} setClose={setShowModal}>
          {metrica !== "priority" ? (
            <GraphZone
              id_simulado={idSimulado || ""}
              id_turma={idTurma || ""}
              id_disciplina={idDisciplina || []}
              metrica={metrica} // Passando a métrica para o componente
            />
          ) : (
            <GraphZone2
              id_simulado={idSimulado || ""}
              id_turma={idTurma || ""}
              id_disciplina={idDisciplina || []}
              metrica={metrica} // Passando a métrica para o componente
            />
          )}
        </ModalComponent>
      )}
    </div>
  );
};

export default CardMetricas;
