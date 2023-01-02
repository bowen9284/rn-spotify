import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SpotifyProvider } from './services/spotifyService';
import AuthNavigator from './navigation/AuthNavigator';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import { vars } from './env/env';
import { AuthContext } from './context/authContext';
import * as storageService from './services/secureStorageService';
import { enableScreens } from 'react-native-screens';
import TabNavigator from './navigation/TabNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            tokenResponse: action.tokenResponse,
            isLoading: false,
          };
        case 'REFRESH_TOKEN':
          return {
            ...prevState,
            tokenResponse: action.tokenResponse,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            tokenResponse: action.tokenResponse,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            tokenResponse: null,
          };
      }
    },
    {
      isLoading: false,
      isSignout: false,
      tokenResponse: null,
    }
  );

  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const requestedScopes = [
    'user-read-email',
    'playlist-modify-public',
    'user-read-recently-played',
    'playlist-read-private',
    'user-follow-modify',
    'user-follow-read',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
    'user-read-currently-playing',
  ];

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: vars.CLIENT_ID,
      scopes: requestedScopes,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: AuthSession.makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let tokenResponse;
      try {
        tokenResponse = await storageService.getToken();

        // check if token has expired and exchange.
        if (isTokenExpired(tokenResponse)) {
          console.log('expired');
          await refreshAccessToken(tokenResponse);
          return;
        }

        dispatch({ type: 'RESTORE_TOKEN', tokenResponse });
        return;
      } catch (e) {
        console.log(
          `Failed to retrieve token, it was not found in local storage: ${e}`
        );
      }
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      if (response?.type === 'success') {
        const { code } = response.params;
        try {
          let tokenResponse = await fetchAccessToken(code);
          let success = await storageService.saveToken(tokenResponse);
          if (success) {
            dispatch({ type: 'SIGN_IN', tokenResponse });
          }
        } catch (e) {
          console.log('Error fetching access token ', e);
        }
      }
    };
    fetchToken();
  }, [response]);

  const fetchAccessToken = async (code: string) => {
    return await AuthSession.exchangeCodeAsync(
      {
        clientId: vars.CLIENT_ID,
        code: code,
        redirectUri: AuthSession.makeRedirectUri(),
        extraParams: {
          client_secret: vars.CLIENT_SECRET,
        },
      },
      discovery
    );
  };

  const refreshAccessToken = async (
    tokenResponse: AuthSession.TokenResponse
  ) => {
    return AuthSession.refreshAsync(
      {
        refreshToken: tokenResponse.refreshToken,
        clientId: vars.CLIENT_ID,
        scopes: requestedScopes,
      },
      discovery
    );
  };

  const isTokenExpired = (
    tokenResponse: AuthSession.TokenResponse
  ): boolean => {
    const expireTime = tokenResponse.issuedAt + tokenResponse.expiresIn!;
    return expireTime < Math.floor(Date.now() / 1000);
  };

  const authContext = {
    signIn: async (data: any) => {
      promptAsync();
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync('accessToken');
      dispatch({ type: 'SIGN_OUT' });
    },
  };
  if (state.isLoading) {
    // We haven't finished checking forthe token yet
    return <ActivityIndicator />;
  }

  enableScreens();

  return (
    <Provider store={store}>
      <NavigationContainer theme={SpotifyTheme}>
        <StatusBar barStyle="light-content" />
        <AuthContext.Provider value={authContext}>
          <SpotifyProvider>
            {state.tokenResponse == null ? <AuthNavigator /> : <TabNavigator />}
          </SpotifyProvider>
        </AuthContext.Provider>
      </NavigationContainer>
    </Provider>
  );
}

const SpotifyTheme = {
  ...DefaultTheme,
  dark: false,
  fontSize: {},
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    secondary: '#212121',
    background: '#121212',
    card: '#212121',
    text: '#ffffff',
    border: '#121212',
    notification: '#1db954',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
};
