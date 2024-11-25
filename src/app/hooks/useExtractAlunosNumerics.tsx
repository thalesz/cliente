import { useEffect, useState } from "react";
import useDefineGraph from "./useDefineGraph";
import { Item, Itens, NumericProps } from "../interface/Metrica";
import useOrderByName from "./useOrderByName";

// Definindo um conjunto fixo de cores
const fixedColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];

const useExtractAlunosNumerics = (itens: Itens | undefined, text: string, grupo?: string) => {
    const [alunos, setAlunos] = useState<string[]>([]);
    const [numericProps, setNumericProps] = useState<NumericProps[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [traces, setTraces] = useState<any[]>([]);
    const [average, setAverage] = useState<number | null>(null); // Estado para armazenar a média
    const orderedData: Itens | undefined = useOrderByName(itens);
    const { tipo } = useDefineGraph(text);

    useEffect(() => {
        if (orderedData !== undefined && itens !== undefined) {
            const itensArray = Object.values(orderedData);
            
            // Filtra dados pelo grupo selecionado
            const dadosFiltrados = grupo ? itensArray.filter((item: Item) => item?.aluno?.grupo === grupo) : itensArray;
            const alunosNomes = dadosFiltrados.map((item: Item) => item?.aluno?.nome).filter(Boolean);
            setAlunos(alunosNomes);

            const numericProps: NumericProps[] = dadosFiltrados.map((item: Item) => {
                const numericKeys: NumericProps = {};
                Object.keys(item).forEach((key: string) => {
                    const value = item[key as keyof Item];
                    if (typeof value === 'number') {
                        numericKeys[key] = value;
                    }
                });
                return numericKeys;
            });
            setNumericProps(numericProps);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let data: any[] = [];
            if (tipo === 'pie') {
                // **Início da Modificação para Gráfico de Pizza**

                // Agregar todos os valores numéricos
                const allValues = numericProps.flatMap(props => Object.values(props));

                if (allValues.length > 0) {
                    // Calcular a média
                    const total = allValues.reduce((sum, val) => sum + val, 0);
                    const avg = total / allValues.length;
                    setAverage(avg); // Atualiza o estado da média

                    // Contar quantos valores estão acima e abaixo da média
                    const aboveCount = allValues.filter(val => val > avg).length;
                    const belowCount = allValues.filter(val => val <= avg).length;

                    // Configurar os dados do gráfico de pizza com duas fatias
                    data = [{
                        values: [aboveCount, belowCount],
                        labels: ['Acima da Média', 'Abaixo da Média'],
                        type: 'pie',
                        marker: {
                            colors: [fixedColors[0], fixedColors[1]], // Utiliza as duas primeiras cores fixas
                        },
                        opacity: 0.75,
                        textinfo: 'label+percent',
                        hoverinfo: 'label+percent'
                    }];
                } else {
                    // Caso não haja valores, manter vazio ou configurar conforme necessário
                    setAverage(null); // Nenhuma média disponível
                    data = [{
                        values: [0, 0],
                        labels: ['Acima da Média', 'Abaixo da Média'],
                        type: 'pie',
                        marker: {
                            colors: [fixedColors[0], fixedColors[1]],
                        },
                        opacity: 0.75,
                        textinfo: 'label+percent',
                        hoverinfo: 'label+percent'
                    }];
                }

                // **Fim da Modificação para Gráfico de Pizza**
            } else if (tipo === 'histogram') {
                // ... lógica existente para histograma
                data = numericProps.flatMap((props: NumericProps, index: number) => {
                    const x = Object.values(props);
                    const barWidth = alunosNomes.length <= 1 ? 0.5 : 1;

                    return [{
                        x: x,
                        type: 'histogram',
                        name: alunos[index] || 'Dados',
                        autobinx: true,
                        marker: {
                            color: fixedColors[index % fixedColors.length],
                            line: {
                                color: 'rgba(8,48,107,0.6)',
                                width: 1
                            }
                        },
                        opacity: 0.75,
                        xbins: {
                            size: barWidth
                        }
                    }];
                });
            } else if (tipo === 'bubble') {
                // ... lógica existente para gráfico de bolhas
                const allValues = numericProps.flatMap(props => Object.values(props));
                const valueCounts = allValues.reduce((acc, value) => {
                    acc[value] = (acc[value] || 0) + 1;
                    return acc;
                }, {} as Record<number, number>);

                const uniqueValues = Array.from(new Set(allValues));
                const x = uniqueValues;
                const size = uniqueValues.map(value => valueCounts[value] * 10);
                const text = uniqueValues.map(value => `Nota: ${value}<br>Quantidade: ${valueCounts[value]}`);

                data = [{
                    x: x,
                    y: x.map(value => value * 1.5),
                    mode: 'markers',
                    marker: {
                        size: size,
                        color: '#007bff',
                        line: {
                            color: 'rgba(8,48,107,0.6)',
                            width: 1
                        }
                    },
                    text: text,
                    textinfo: 'text',
                    opacity: 0.75,
                    name: 'Distribuição de Valores'
                }];
            } else if (numericProps.length > 0) {
                // ... lógica existente para outros tipos de gráficos
                data = Object.keys(numericProps[0]).map((propName: string, index: number) => {
                    const lowerPropName = propName.toLowerCase();

                    // Extraindo a lógica para determinar o nome em uma variável separada
                    const displayName = lowerPropName === 'compreensao' ? 'Compreensão (C)' :
                    lowerPropName === 'medianormal' ? 'Média Normal (MN)' :
                    lowerPropName === 'mediaponderada' ? 'Média Ponderada (MP)' :
                    lowerPropName === 'assertividade' ? 'Assertividade (A)' :
                    lowerPropName === 'temporesposta' ? 'Tempo de Resposta (TR)' :
                    lowerPropName === 'metrica_ws' ? 'Pontuação Ponderada (PP)' :
                    lowerPropName === 'metrica_ts' ? 'Pontuação Tradicional (PT)' :
                    lowerPropName === 'assurance_degree' ? 'Grau de Segurança (GS)' :
                    lowerPropName === 'qucl' ? 'Nível de Compreensão do Questionário (NCQ)' :
                    // Se nenhuma condição for atendida, capitaliza propName
                    propName.charAt(0).toUpperCase() + propName.slice(1).toLowerCase();


                    return {
                        x: alunosNomes,
                        y: numericProps.map((props: NumericProps) => props[propName]),
                        type: tipo,
                        name: displayName, // Usando a variável separada
                        marker: {
                            color: fixedColors[index % fixedColors.length],
                            line: {
                                color: 'rgba(8,48,107,0.6)',
                                width: 1
                            }
                        }
                    };
                });
            }

            setTraces(data);
        }
    }, [orderedData, tipo, itens, grupo, alunos]);

    return { alunos, numericProps, traces, average }; // Retorna a média
};

export default useExtractAlunosNumerics;
