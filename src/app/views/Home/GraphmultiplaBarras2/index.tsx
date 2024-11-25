import React from "react";
import Plot from 'react-plotly.js';

interface Prioridade {
    nome: string; // Nome da disciplina
    [key: string]: number | string; // Valor da prioridade ou outras métricas
}

interface GraphMultiplasBarras2Props {
    filtradosPriority: Prioridade[];
    tipoGrafico: string; // Tipo do gráfico (ex.: 'bar', 'scatter')
    cores?: string[]; // Opção para definir as cores das barras
    titulo?: string; // Título do gráfico
}

const GraphMultiplasBarras2: React.FC<GraphMultiplasBarras2Props> = ({
    filtradosPriority,
    tipoGrafico = 'bar',
    cores = ['RGB'],
    titulo = 'Prioridade por Disciplina'
}) => {
    if (!filtradosPriority || filtradosPriority.length === 0) {
        return <p>Nenhuma métrica disponível para exibir.</p>;
    }

    // Preparando os dados para o gráfico
    const nomes = filtradosPriority.map(item => item.nome);
    const metricas = Object.keys(filtradosPriority[0]).filter(key => key !== 'nome');

    // Gerar as séries de dados dinamicamente com base nas métricas encontradas
    const data = metricas.map((metrica, index) => ({
        x: nomes,
        y: filtradosPriority.map(item => typeof item[metrica] === 'number' ? item[metrica] : 0),
        type: tipoGrafico,
        name: metrica,
        marker: { color: cores[index % cores.length] }, // Cicla cores fornecidas
    }));

    return (
        <div>
            <Plot
                data={data}
                layout={{
                    width: 800,
                    height: 500,
                    title: titulo,
                    xaxis: { title: 'Disciplinas' },
                    yaxis: { title: 'Valores' },
                    margin: { t: 50, l: 50, r: 50, b: 100 },
                }}
            />
        </div>
    );
};

export default GraphMultiplasBarras2;
