import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AuthService from '../services/AuthService';
import Icon from 'react-native-vector-icons/AntDesign';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    AuthService.createUser(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        // Navigate to the home screen or other appropriate screen
        navigation.navigate('Tabs', { screen: 'Trips' });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('That email address is already in use.');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid.');
        } else {
          setErrorMessage('Failed to create an account. Please try again.');
        }
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowleft" size={30} color="black"/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity 
          style={styles.authButton}
          onPress={handleSignUp}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  inputField: {
    width: 341,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 9,
    marginBottom: 20,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    marginLeft: 30,
  },
  authButton: {
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    width: 240,
    alignItems: 'center',
    alignSelf: 'center',
    // fontFamily: 'System',
    // fontSize: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 0,
    marginLeft: -10,
  }
});

export default SignUpScreen;
