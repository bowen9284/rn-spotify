import React, { createContext } from 'react';

export const AuthContext = createContext<AuthContextProps>({
  signIn: () => {},
  signOut: () => {},
});

type AuthContextProps = {
  signIn: () => void;
  signOut: () => void;
};
