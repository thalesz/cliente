import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const goToHome = () => {
    navigate("/home"); // Navega para a página inicial
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
      <p className="text-lg mb-8">Você não tem permissão para acessar esta página.</p>
      <div>
        <button
          onClick={goBack}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
        >
          Voltar
        </button>
        <button
          onClick={goToHome}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ir para a Página Inicial
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
