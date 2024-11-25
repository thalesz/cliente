import React, { createContext, ReactNode, useState, useEffect } from "react";

interface AuthContextProps {
  auth: { user?: string; id?: string; accessToken?: string; roles?: string[] }; // Corrigido para 'string[]'
  setAuth: React.Dispatch<React.SetStateAction<{ user?: string; accessToken?: string; roles?: string[]; id?:string }>>;
  logout: () => void;
  userHasRole: (roles: string[]) => boolean; // Função para verificar roles
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<{ user?: string; accessToken?: string; roles?: string[]; id?:string }>(() => {
    const storedAuth = sessionStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    // Somente salvar o user, accessToken e roles no sessionStorage
    const { user, accessToken, roles, id } = auth;
    if (user || accessToken || roles|| id)  {
      sessionStorage.setItem('auth', JSON.stringify({ user, accessToken, roles, id }));
    }
    // console.log("authh", auth)
  }, [auth]);

  const logout = () => {
    sessionStorage.removeItem('auth');
    setAuth({});
  };

  const userHasRole = (roles: string[]): boolean => {
    const userRoles = auth.roles || [];
    return roles.some(role => userRoles.includes(role));
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, userHasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider as default, AuthContext };
