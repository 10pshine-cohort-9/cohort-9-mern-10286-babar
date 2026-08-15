import { useState } from "react";

import AuthContext from "./auth.context";
import {
  saveToken,
  getToken,
  removeToken,
} from "../services/token.service";

function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());

  const login = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
  };

  const logout = () => {
    removeToken();
    setToken(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;