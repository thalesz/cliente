// Importanto biblioteca responsável por requisições HTTP
import http from "../http-cammon"


interface DataLogin {
  email: string;
  password: string;
}

interface ReturnLogin {
  result: { acessToken: string };
  user: { email: string; username: string; id: number };
}

interface SaveLoginUser {
  acessToken: string;
  user: { email: string; username: string; id: number };
}

// Definindo o bjeto do serviço
const authService = {
  // Definindo a função de login
  async authenticate(data: DataLogin) {
    const response = await http.post<ReturnLogin>("/login", data);

    return response.data;
  },

  // Função para salvar o usuário logado no local storage
  setLoggedUser(data: ReturnLogin) {
    const parsedData = JSON.stringify(data);
    localStorage.setItem("user", parsedData);
  },

  // Função responsável por recuperar o usuário logado do local storage
  getLoggedUser() {
    const data = localStorage.getItem("user");
    if (!data) return null;
    try {
      const parsedData: SaveLoginUser = JSON.parse(data);
      return parsedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  cleanLoggedUser() {
    localStorage.clear();
  },
};

export default authService;