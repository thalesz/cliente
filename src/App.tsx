import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./app/views/Home";
import Login from "./app/views/Login";
import Layout from "./app/components/Layout";
import RequireAuth from "./app/components/RequireAuth";
import Users from "./app/views/User";
import Register from "./app/views/Register";
import Unauthorized from "./app/components/Unauthorized";
import NotFound from "./app/views/NotFound"; // Importando o componente NotFound
import useAuth from "./app/hooks/useAuth";
import Rotas from "./app/views/Rotas";

const ROLES = {
  User: "2001",
  Editor: "2002",
  Admin: "187",
};

const RedirectBasedOnAuth = () => {
  const { auth } = useAuth();

  if (auth?.accessToken && auth.roles && auth.roles.length > 0) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RedirectBasedOnAuth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <RequireAuth allowedRoles={[]} />,
        children: [
          { path: "", element: <Home /> },
        ],
      },
      {
        path: "all",
        element: <RequireAuth allowedRoles={[]} />,
        children: [
          { path: "users", element: <Users /> },

        ],
      },
      {
        path: "admin",
        element: <RequireAuth allowedRoles={[ROLES.Admin]} />,
        children: [
          { path: "register", element: <Register /> },
          { path: "rotas", element: <Rotas/>},
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />, // Rota para exibir a página de not found
  },
]);

const App = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 text-slate-950">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
