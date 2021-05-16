import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import LibraryStackNavigator from './LibraryStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import { Foundation } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export type TabParamList = {
  HomeStackNavigator: undefined;
  SearchStackNavigator: undefined;
  LibraryStackNavigator: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeStackNavigator"
      tabBarOptions={{ activeTintColor: colors.primary }}
    >
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
