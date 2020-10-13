import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import CustomButton from '../../components/CustomButton';

const LandingScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.screen}>
      <View style={styles.landingTextContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/spotify_icon_white.png')}
        />
        <Text style={{ color: colors.text, ...styles.landingText }}>
          Millions of songs.
        </Text>
        <Text style={{ color: colors.text, ...styles.landingText }}>
          Free on Spotify.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Sign up free"
          style={styles.signUpButton}
          onPress={() => {}}
        />
        <CustomButton
          title="Continue with Facebook"
          style={styles.signUpFacebookButton}
          image={require('../../assets/facebook_icon_blue.png')}
          onPress={() => {}}
        />
        <Text style={{ color: colors.text, ...styles.logInText }}>Log in</Text>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  landingTextContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  landingText: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
  logInText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logo: {
    marginVertical: 15,
    width: 45,
    height: 45,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 25,
    marginBottom: 40,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#1DB954',
  },
  signUpFacebookButton: {
    borderColor: '#212121',
    borderWidth: 2,
  },
});
