import React, { useReducer, createContext, useContext } from 'react';
import authReducer from './authReducer';

const initialState = {
  user: null,
};

const AuthContext = createContext();

export const AuthStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
