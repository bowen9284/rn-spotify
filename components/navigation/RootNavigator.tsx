import React, {useEffect, useState} from 'react';

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { vars } from '../../env';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { Button, View, StyleSheet } from 'react-native';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: vars.CLIENT_ID,
      scopes: ['user-read-email', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
        setIsLoggedIn(true);
        console.log("here");
        const { code } = response.params;

    }
    console.log('response1', response)
  }, [response]);

  const ViewThing = () => {
    if (isLoggedIn) {
      return (
        <TabNavigator/>
      )
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
      )
    }
  }

  return (
    <ViewThing/>
  );



  //   const isLoggedIn = useSelector(
  //     (state: any) => state.auth.isLoggedIn
  //   );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center'
  },
});

export default RootNavigator;
