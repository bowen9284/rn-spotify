import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeStackNavigator = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.homeContainer}>
      <Text style={{ color: colors.text }}>Home Navigator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeStackNavigator;
