import React from 'react';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';

const TOKEN_KEY = 'accessToken';
const USER_ID_KEY = 'userId';

export const getToken = async (): Promise<AuthSession.TokenResponse> => {
  return await getSecureItem(TOKEN_KEY);
};

export const saveToken = async (tokenResponse: AuthSession.TokenResponse) => {
  return await setSecureItem(TOKEN_KEY, tokenResponse);
};

export const getUserID = async () => {
  return await getSecureItem(USER_ID_KEY);
};

export const saveUserID = async (userId: string) => {
  return await setSecureItem(USER_ID_KEY, userId);
};

const getSecureItem = async (key: string) => {
  let secureItem;
  try {
    let storedItem = await SecureStore.getItemAsync(key);
    if (storedItem) {
      secureItem = await JSON.parse(storedItem);
      return secureItem;
    }
  } catch (e) {
    console.log(
      `There was an error obtaining the stored item. Key: ${key}.`,
      e
    );
  }
};

const setSecureItem = async (key: string, secureItem: any) => {
  let success = false;
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(secureItem));
    success = true;
  } catch (e) {
    console.log(`Error storing item: ${key}`, e);
  }

  return success;
};
