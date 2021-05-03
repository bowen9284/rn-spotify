import React, { useContext, useEffect } from 'react';

import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from 'expo-auth-session';
import { vars } from '../../env';
import TabNavigator from './TabNavigator';
import { Button, View, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/authContext';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const RootNavigator: React.FC = () => {
  const context = useContext(AuthContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: vars.CLIENT_ID,
      scopes: [
        'user-read-email',
        'playlist-modify-public',
        'user-read-recently-played',
        'playlist-read-private',
        'user-follow-modify',
        'user-follow-read',
        'playlist-modify-private',
        'playlist-read-private',
        'playlist-read-collaborative',
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        if (response?.type === 'success') {
          const { access_token } = response.params;
          context.setToken(access_token);
        }
      } catch (e) {
        console.log('Error getting auth token');
      }
    };
    getAuthToken();
  }, [response]);

  const TempLoginView = () => {
    if (context?.token) {
      return <TabNavigator />;
    } else {
      return (
        <View style={styles.screen}>
          <Button
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync();
            }}
          />
        </View>
      );
    }
  };

  return <TempLoginView />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RootNavigator;
