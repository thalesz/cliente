// src/app/views/NotFound.js
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200 text-slate-950">
      <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
      <Button
        variant="primary"
        onClick={() => navigate(-1)} // Navega para a página anterior
      >
        Voltar
      </Button>
    </div>
  );
};

export default NotFound;
