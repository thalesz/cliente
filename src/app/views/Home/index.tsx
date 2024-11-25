import React, { useContext, useEffect, useState } from 'react';
import BtnExit from '../../components/BtnExit';
import { AuthContext } from '../../context/AuthProvider';
import useSimuladosService from '../../../services/simulados.service';
import { Simulados } from '../../interface/Simulados';
import BoxButtonHome from './BoxTags';
import SimuladoBox from './SimuladoBox';
import LoadingSpinner from '../../components/LoadingSpinner';

const Home: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { getAllSimulados } = useSimuladosService();
  const [simulados, setSimulados] = useState<Simulados>([]);
  const [loading, setLoading] = useState(true);
  const [selectTag, setSelectTag] = useState("Todas");

  const nomes = ["Todas", "Média", "Análise", "Assertividade", "Compreensão", "Tempo", "Informação", "Dúvida", "Métricas"];

  const fetchSimulados = async () => {
    try {
      const data = await getAllSimulados();
      setSimulados(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 440) {
        console.error('Sessão expirada. Tentando novamente...');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchSimulados();
      } else {
        console.error('Erro ao buscar simulados:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchSimulados();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Exibe o spinner enquanto está carregando
  if (loading) return <LoadingSpinner />;

  return (
    <div className='grid grid-cols-1 gap-4 p-5 mx-auto w-full max-w-10xl'> {/* Ajuste max-w */}
      <div className="col-span-full">
        <BoxButtonHome nomes={nomes} select={selectTag} setSelect={setSelectTag} />
      </div>
      <div>
        {simulados.map((simulado, index) => (
          <div className="w-full" key={simulado._id}> {/* Adicionei uma largura fixa */}
            <SimuladoBox simulado={simulado} index={index} select={selectTag} />
          </div>
        ))}
      </div>
      <div className="col-span-full">
        <BtnExit />
      </div>
    </div>
  );
};

export default Home;
