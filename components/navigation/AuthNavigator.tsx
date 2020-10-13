import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Screens/Authentication/LoginScreen';
import LandingScreen from '../../Screens/Authentication/LandingScreen';
import AuthorizationScreen from '../../Screens/Authentication/AuthorizationScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
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
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;