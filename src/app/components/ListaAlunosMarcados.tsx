import React from 'react';
import { Item, Itens } from '../interface/Metrica';

interface ListaAlunosMarcadosProps {
    resultado: Itens | undefined;
    alunosMarcados: string[];
    desmarcarAluno: (id: string) => void;
    grupoAtual: string;
}

const ListaAlunosMarcados: React.FC<ListaAlunosMarcadosProps> = ({ resultado, alunosMarcados, desmarcarAluno, grupoAtual }) => {
    // Verificando o estado dos dados recebidos
    // console.log('resultado:', resultado);
    // console.log('alunosMarcados:', alunosMarcados);
    // console.log('grupoAtual:', grupoAtual);

    if (!resultado) {
        return <div className="text-center text-gray-500 py-4">Nenhum dado disponível.</div>;
    }

    // Filtrando os alunos marcados
    // Usar Set para garantir que os alunos não se repitam
    const alunosMarcadosDetalhes = resultado
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((item: Item|any) => alunosMarcados.includes(item.aluno._id.toString()))
    .reduce((acc: Item[], current: Item) => {
        const alunoJaAdicionado = acc.some((item) => item.aluno._id === current.aluno._id);
        if (!alunoJaAdicionado) {
            acc.push(current);
        }
        return acc;
    }, [])
    .sort((a: Item, b: Item) => a.aluno.nome.localeCompare(b.aluno.nome)); // Ordenar por nome



    // Verificando os alunos marcados após o filtro
    // console.log('alunosMarcadosDetalhes:', alunosMarcadosDetalhes);

    // Filtrando os alunos pelo grupo atual
    const alunosFiltradosPorGrupo = grupoAtual === 'Todos' || !grupoAtual
        ? alunosMarcadosDetalhes
        : alunosMarcadosDetalhes.filter((item: Item) => item.aluno.grupo === grupoAtual);

    // Verificando os alunos após o filtro pelo grupo
    // console.log('alunosFiltradosPorGrupo:', alunosFiltradosPorGrupo);

    return (
        <div className="flex flex-col h-[250px] p-4 bg-gray-100 rounded-lg shadow-md mb-2">
            <div className="flex flex-col" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                <h2 className="text-lg font-bold text-gray-700 text-center border-b-2 border-gray-200 pb-2 mb-4">Visualizado no Momento</h2>
                {alunosFiltradosPorGrupo.length > 0 ? (
                    <div className="flex-1 overflow-y-auto">
                        <table className="table-auto h- w-full">
                            <tbody>
                                {alunosFiltradosPorGrupo.map((item: Item) => (
                                    <tr key={item.aluno._id}>
                                        <td className="px-4 py-2 border-b border-gray-300 text-gray-600">{item.aluno.nome}</td>
                                        <td className="px-4 py-2 border-b border-gray-300 text-right">
                                            <button 
                                                onClick={() => desmarcarAluno(item.aluno._id.toString())} 
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full transition duration-300"
                                            >
                                                &times;
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">Nenhum aluno marcado neste grupo.</p>
                )}
            </div>
        </div>
    );
}

export default ListaAlunosMarcados;
