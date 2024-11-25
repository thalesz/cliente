// GraphMultiplasBarras.tsx
import React from "react";
import Plot from 'react-plotly.js';
import useExtractAlunosNumerics from "../../../hooks/useExtractAlunosNumerics";
import { Itens } from "../../../interface/Metrica";
import Estatisticas from "../GraphZone/estatistica";
import { titulo,  sigla } from '../../../../services/metrica.service'; // Importação nomeada


export interface GraphMultiplasBarrasProps {
    itens?: Itens | undefined;
    text: string;
    tituloGraph?: string;
    grupo?: string;
}

// Hook para obter as dimensões da janela
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = React.useState({ width: window.innerWidth, height: window.innerHeight });

    React.useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
};

const GraphMultiplasBarras: React.FC<GraphMultiplasBarrasProps> = ({ itens, text, grupo, tituloGraph }) => {
    const { traces, average } = useExtractAlunosNumerics(itens, text, grupo);
    const { width, height } = useWindowDimensions();

    if (!itens || itens.length === 0) {
        return <div>No data available.</div>;
    }

    const isBubbleChart = traces.some((trace: { mode: string; }) => trace.mode === 'markers');
    const isPieChart = traces.length === 1 && traces[0].type === 'pie';

    const graphWidth = width < 1300 ? width * 0.9 : 1300;
    const graphHeight = width < 900 ? height * 0.5 : 600;

    const generateLayout = () => {
        let title = titulo(tituloGraph || "Gráfico de Dados");
        const siglaa = sigla(tituloGraph || "Métrica")

        if (isPieChart) {
            title = "Distribuição de Dados";
        }

        const baseLayout: Partial<Plotly.Layout> = {
            width: graphWidth,
            height: graphHeight,
            bargap: 0.2,
            barmode: 'group',
            title: title,
            xaxis: {
                title: 'Alunos',
                automargin: true,
                tickmode: 'linear',
                tickangle: -45,
            },
            yaxis: {
                title: isBubbleChart ? 'Quantidade de Alunos' : siglaa
            },
            legend: {
                orientation: 'h',
                y: -0.15,
                font: {
                    family: 'Arial, sans-serif',
                    size: 10,
                    color: 'grey',
                }
            },
            margin: {
                t: 50,
                l: 50,
                r: 50,
                b: 100
            }
        };

        return baseLayout;
    };

    return (
        <div className="relative flex flex-col items-center w-full h-full">
            {isPieChart && average !== null && (
                <Estatisticas data={[]}></Estatisticas>
            )}
            <Plot
                className="marginGraph"
                data={traces}
                layout={generateLayout()}
            />
        </div>
    );
};

export default GraphMultiplasBarras;
