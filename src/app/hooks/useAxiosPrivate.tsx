import { useEffect } from 'react';
import { AxiosInstance } from 'axios';
import useRefreshToken from './UseRefreshToken';
import useAuth from './useAuth';
import { axiosPrivate } from '../api/axios';

const useAxiosPrivate = (): AxiosInstance => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    // Interceptor de requisição para adicionar o token JWT
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // Adiciona o token JWT ao cabeçalho Authorization se não estiver presente
        if (!config.headers['Authorization'] && auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor de resposta para lidar com token expirado e tentar o refresh
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response, // Retorna a resposta original em caso de sucesso
      async (error) => {
        const prevRequest = error?.config;

        // Se a resposta for 403 (proibido), realiza logout
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          if (prevRequest) prevRequest.sent = true; // Evita loop de repetição
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { logout } = useAuth();
          if (logout) {
            logout();
            console.log("Logout realizado devido ao erro 403.");
          }
          return Promise.reject(error); // Propaga o erro para que possa ser tratado
        }

        // Se a resposta for 440 (sessão expirada) e a requisição ainda não foi reenviada
        if (error?.response?.status === 440 && !prevRequest?.sent) {
          prevRequest.sent = true;  // Evita loop de repetição
          try {
            const newAccessToken = await refresh(); // Atualiza o token
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Atualiza o cabeçalho com o novo token
            return axiosPrivate(prevRequest); // Reenvia a requisição original
          } catch (refreshError) {
            return Promise.reject(refreshError); // Caso o refresh falhe, propaga o erro
          }
        }

        return Promise.reject(error); // Propaga qualquer outro erro
      }
    );

    // Ejetar interceptores ao desmontar o componente
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
