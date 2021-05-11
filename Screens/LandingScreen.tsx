import { useTheme } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SpotifyAuthButton from '../components/buttons/SpotifyAuthButton';
import CircleImage from '../components/shapes/CircleImage';
import { AuthContext } from '../context/authContext';

type Props = {
  signIn: () => void;
};

const LandingScreen: React.FC<Props> = ({navigation}) => {
  const { colors } = useTheme();
  const colorStyle = [{ backgroundColor: colors.background }, styles.screen];
  const { signIn } = useContext(AuthContext);

  return (
    <View style={colorStyle}>
      <View style={styles.landingArtistCircles}>
        <CircleImage
          source={require('../assets/drake_cover.jpg')}
          style={{ ...styles.artistCircle, bottom: 25, left: 10 }}
          size={120}
        />
        <CircleImage
          source={require('../assets/post_malone_cover.jpg')}
          style={{ ...styles.artistCircle, bottom: 45, left: 180 }}
          size={75}
        />
        <CircleImage
          source={require('../assets/kanye_cover.jpg')}
          style={{ ...styles.artistCircle, bottom: 20, right: -30 }}
          size={120}
        />
        <CircleImage
          source={require('../assets/beatles_cover.jpg')}
          style={{ ...styles.artistCircle, top: 0, left: -40 }}
          size={110}
        />
        <CircleImage
          source={require('../assets/ariana_grande_cover.jpg')}
          style={{ ...styles.artistCircle, top: -20, right: 95 }}
          size={160}
        />
        <CircleImage
          source={require('../assets/spotify_icon_white.png')}
          style={{ ...styles.artistCircle, top: 90, right: 70 }}
          size={50}
        />
      </View>

      <View style={styles.landingTextContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/spotify_icon_white.png')}
        />
        <Text style={{ color: colors.text, ...styles.landingText }}>
          Millions of songs.
        </Text>
        <Text style={{ color: colors.text, ...styles.landingText }}>
          Free on Spotify.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <SpotifyAuthButton
          title="Sign up free"
          style={styles.signUpButton}
          onPress={() => navigation.navigate('CreateAccountScreen')}
        />
        <SpotifyAuthButton
          title="Continue with Google"
          style={styles.continueWithExternalButton}
          image={require('../assets/google_icon_color.png')}
          onPress={() => {}}
        />
        <SpotifyAuthButton
          title="Continue with Facebook"
          style={styles.continueWithExternalButton}
          image={require('../assets/facebook_icon_blue.png')}
          onPress={() => {}}
        />
        <SpotifyAuthButton
          title="Continue with Apple"
          style={styles.continueWithExternalButton}
          image={require('../assets/apple_icon_white.png')}
          onPress={() => {}}
        />
        <TouchableOpacity onPress={() => signIn()}>
          <Text style={{ color: colors.text, ...styles.logInText }}>
            Log in
          </Text>
        </TouchableOpacity>
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
  landingArtistCircles: {
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  artistCircle: {
    position: 'absolute',
  },
  landingTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 2,
  },
  landingText: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
  logInText: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logo: {
    marginVertical: 20,
    width: 45,
    height: 45,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 30,
    marginBottom: 40,
  },
  signUpButton: {
    backgroundColor: '#1DB954',
    height: 50,
  },
  continueWithExternalButton: {
    height: 50,
    borderColor: '#535353',
    borderWidth: 1,
  },
});
