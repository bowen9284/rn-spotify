import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LibraryStackNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.libraryContainer}>
      <Text style={{ color: colors.text }}>Library Navigator</Text>
    </View>
  );
};

export default LibraryStackNavigator;

const styles = StyleSheet.create({
  libraryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
