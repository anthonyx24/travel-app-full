import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import NewTripScreen from '../screens/NewTripScreen';
import TripListScreen from '../screens/TripListScreen';
import TripScreen from '../screens/TripScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="StartScreen" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="NewTripScreen" component={NewTripScreen} />
      <Stack.Screen name="TripListScreen" component={TripListScreen} />
      <Stack.Screen name="TripScreen" component={TripScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;