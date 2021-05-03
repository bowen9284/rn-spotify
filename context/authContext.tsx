import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextProps = {
  token: string;
  setToken: (value: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  setToken: () => {},
});

export const AuthContextWrapper: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    //@todo add check for refresh token
    let currentToken: string | null = token;
    const storeToken = async () => {
      if (!currentToken) {
        let storedToken = await SecureStore.getItemAsync('authToken');
        if (storedToken) {
          setToken(storedToken);
          return;
        }
      }

      try {
        await SecureStore.setItemAsync('authToken', currentToken!);
        setToken(currentToken!);
      } catch (e) {
        console.log('error storing token');
      }
    };

    storeToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
