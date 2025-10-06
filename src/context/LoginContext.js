import { createContext, useContext } from 'react';
import { useLogin } from '../../hooks/useLogin';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const loginMethods = useLogin();

  return (
    <LoginContext.Provider value={loginMethods}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
