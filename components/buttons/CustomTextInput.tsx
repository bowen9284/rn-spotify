import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  title: string;
  helperText?: string;
};

const CustomTextInput: React.FC<Props> = ({ title, helperText }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.buttonContainer}>
      <Text style={{ color: colors.text, ...styles.labelText }}>{title}</Text>
      <TextInput style={styles.textInput} />
      <Text style={{ color: colors.text, ...styles.helperText }}>
        {helperText}
      </Text>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 15,
  },
  textInput: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#535353',
  },
  labelText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  helperText: {
    fontSize: 13,
    marginVertical: 5
  },
});
