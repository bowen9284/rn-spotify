import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import TabNavigator from './components/navigation/TabNavigator';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

export default function App() {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={SpotifyTheme}>
        <TabNavigator />
      </NavigationContainer>
    </AppearanceProvider>
  );
}

const SpotifyTheme = {
  ...DefaultTheme,
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
