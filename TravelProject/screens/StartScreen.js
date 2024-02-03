import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.authButton}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.authButton}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  authButton: {
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    width: 240,
    alignItems: 'center',
    // fontFamily: 'System',
    // fontSize: 30,
  }
});

export default StartScreen;
