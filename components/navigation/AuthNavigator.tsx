import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/Authentication/LoginScreen';
import LandingScreen from '../../Screens/LandingScreen';
import AuthorizationScreen from '../../Screens/Authentication/AuthorizationScreen';
import { useTheme } from '@react-navigation/native';
import LoginNoPasswordScreen from '../../Screens/Authentication/LoginNoPasswordScreen';

export type AuthStackParamList = {
  LandingScreen: undefined;
  LoginScreen: undefined;
  AuthorizationScreen: undefined;
  LoginNoPasswordScreen: undefined;
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
        name="AuthorizationScreen"
        component={AuthorizationScreen}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.background,
          },
          title: '',
        }}
      />
      <AuthStack.Screen
        name="LoginNoPasswordScreen"
        component={LoginNoPasswordScreen}
        options={{
          headerShown: true,
          headerTintColor: colors.text,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: '#2D2D2D',
            elevation: 0,
          },
          title: 'Log in without password',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
