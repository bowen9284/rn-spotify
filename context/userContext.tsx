import React, { createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserContextType = {
  id: string;
  setId: (value: string) => void;
};

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export const UserContextWrapper: React.FC<Props> = ({ children }) => {
  const [id, setId] = React.useState('');

  useEffect(() => {
    let currentUserId = id;
    const storeUserId = async () => {
      try {
        await AsyncStorage.setItem('userId', JSON.stringify(currentUserId));
      } catch (e) {
        console.log('error storing userId');
      }
    };

    setId(currentUserId);
    storeUserId();
  }, []);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
};
