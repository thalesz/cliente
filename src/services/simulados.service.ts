import useAxiosPrivate from '../app/hooks/useAxiosPrivate';
import { ISimulado } from '../app/interface/Simulados';
import { useCallback } from 'react';

const useSimuladosService = () => {
  const axiosPrivate = useAxiosPrivate();

  // Use useCallback corretamente
  const getAllSimulados = useCallback(async (): Promise<ISimulado[]> => {
    try {
      const response = await axiosPrivate.get<ISimulado[]>('/simulado/all');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar simulados:', error);
      throw error;
    }
  }, [axiosPrivate]); // axiosPrivate estável como dependência

  return { getAllSimulados };
};

export default useSimuladosService;
