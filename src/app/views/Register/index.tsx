import React, { useState, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Select from '../../components/Select'; // Certifique-se de que o caminho está correto
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthProvider';

const ROLE_CODES = {
  '2001': 'Usuário',
  '2002': 'Editor',
  '187': 'Administrador'
};

interface IFormState {
  username: string;
  password: string;
  role: string;
  error: string;
  success: string;
}

interface ApiError {
  message: string;
}

interface ApiResponse {
  success: string;
}

const Register: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Erro: Contexto de autenticação não disponível</div>;
  }

  const { auth } = authContext;

  const creatorName = auth.user || ''; 

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const axiosPrivate = useAxiosPrivate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formState, setFormState] = useState<IFormState>({
    username: '',
    password: '',
    role: '2001',
    error: '',
    success: ''
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prevState => ({ ...prevState, error: '', success: '' }));

    // Validações do formulário
    if (formState.username.length < 6) {
      setFormState(prevState => ({
        ...prevState,
        error: 'O nome de usuário deve ter pelo menos 6 caracteres.'
      }));
      return;
    }

    if (!/[A-Z]/.test(formState.password)) {
      setFormState(prevState => ({
        ...prevState,
        error: 'A senha deve conter pelo menos uma letra maiúscula.'
      }));
      return;
    }

    if (!/\d/.test(formState.password)) {
      setFormState(prevState => ({
        ...prevState,
        error: 'A senha deve conter pelo menos um número.'
      }));
      return;
    }

    if (formState.password.length < 8) {
      setFormState(prevState => ({
        ...prevState,
        error: 'A senha deve ter pelo menos 8 caracteres.'
      }));
      return;
    }

    try {
      const response = await axiosPrivate.post<ApiResponse>('/register', {
        user: formState.username,
        pwd: formState.password,
        userRoles: [formState.role],
      });

      if (response.status === 201) {
        setFormState(prevState => ({ ...prevState, success: 'Usuário criado com sucesso!' }));
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError<ApiError>;
        setFormState(prevState => ({
          ...prevState,
          error: error.response ? error.response.data.message : 'Ocorreu um erro inesperado.'
        }));
      } else {
        setFormState(prevState => ({
          ...prevState,
          error: 'Ocorreu um erro inesperado.'
        }));
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-8 max-w-md w-full">
      <h2 className="text-2xl font-semibold text-center mb-6">Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nome de Usuário:</label>
          <Input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formState.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha:</label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Função:</label>
          <Select
            id="role"
            value={formState.role}
            onChange={handleChange}
            options={ROLE_CODES}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="creatorName" className="block text-sm font-medium text-gray-700">Nome do Criador:</label>
          <Input
            type="text"
            id="creatorName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={creatorName}
            readOnly
          />
        </div>

        <Button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Criar Usuário
        </Button>
      </form>

      {formState.error && <div className="mt-4 text-red-500 text-center">{formState.error}</div>}
      {formState.success && <div className="mt-4 text-green-500 text-center">{formState.success}</div>}
    </div>
  );
};

export default Register;
