import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { AxiosError } from "axios";
import { AuthContext } from "../../context/AuthProvider";

const LOGIN_URL = '/auth';

function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from: { pathname: string } })?.from?.pathname || '/home';

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    if (auth?.accessToken) {
      setShowModal(true);
    }
  }, [auth]);

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
      console.log("Logout realizado com sucesso");
      navigate("/login");
      setShowModal(false);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data);

      const { accessToken, roles, id } = response.data;
      // console.log("Roles received:", roles);
      
      setAuth({ user, pwd, roles, id, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!(err instanceof AxiosError) || !err?.response) {
        setErrMsg('Sem resposta do servidor.');
      } else if (err.response?.status === 400) {
        setErrMsg('Nome de usuário ou senha ausentes.');
      } else if (err.response?.status === 401) {
        setErrMsg('Credenciais inválidas.');
      } else {
        setErrMsg('Falha no login. Tente novamente mais tarde.');
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded p-8 max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        {errMsg && (
          <p ref={errRef} className="text-red-500 text-center mb-4" aria-live="assertive">
            {errMsg}
          </p>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Você já está logado!</h2>
            <p className="mb-6">Deseja sair ou continuar?</p>
            <div className="flex justify-end gap-4">
              <Button onClick={handleLogout} variant="secundary">
                Logout
              </Button>
              <Button onClick={handleContinue}>
                Continuar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
