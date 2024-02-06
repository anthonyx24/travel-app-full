import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>{
      <AppNavigator />
    }</NavigationContainer>
  );
}