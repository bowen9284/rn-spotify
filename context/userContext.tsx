import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type UserContextProps = {
  id: string;
  setId: (value: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserContextWrapper: React.FC<Props> = ({ children }) => {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const currentUserId = id;
    const storeUserId = async () => {
      try {
        await SecureStore.setItemAsync('userId', currentUserId);
      } catch (e) {
        console.log('user conerror storing userId', e);
      }
    };
    storeUserId();
    setId(currentUserId);
  }, [id]);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
};
