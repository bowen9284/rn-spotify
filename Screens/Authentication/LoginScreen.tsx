import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

const LoginScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.screen}>
      <View>
        <Text style={{ color: colors.text, ...styles.loginText }}>
          Email or username
        </Text>
        <TextInput
          style={{ backgroundColor: colors.secondary, ...styles.input }}
        />
      </View>
      <View>
        <Text style={{ color: colors.text, ...styles.loginText }}>
          Password
        </Text>
        <TextInput
          style={{ backgroundColor: colors.secondary, ...styles.input }}
        />
      </View>
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
  input: {
    height: 40,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 28,
    fontWeight: 'bold',
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
