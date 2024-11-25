import React, { useEffect, useState } from "react";
import useMetricaService from "../../../../services/metrica.service";
import LoadingSpinner from "../../../components/LoadingSpinner";
import GraphMultiplasBarras2 from "../GraphmultiplaBarras2";
import { Prioridades } from "../../../interface/Prioridade";
import useFilterPriority from "../../../hooks/useFilterPriority";
import Dropdown from "../../../components/Dropdown2";
import useFilterTempo from "../../../hooks/userFilterTempo";
import userFilterDesordem from "../../../hooks/userFilterDesordem";

// Componente separado para evitar o uso condicional de hooks
const FilteredGraph: React.FC<{ metricas: Prioridades }> = ({ metricas }) => {
    const filteredMetricas = useFilterPriority(metricas); // Hook é usado sem condicional aqui
    console.log("estou aqui no Geral",filteredMetricas)
    return (
        <GraphMultiplasBarras2
            filtradosPriority={filteredMetricas}
            tipoGrafico="bar"
        />
    );
};
const FilteredGraph2: React.FC<{ metricas: Prioridades }> = ({ metricas }) => {
    const filteredMetricas = useFilterTempo(metricas); // Hook é usado sem condicional aqui
    console.log("estou aqui no Por tempo",filteredMetricas)
    return (
        <GraphMultiplasBarras2
            filtradosPriority={filteredMetricas}
            tipoGrafico="bar"
            titulo = 'Analise por Tempo'
        />
    );
};
const FilteredGraph3: React.FC<{ metricas: Prioridades }> = ({ metricas }) => {
    const filteredMetricas = userFilterDesordem(metricas); // Hook é usado sem condicional aqui
    console.log("estou aqui nas Desordem",filteredMetricas)
    return (
        <GraphMultiplasBarras2
            filtradosPriority={filteredMetricas}
            tipoGrafico="bar"
            titulo = 'Analise por Tempo'
        />
    );
};

interface GraphZone2Props {
    id_simulado: string;
    id_turma: string;
    id_disciplina: string[];
    metrica: string;
}

const GraphZone2: React.FC<GraphZone2Props> = ({
    id_simulado,
    id_turma,
    id_disciplina,
    metrica,
}) => {
    const { getPriority } = useMetricaService();
    const [metricas, setMetricas] = useState<Prioridades | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [tipoAnalise, setTipoAnalise] = useState<string>('Prioridade Geral');

    const fetchMetricas = async (retries = 3) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPriority(id_turma, id_disciplina, id_simulado);
            setMetricas(data);
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
    }, [id_disciplina, id_simulado, id_turma, metrica]);

    return (
        <div className="flex flex-wrap 2xl:flex-nowrap w-full h-auto">
            {loading ? (
                <div className="flex justify-center items-center h-full w-full border border-gray-300">
                    <LoadingSpinner />
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="w-full h-full items-center justify-center">
                    <div className="flex">
                        {tipoAnalise === 'Prioridade Geral' && metricas && (
                            <FilteredGraph metricas={metricas} />
                        )}
                        {tipoAnalise === 'Analise por tempo' && metricas && (
                            <FilteredGraph2 metricas={metricas} />
                        )}
                        {tipoAnalise === 'Metricas em gerais' && metricas && (
                            <FilteredGraph3 metricas={metricas}/>
                        )}
                    </div>

                    {/* Adição dos Dropdowns */}
                    <div className="flex justify-between items-center space-x-6 mt-4">
                        <Dropdown
                            label="Tipo de Analise"
                            options={['Prioridade Geral', 'Analise por tempo', 'Metricas em gerais']}
                            selectedValue={tipoAnalise}
                            setSelectedValue={setTipoAnalise}
                            id="tipo-analise"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GraphZone2;
