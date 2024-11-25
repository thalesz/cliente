import axios from 'axios';

const BASE_URL = 'https://signalserver187.azurewebsites.net'; // Trocar a URL aqui pra quando subir para produção

// Nomeando as instâncias de axios para exportação
const axiosInstance = axios.create({
    baseURL: BASE_URL
});
''
const axiosPrivateInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }, 
    withCredentials: true
});

export default axiosInstance;
export const axiosPrivate = axiosPrivateInstance;
