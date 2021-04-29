import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  token: string;
  setToken: (value: string) => void;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export const AuthContextWrapper: React.FC<Props> = ({ children }) => {
  const [token, setToken] = React.useState('');

  useEffect(() => {
    //@todo add check for refresh token
    const currentToken = token;
    const storeToken = async () => {
      try {
        await AsyncStorage.setItem('authToken', JSON.stringify(currentToken));
      } catch (e) {
        console.log('error storing token');
      }
    };

    setToken(currentToken);
    storeToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
