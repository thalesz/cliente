// services/metrica.service.ts
import useAxiosPrivate from '../app/hooks/useAxiosPrivate';
import { Itens } from '../app/interface/Metrica';
import { useCallback } from 'react';
import { Prioridades } from '../app/interface/Prioridade';

// Exportando a função titulo separadamente
export const titulo = (metrica: string) => {

  switch (metrica) {
    case 'compreensao':
      return 'Compreensão (C)';
    case 'medianormal':
      return 'Média Normal (MN)';
    case 'mediaponderada':
      return 'Média Ponderada (MP)';
    case 'assertividade':
      return 'Assertividade (A)';
    case 'temporesposta':
      return 'Tempo de Resposta (TR)';
    case 'metrica_ws':
      return 'Pontuação Ponderada (WS)';
    case 'metrica_ts':
      return 'Pontuação Tradicional (TS)';
    case 'assurance_degree':
      return 'Grau de Segurança (GS)';
    case 'qucl':
      return 'Nível de Compreensão do Questionário (NCQ)';
    case 'assessingStudents':
      return 'Analise de estudantes'
    default:
      return 'Gráfico de Dados';
  }
};
// metrica.service.ts

export const caminho = (metrica: string): string[] | "N/A" => {
  switch(metrica){
    case 'metrica_ws':
      return ["/img/ws.PNG"];
    case 'metrica_ts':
      return ["/img/ts.PNG"];
    case 'assurance_degree':
      return ["/img/ad.PNG"];
    case 'qucl':
      return ["/img/qucl.PNG"];
    case 'assessingStudents':
      return ["/img/ws.PNG", "/img/ts.PNG", "/img/ad.PNG", "/img/qucl.PNG"]; // Ajuste conforme necessário
    default:
      return 'N/A'; // Retorna "N/A" para casos desconhecidos
  }
}


export const sigla = (metrica: string) => {
  switch (metrica) {
    case 'compreensao':
      return 'C';
    case 'medianormal':
      return 'Média Normal';
    case 'mediaponderada':
      return 'Média Ponderada';
    case 'assertividade':
      return 'Assertividade';
    case 'temporesposta':
      return 'Tempo Resposta';
    case 'metrica_ws':
      return 'Pontuação ponderada';
    case 'metrica_ts':
      return 'Pontuação Total';
    case 'assurance_degree':
      return 'Grau de Segurança';
    case 'qucl':
      return 'Compreensão';
    case 'assessingStudents':
      return 'Métricas'; // Sigla fictícia para "Análise de estudantes", ajustar conforme necessário
    default:
      return 'N/A'; // Sigla padrão para casos desconhecidos
  }
};


const useMetricaService = () => {
  const axiosPrivate = useAxiosPrivate();

  const filtrarDisciplinas = (resultado: Itens | undefined): string[] => {
    if (!resultado || !Array.isArray(resultado)) return [];

    const disciplinasTemp = resultado
      .filter(item => item.nomedisciplina)
      .map(item => item.nomedisciplina);

    const disciplinasSet = new Set(disciplinasTemp);
    return Array.from(disciplinasSet);
  };

  const getAllMetricas = useCallback(async (
    turmaId: string, 
    disciplinaIds: string[], 
    simuladoId: string, 
    metricas: string
  ): Promise<Itens> => {
    try {
      const response = await axiosPrivate.get<Itens>(
        `/metrica?selectTurmaId=${turmaId}&selectDisciplinaId=${JSON.stringify(disciplinaIds)}&selectSimuladoId=${simuladoId}&metrica=${JSON.stringify(metricas)}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw error;
    }
  }, [axiosPrivate]);

  const getAssessingStudents = useCallback(async (
    turmaId: string, 
    disciplinaIds: string[], 
    simuladoId: string, 
    metricas: string
  ): Promise<Itens> => {
    try {
      const cleanedMetrica = typeof metricas === 'string' ? metricas.replace(/^"+|"+$/g, '') : metricas;

      const response = await axiosPrivate.get<Itens>('/asseting', {
        params: {
          selectTurmaId: turmaId,
          selectDisciplinaId: JSON.stringify(disciplinaIds),
          selectSimuladoId: simuladoId,
          metrica: cleanedMetrica
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw error;
    }
  }, [axiosPrivate]);

  const getPriority = useCallback(async (
    turmaId: string, 
    disciplinaIds: string[], 
    simuladoId: string, 
    // metricas: string
  ): Promise<Prioridades> => {
    try {
      // const cleanedMetrica = typeof metricas === 'string' ? metricas.replace(/^"+|"+$/g, '') : metricas;

      const response = await axiosPrivate.get<Prioridades>('/priority', {
        params: {
          selectTurmaId: turmaId,
          selectDisciplinaId: JSON.stringify(disciplinaIds),
          selectSimuladoId: simuladoId,
          // metrica: cleanedMetrica
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw error;
    }
  }, [axiosPrivate]);

  return { getAllMetricas, getAssessingStudents, filtrarDisciplinas, getPriority };
};

export default useMetricaService;
