import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import RootNavigator from './components/navigation/RootNavigator';
import { AuthContextWrapper } from './context/authContext';

export default function App() {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={SpotifyTheme}>
        <StatusBar barStyle="light-content" />
        <AuthContextWrapper>
          <RootNavigator />
        </AuthContextWrapper>
      </NavigationContainer>
    </AppearanceProvider>
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
