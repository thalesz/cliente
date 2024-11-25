/* eslint-disable no-case-declarations */
import React from "react";

interface EstatisticasProps {
    data: number[]; // Supondo que 'data' seja um array de números
}

const Estatisticas: React.FC<EstatisticasProps> = ({ data }) => {
    const [selectedStat, setSelectedStat] = React.useState<string>("Média");

    // Função para calcular as estatísticas
    const calculateStat = () => {
        if (data.length === 0) return null;

        switch (selectedStat) {
            case "Média":
                return (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
            case "Mediana":
                const sorted = [...data].sort((a, b) => a - b);
                const mid = Math.floor(sorted.length / 2);
                return sorted.length % 2 !== 0
                    ? sorted[mid].toFixed(2)
                    : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
            case "Desvio Padrão":
                const mean = data.reduce((a, b) => a + b, 0) / data.length;
                const variance =
                    data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
                return Math.sqrt(variance).toFixed(2);
            case "Variância":
                const meanForVariance = data.reduce((a, b) => a + b, 0) / data.length;
                return (
                    data.reduce((a, b) => a + Math.pow(b - meanForVariance, 2), 0) /
                    data.length
                ).toFixed(2);
            case "Soma Total":
                return data.reduce((a, b) => a + b, 0).toFixed(2);
            // Adicione mais estatísticas conforme necessário
            default:
                return null;
        }
    };

    const statisticsOptions = [
        "Média",
        "Mediana",
        "Desvio Padrão",
        "Variância",
        "Soma Total",
        // Adicione mais opções conforme necessário
    ];

    return (
        <div className="absolute left-0 top-4 bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md z-10">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Estatísticas</h3>
            <select
                value={selectedStat}
                onChange={(e) => setSelectedStat(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2"
            >
                {statisticsOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <p className="text-2xl font-bold text-blue-500">
                {calculateStat() !== null ? calculateStat() : "N/A"}
            </p>
        </div>
    );
};

export default Estatisticas;
