import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
  useTheme,
} from '@react-navigation/native';
import { BottomTabView } from '@react-navigation/bottom-tabs';
import MiniPlayer from '../components/player/MiniPlayer';

function BottomTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}) {
  const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  const { colors } = useTheme();

  return (
    <>
      <MiniPlayer />
      <BottomTabView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </>
  );
}

export const createMyNavigator = createNavigatorFactory(BottomTabNavigator);
