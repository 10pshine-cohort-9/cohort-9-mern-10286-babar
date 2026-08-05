import { createContext, useState } from "react";
import { getToken, saveToken, removeToken } from "../services/token.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = getToken();

    return token ? { token } : null;
  });

  const login = (token) => {
    saveToken(token);
    setUser({ token });
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}