import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import CustomTextInput from '../../components/buttons/CustomTextInput';
import CustomButton from '../../components/buttons/CustomButton';

const LoginNoPasswordScreen = () => {
  const { colors } = useTheme();
  const helperText = `We'll send you an email with a link that will log you in.`;

  return (
    <View style={{ ...styles.screen }}>
      <LinearGradient
        colors={['#2D2D2D', colors.background, 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 300,
        }}
      >
        <View style={styles.formContainer}>
          <CustomTextInput title="Email or username" helperText={helperText} />
          <View style={styles.buttonCenter}>
            <CustomButton
              title="GET LINK"
              style={styles.getLinkButton}
              onPress={() => {}}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginNoPasswordScreen;

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
  getLinkButton: {
    backgroundColor: '#535353',
    width: 130,
    marginTop: 20,
  },
});
