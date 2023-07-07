import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const context = { token, setToken };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
