import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RecentlyPlayedScreen from '../screens/HomeScreen/RecentlyPlayedScreen';
import FullPlayerScreen from '../screens/FullPlayerScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  FullPlayerScreen: undefined;
  PlaylistDetailScreen: { playlistId: string };
  SettingsScreen: undefined;
  RecentlyPlayedScreen: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PlaylistDetailScreen"
        component={PlaylistDetailScreen}
        options={{
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerTitle: '',
        }}
      />
      <HomeStack.Screen
        options={{
          headerTitle: 'Settings',
          headerBackTitleVisible: false,
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />

      <HomeStack.Screen
        options={{
          headerTitle: 'Recently Played',
          headerBackTitleVisible: false,
        }}
        name="RecentlyPlayedScreen"
        component={RecentlyPlayedScreen}
      />
      <HomeStack.Screen
        options={{
          headerTransparent: true,
        }}
        name="FullPlayerScreen"
        component={FullPlayerScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
