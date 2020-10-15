import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

const LoginScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.screen}>
      <CustomTextInput title="Email or username"/>
      <CustomTextInput title="Password"/>
      <View style={{ width: 125, alignSelf: 'center' }}>
        <CustomButton
          style={styles.loginButton}
          title="LOG IN"
          onPress={() => {}}
        />
      </View>
      <View style={{ width: 250, height: 20, alignSelf: 'center' }}>
        <CustomButton
          style={styles.loginWithoutPasswordButton}
          title="LOG IN WITHOUT PASSWORD"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 15,
  },
 
  loginButton: {
    backgroundColor: '#535353',
  },
  loginWithoutPasswordButton: {
    fontSize: 12,
    borderColor: '#535353',
    borderWidth: 2,
  },
});
