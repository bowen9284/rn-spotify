import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import RootNavigator from './components/navigation/RootNavigator';

export default function App() {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : SpotifyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </AppearanceProvider>
  );
}

const SpotifyTheme = {
  ...DefaultTheme,
  dark: false,
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
};
