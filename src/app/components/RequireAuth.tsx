import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Garantindo que roles seja um array e convertendo papéis para string
  const roles = Array.isArray(auth?.roles) ? auth.roles.map((role: never) => String(role)) : [];

  // Verifica se algum dos papéis do usuário está incluído nos papéis permitidos
  const hasAccess = allowedRoles.length === 0 || roles.some((role: string) => allowedRoles.includes(role));

  // Adicionando logs para depuração
  console.log("Auth:", auth);
  // console.log("Roles:", roles);
  // console.log("Allowed Roles:", allowedRoles);
  // console.log("Has Access:", hasAccess);

  if (!auth?.accessToken) {
    console.log("User is not authenticated. Redirecting to /login.");
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (!hasAccess) {
    console.log("User does not have required roles. Redirecting to /unauthorized.");
    // Redireciona para uma página de acesso não autorizado se não tiver permissão
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    console.log("User has access. Rendering content.");
    // Renderiza o conteúdo protegido se autorizado
    return <Outlet />;
  }
};

export default RequireAuth;
