import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import CustomPlaylistDetailScreen from '../../Screens/CustomPlaylistDetailScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  CustomPlaylistDetailScreen: { playlistId: string };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      headerMode="screen"
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="CustomPlaylistDetailScreen"
        component={CustomPlaylistDetailScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTransparent: true,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
