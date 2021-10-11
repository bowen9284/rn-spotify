import { useFocusEffect, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '../hooks';
import { toggleMiniPlayer } from '../redux/features/player/playerSlice';

interface Props {}

const FullPlayerScreen = (props: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(toggleMiniPlayer());
      };
    }, [])
  );
  return <View></View>;
};

export default FullPlayerScreen;

const styles = StyleSheet.create({});
