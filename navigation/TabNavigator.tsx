import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useState } from 'react';
import HomeStackNavigator from './HomeStackNavigator';
import LibraryStackNavigator from './LibraryStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import { Foundation } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
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

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
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

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  return (
    <>
      <TouchableOpacity onPress={() => {}}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            backgroundColor: colors.card,
            borderBottomColor: '#000000',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: colors.text,
            }}
          >
            Player
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 75,
          backgroundColor: colors.card,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{ flex: 1 }}
              key={options.tabBarLabel}
            >
              <Text style={{ color: colors.text }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
