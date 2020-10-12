import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from '../../Screens/Authentication/LoginScreen';
import LandingScreen from '../../Screens/Authentication/LandingScreen';
import AuthorizationScreen from '../../Screens/Authentication/AuthorizationScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return <AuthStack.Navigator>
      <AuthStack.Navigator name="AuthorizationScreen" componnent={AuthorizationScreen} />
      <AuthStack.Navigator name="LoginScreen" component={LoginScreen} />
      <AuthStack.Navigator name="LandingScreen" component={LandingScreen} />
  </AuthStack.Navigator>;
};

export default AuthNavigator;

const styles = StyleSheet.create({});
