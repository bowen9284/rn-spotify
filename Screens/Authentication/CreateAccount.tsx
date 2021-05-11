import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import SpotifyAuthTextInput from '../../components/buttons/SpotifyAuthTextInput';
import SpotifyAuthButton from '../../components/buttons/SpotifyAuthButton';

const CreateAccountScreen = () => {
  const { colors } = useTheme();
  const helperText = `You'll need to confirm this email later.`;

  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <SpotifyAuthTextInput
          title="What's your email?"
          helperText={helperText}
          autoFocus={true}
        />
        <View style={styles.buttonCenter}>
          <SpotifyAuthButton
            title="NEXT"
            style={styles.nextButton}
            disabled={true}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  formContainer: {
    marginTop: 15,
  },
  buttonCenter: {
    alignSelf: 'center',
  },
  nextButton: {
    backgroundColor: '#535353',
    width: 130,
    marginTop: 30,
    paddingVertical: 15,
  },
});
