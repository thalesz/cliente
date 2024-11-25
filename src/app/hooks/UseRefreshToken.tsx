/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom'; // Para navegação em React
import { AuthContext } from '../context/AuthProvider';

const useRefreshToken = (): (() => Promise<string>) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate(); // Hook para navegação
  const authContext = useContext(AuthContext);

  const refresh = async (): Promise<string> => {
    try {
      const response = await axios('/refresh', {
        withCredentials: true,
      });

      // Atualizar o estado de autenticação
      setAuth((prev: any) => ({
        ...prev,
        accessToken: response.data.accessToken,
      }));

      return response.data.accessToken;

    } catch (error: any) {
      console.error("Error refreshing token:", error);

      // Verifica se o erro é um token expirado
      if (error.response?.status === 403) {
        // Executa o logout e redireciona para a página de login
        if (authContext && authContext.logout) {
          authContext.logout();
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          navigate('/login');
        } else {
          console.error("AuthContext ou logout não estão definidos.");
        }
      } else {
        // Alerta para outros erros
        // alert('Ocorreu um erro ao tentar atualizar a sessão.');
      }

      throw error; // Propaga o erro para que possa ser tratado por quem chama a função
    }
  };

  return refresh;
};

export default useRefreshToken;
