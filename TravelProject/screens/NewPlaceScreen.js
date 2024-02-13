import React, { useState } from 'react';
import PlaceService from '../services/PlaceService';
import { SafeAreaView, View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const NewPlaceScreen = ({navigation, route}) => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const tripId = route.params.tripId;

    const handleCreate = () => {
        if (name.trim() === '' || category.trim() === '') {
            setErrorMessage('Please specify place name and category.');
            return;
        }
        
        const input = {
            name,
            category,
            // startDate,
            // endDate,
            // additionalSpecs,
        };

        const inputJson = JSON.stringify(input);
        console.log(inputJson);
        PlaceService.createPlace(inputJson, tripId)
        .then(() => {
            console.log('Created place: ' + inputJson);
            navigation.navigate('TripScreen', {tripId: tripId});
          })
          .catch(error => {
            console.error('Create place failed:', error);
          });
            
    };

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headText}>New Place</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('TripScreen', {tripId: tripId})}
            >
              <Icon name="close" size={30} color="black"/>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <TextInput
              style={styles.inputField}
              placeholder="Place Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.inputField}
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
              autoCapitalize="none"
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreate}
            >
              <Text>Add Place</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      
      );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginHorizontal: 16,
    },
    header: {
        width: '100%',
        marginTop: 20,
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headText: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
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
    },
    createButton: {
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
      padding: 0,
      flexDirection: 'row',
    }
});

export default NewPlaceScreen;