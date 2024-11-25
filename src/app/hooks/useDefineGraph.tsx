import { useEffect, useState } from "react";

// Defina os tipos de gráficos suportados pelo Plotly
type PlotlyGraphType = 'scatter' | 'bar' | 'bubble' | 'pie' | 'histogram';

const useDefineGraph = (text: string) => {
    const [tipo, setTipo] = useState<PlotlyGraphType | null>(null);

    useEffect(() => {
        console.log("Tipo recebido:", text);

        // Mapeia os textos para os tipos de gráficos correspondentes
        let novoTipo: PlotlyGraphType | null = null;

        switch (text) {
            case 'Dispersão':
                novoTipo = 'scatter';
                break;
            case 'Barra':
                novoTipo = 'bar';
                break;
            case 'Bolha':
                novoTipo = 'bubble';
                break;
            case 'Pizza':
                novoTipo = 'pie';
                break;
            case 'Histograma':
                novoTipo = 'histogram';
                break;
            default:
                novoTipo = null; // Tipo padrão se não corresponder a nenhum caso
        }

        setTipo(novoTipo);
    }, [text]);

    return { tipo };
}

export default useDefineGraph;
