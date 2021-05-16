import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/authentication/LoginScreen';
import LandingScreen from '../screens/LandingScreen';
import { useTheme } from '@react-navigation/native';
import CreateAccountScreen from '../screens/authentication/CreateAccount';

export type AuthStackParamList = {
  LandingScreen: undefined;
  LoginScreen: undefined;
  AuthorizationScreen: undefined;
  CreateAccountScreen: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <AuthStack.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="LandingScreen" component={LandingScreen} />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.background,
          },
          title: '',
        }}
      />
      <AuthStack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
        options={{
          headerShown: true,
          headerTintColor: colors.text,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16,
          },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
            elevation: 0,
          },
          title: 'Create Account',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
