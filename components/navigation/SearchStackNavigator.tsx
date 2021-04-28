import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchStackNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.searchContainer}>
      <Text style={{color: colors.text}}>Search Navigator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    searchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchStackNavigator;
