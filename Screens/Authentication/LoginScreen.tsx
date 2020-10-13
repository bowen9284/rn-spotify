import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

const LoginScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.screen}>
      <View>
        <Text style={{ color: colors.text, ...styles.loginText }}>Email or username</Text>
        <TextInput
          style={{ backgroundColor: colors.secondary, ...styles.input }}
        />
      </View>
      <View>
        <Text style={{ color: colors.text, ...styles.loginText }}>Password</Text>
        <TextInput
          style={{ backgroundColor: colors.secondary, ...styles.input }}
        />
      </View>
      <View>
        <CustomButton title="LOGIN" onPress={() => {}} />
      </View>
      <View>
        <CustomButton title="LOG IN WITHOUT PASSWORD" onPress={() => {}} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
