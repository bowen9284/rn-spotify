import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  title: string;
  helperText?: string;
  autoFocus?: boolean;
};

const SpotifyAuthTextInput: React.FC<Props> = ({ title, helperText, autoFocus }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.buttonContainer}>
      <Text style={{ color: colors.text, ...styles.labelText }}>{title}</Text>
      <TextInput autoFocus={autoFocus} selectionColor='#1DB954' style={{color: colors.text, ...styles.textInput }} />
      <Text style={{ color: colors.text, ...styles.helperText }}>
        {helperText}
      </Text>
    </View>
  );
};

export default SpotifyAuthTextInput;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 15,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#535353',
  },
  labelText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  helperText: {
    fontSize: 12,
    marginVertical: 5
  },
});
