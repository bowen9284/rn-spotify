import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import CustomTextInput from '../../components/buttons/CustomTextInput';

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.screen}>
      <CustomTextInput title="Email or username" />
      <CustomTextInput title="Password" />
      <View style={styles.buttonCenter}>
        <CustomButton
          style={styles.loginButton}
          title="LOG IN"
          onPress={() => {}}
        />
      </View>
      <View style={{ alignSelf: 'center' }}>
        <CustomButton
          textStyle={styles.loginWithoutPasswordText}
          style={styles.loginWithoutPasswordButton}
          title="LOG IN WITHOUT PASSWORD"
          onPress={() => navigation.navigate('LoginNoPasswordScreen')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonCenter: {
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: '#535353',
    width: 115,
  },
  loginWithoutPasswordButton: {
    borderColor: '#535353',
    borderWidth: 1,
    width: 200,
    paddingVertical: 5,
    marginTop: 20,
  },
  loginWithoutPasswordText: {
    fontSize: 10,
  },
});
