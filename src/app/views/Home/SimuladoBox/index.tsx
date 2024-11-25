import { useEffect, useState } from "react";
import { ISimulado } from "../../../interface/Simulados";
import TitleSubtitle from "../TitleSubtitle";
import Carousel from "../../../components/Carousel";
import ModalComponent from "../../../components/Modal";
import Help from "../Help";

interface SimuladoBoxProps {
  simulado: ISimulado;
  index: number;
  select: string;
}

const SimuladoBox: React.FC<SimuladoBoxProps> = ({ simulado, index, select }) => {
  const disciplinasString = simulado ? simulado.disciplinas.join(', ') : '';
  
  const [turmas, setTurmas] = useState<string[]>([]);
  const [idTurmas, setIdTurmas] = useState<string[]>([]);
  const [idDisciplina, setIdDisciplina] = useState<string[]>([]);


  useEffect(() => {
    if (simulado !== undefined) {
      setTurmas(simulado.turmas || []);
      setIdTurmas(simulado.id_turmas || []);
      setIdDisciplina(simulado.id_disciplinas || []);
    }
  }, [simulado]);

  return (
    <div className="flex flex-col w-full">
      {/* Primeiro bloco - Título e subtítulo */}
      <div className="flex justify-between items-center w-full">
        <TitleSubtitle
          title={`Resultado - ${simulado.descricao}`}
          subtitle={`${simulado.data} - ${disciplinasString} - ${simulado.nomeProfessor}`}
        />
        {/* Texto para abrir o modal apenas para o primeiro item */}
        {index === 0 && (
          <div className="ml-4">
            <ModalComponent title="Como funcionam as métricas?">
              <Help />
            </ModalComponent>
          </div>
        )}
      </div>

      {/* Segundo bloco - Mapeamento dos dados filtrados */}
      <div className="w-full">
        {simulado !== undefined && idTurmas.map((turma, i) => (
          <div key={i}>
            <div>
              <TitleSubtitle subtitle={turmas[i]} />
            </div>
            <Carousel
              select={select}
              idSimulado={simulado._id}
              idTurma={turma}
              idDisciplina={idDisciplina}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimuladoBox;
