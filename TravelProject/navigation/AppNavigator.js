import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

import NavigationBar from './NavigationBar';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="StartScreen" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Tabs" component={NavigationBar} options={{headerShown: false}}/>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;