import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const CustomTextInput = ({ title }) => {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={{ color: colors.text, ...styles.labelText }}>{title}</Text>
      <TextInput style={styles.textInput} />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: '#535353',
  },
  labelText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
