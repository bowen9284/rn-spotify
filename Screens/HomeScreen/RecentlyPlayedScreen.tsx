import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

const RecentlyPlayedScreen: React.FC<Props> = () => {
  const { colors } = useTheme();
  const headerStyle = [{ color: colors.text }, styles.headerText];

  return (
    <View style={styles.container}>
      <Text style={headerStyle}>Yesterday</Text>
    </View>
  );
};

export default RecentlyPlayedScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
    marginHorizontal: 15,
  },
  headerText: {
    width: '50%',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
