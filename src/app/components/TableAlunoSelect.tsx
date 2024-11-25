/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import useCheckboxSelection from '../hooks/UseCheckboxSelection';
import { Itens } from '../interface/Metrica';

interface TableListAlunoSelectProps {
  resultado: Itens | undefined;
  alunosMarcados: string[];
  setAlunosMarcados: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableAlunoSelect: React.FC<TableListAlunoSelectProps> = ({ resultado, alunosMarcados, setAlunosMarcados }) => {
  const { handleCheckboxChange } = useCheckboxSelection(setAlunosMarcados, alunosMarcados);

  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto max-h-[240px] bg-white flex-1">
        <div className="overflow-x-auto">
          <table className="bg-white border border-gray-200 min-w-[500px]">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border px-1 py-1 w-[40px]"></th> {/* Reduzi a largura e padding */}
                <th className="text-center align-middle border px-4 py-2">Aluno</th>
                {resultado && resultado.length > 0 && Object.keys(resultado[0]).map((key: string) => {
                  if (key !== 'aluno' && key !== 'id_disciplina' && key !== 'nomedisciplina') {
                    const sigla = 
                      key === 'nome_disciplina' ? 'Disciplina' :
                      key === 'compreensao' ? 'Comp.' :
                      key === 'mediaPond' ? 'MP' :
                      key === 'mediaNormal' ? 'MN' :
                      key === 'assertividade' ? 'Assert.' :
                      key === 'tempoResposta' ? 'TR' :
                      key === 'metrica_ws' ? 'WS' :
                      key === 'metrica_ts' ? 'TS' :
                      key === 'assurance_degree' ? 'AD' :
                      key === 'qucl' ? 'QuCL' :
                      key.charAt(0).toUpperCase() + key.slice(1);
                    
                    const descricaoCompleta =
                      key === 'nome_disciplina' ? 'Disciplina' :
                      key === 'compreensao' ? 'Compreensão (Proeficiência) / Understanding (Proficiency)' :
                      key === 'mediaPond' ? 'Média Ponderada / Weighted Average' :
                      key === 'mediaNormal' ? 'Média Normal / Regular Average' :
                      key === 'assertividade' ? 'Assertividade (Acertos por Simulado) / Assertiveness (Correct Answers per Simulation)' :
                      key === 'tempoResposta' ? 'Tempo médio(s) / Average Response Time (seconds)' :
                      key === 'metrica_ws' ? 'Weighted Score (WS) / Pontuação Ponderada' :
                      key === 'metrica_ts' ? 'Tradicional Score (TS) / Pontuação Tradicional' :
                      key === 'assurance_degree' ? 'Assurance Degree (AD) / Grau de Segurança' :
                      key === 'qucl' ? 'Questionnaire Comprehension Level (QuCL) / Nível de Compreensão do Questionário' :
                      key.charAt(0).toUpperCase() + key.slice(1);

                    return (
                      <th className="text-center align-middle border px-4 py-2" key={key} title={descricaoCompleta}>
                        {sigla}
                      </th>
                    );
                  }
                  return null;
                })}
              </tr>
            </thead>
            <tbody className='bg-white'>
              {resultado && resultado.length > 0 ? (
                resultado.map((item: any, index: any) => {
                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="text-center align-middle border px-1 py-1 w-[40px]"> {/* Reduzi a largura e padding */}
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(item.aluno._id)}
                          checked={alunosMarcados.includes(item.aluno._id.toString())}
                        />
                      </td>
                      <td className="text-center align-middle border px-4 py-2">{item.aluno.nome}</td>
                      {Object.keys(item).map((key: string) => {
                        if (key !== 'aluno' && key !== 'id_disciplina' && key !== 'nomedisciplina') {
                          const value = item[key];
                          const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
                          return (
                            <td className="text-center align-middle border px-1 py-2" key={key}>
                              {displayValue}
                            </td>
                          );
                        }
                        return null;
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center align-middle border px-4 py-2">Sem dados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableAlunoSelect;
