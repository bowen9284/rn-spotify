import React, { useContext, useEffect } from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import LibraryStackNavigator from './LibraryStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import { Foundation } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { createMyNavigator } from './CustomTabNavigator';
import { SpotifyContext } from '../services/spotifyService';

import { loadPlayer } from '../redux/features/player/playerSlice';
import { useAppDispatch } from '../hooks';

export type TabParamList = {
  HomeStackNavigator: undefined;
  SearchStackNavigator: undefined;
  LibraryStackNavigator: undefined;
  BottomSheet: undefined;
};

const Tab = createMyNavigator();

const TabNavigator: React.FC = () => {
  const spotifyService = useContext(SpotifyContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let getCurrentlyPlaying = async () => {
      const response = await spotifyService?.fetchCurrentyPlaying();
      if (response) {
        dispatch(loadPlayer(response));
      }
    };
    getCurrentlyPlaying();
  }, []);

  return (
    <Tab.Navigator initialRouteName="HomeStackNavigator">
      <Tab.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStackNavigator"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LibraryStackNavigator"
        component={LibraryStackNavigator}
        options={{
          tabBarLabel: 'Your Library',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="grip-lines-vertical" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
