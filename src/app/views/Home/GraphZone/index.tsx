import React, { useEffect, useState } from "react";
import useMetricaService from "../../../../services/metrica.service";
import { Itens } from "../../../interface/Metrica";
import GraphMultiplasBarras from "../GraphMultiplasBarras";
import useFiltraPorDisciplina from "../../../hooks/useFiltraPorDisciplina";
import useFiltrarEOrdenarAlunos from "../../../hooks/useFiltrarEOrdenarAlunos";
import useFiltrarGrupos from "../../../hooks/useFiltrarGrupos";
import useFiltraPorId from "../../../hooks/useFiltraPorId";
import useFiltrarDisciplinas from "../../../hooks/useFiltrarDisciplinas";
import Dropdown from "../../../components/Dropdown2";
import Rotulo from "../../../components/Rotulo";
import ListaAlunosMarcados from "../../../components/ListaAlunosMarcados";
import TableAlunoSelect from "../../../components/TableAlunoSelect";
import UtilTable from "../UtilTable";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Button from "../../../components/Button";

// Importação do ModalComponent e do Formula
import ModalComponent from "../../../components/Modal";
import Formula from "../Formula";

interface GraphZoneProps {
  id_simulado: string;
  id_turma: string;
  id_disciplina: string[];
  metrica: string;
}

const GraphZone: React.FC<GraphZoneProps> = ({
  id_simulado,
  id_turma,
  id_disciplina,
  metrica,
}) => {
  const { getAllMetricas, getAssessingStudents } = useMetricaService();
  const [metricas, setMetricas] = useState<Itens>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const disciplinas = useFiltrarDisciplinas(metricas);
  const [disciplinaSelect, setDisciplinaSelect] = useState<string>("");

  useEffect(() => {
    setDisciplinaSelect(disciplinas[0]);
  }, [disciplinas]);

  const [alunosMarcados, setAlunosMarcados] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');

  const [grupoListaSelect, setGrupoListaSelect] = useState<string>('');
  const [grupoGraphSelect, setGrupoGraphSelect] = useState<string>('');
  const [modo, setModo] = useState<string>('');
  
  const resultadoFiltradoPorDisciplina = useFiltraPorDisciplina(metricas, disciplinaSelect);
  const alunosFiltrado = useFiltrarEOrdenarAlunos(resultadoFiltradoPorDisciplina, textInput, grupoListaSelect);
  const resultadoFiltrado = useFiltraPorId(resultadoFiltradoPorDisciplina, alunosMarcados);
  const grupos = useFiltrarGrupos(metricas); //como fazer o teste no graphzone2 console.log() use effect fazer console.log

  const [graficoTipo, setGraficoTipo] = useState('Barra');
  const tiposGrafico = metrica.includes('todas')
    ? [ 'Barra', 'Dispersão']
    : ['Barra', 'Dispersão',  'Bolha', 'Pizza', 'Histograma'];

  useEffect(() => {
    if (grupoGraphSelect !== '' && alunosFiltrado && modo=="metrica") {
      const alunosNoGrupo = alunosFiltrado.map(aluno => aluno.aluno._id);
      setAlunosMarcados((prev) => prev.filter(alunoId => alunosNoGrupo.includes(alunoId)));
    }
  }, [grupoGraphSelect, alunosFiltrado]);

  const fetchMetricas = async (retries = 3) => {
    setLoading(true);
    setError(null);
    try {
      console.log("entrei aqui");
      let data;
      data = await getAssessingStudents(id_turma, id_disciplina, id_simulado, metrica);
      setModo('metricas');
      setMetricas(data);
      console.log("dataaa", data);
      console.log("tipo de data", typeof(data));
    } catch (err) {
      console.error("Erro ao buscar métricas:", err);
      setError("Erro ao buscar métricas. Tente novamente.");
      if (retries > 0) {
        setTimeout(() => fetchMetricas(retries - 1), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetricas();
  }, [getAssessingStudents, getAllMetricas, id_disciplina, id_simulado, id_turma, metrica]);

  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-wrap 2xl:flex-nowrap w-full h-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full border border-gray-300">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="w-full h-full items-center justify-center">
            <div className="flex ">
              <GraphMultiplasBarras
                itens={resultadoFiltrado !== undefined ? resultadoFiltrado : resultadoFiltradoPorDisciplina}
                text={graficoTipo}
                grupo={grupoGraphSelect}
                tituloGraph={metrica} 
              />
            </div>

            <div className="flex justify-between items-center space-x-6">
              <div className="flex space-x-4 w-full">
                <div className="flex no-wrap w-full justify-around">
                  <Dropdown
                    label="Tipo de Gráfico"
                    options={tiposGrafico}
                    selectedValue={graficoTipo}
                    setSelectedValue={setGraficoTipo}
                    id="tipo-grafico"
                  />
                  <Dropdown
                    label="Selecione o Grupo"
                    options={grupos}
                    selectedValue={grupoGraphSelect}
                    setSelectedValue={setGrupoGraphSelect}
                    id="grupo-select"
                    placeholder="Todos"
                  />
                  <Dropdown
                    label="Disciplina"
                    options={disciplinas}
                    selectedValue={disciplinaSelect}
                    setSelectedValue={setDisciplinaSelect}
                    id="disciplina-select"
                  />
                </div>
                <div className="">
                  <Button 
                    variant="custom" 
                    className="text-xs px-2 py-1"
                    onClick={openModal}
                  >
                    Formula
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-2 w-full h-full">
            <div className="flex space-x-4 w-full justify-evenly">
              <Rotulo
                titulo="Grupo Atual: "
                atual={grupoGraphSelect}
                iconeUrl="/img/equipe.png"
              />
              <Rotulo
                titulo="Disciplina Atual: "
                atual={disciplinaSelect}
                iconeUrl="/img/estudar.png"
              />
            </div>
            {modo !== 'priority' && (
              <>
                <ListaAlunosMarcados
                  resultado={metricas}
                  alunosMarcados={alunosMarcados}
                  desmarcarAluno={(id: string) => setAlunosMarcados(prev => prev.filter(alunoId => alunoId !== id))}
                  grupoAtual={grupoListaSelect}
                />
                <TableAlunoSelect
                  resultado={alunosMarcados.length ? alunosFiltrado : metricas}
                  setAlunosMarcados={setAlunosMarcados}
                  alunosMarcados={alunosMarcados}
                />
                <UtilTable
                  setTextInput={setTextInput}
                  textInput={textInput}
                  grupos={grupos}
                  setGrupoSelect={setGrupoListaSelect}
                  grupo={grupoGraphSelect}
                />
              </>
            )}
          </div>

          {/* Renderiza o ModalComponent com o Formula dentro */}
          {isModalOpen && (
            <ModalComponent
              title="Fórmula"
              openImmediately={isModalOpen}
              setClose={closeModal}
            >
              <Formula metrica={metrica} />
            </ModalComponent>
          )}
        </>
      )}
    </div>
  );
};

export default GraphZone;