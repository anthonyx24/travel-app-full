import React, { useEffect, useState } from 'react';
import PlaceService from '../services/PlaceService';
import { SafeAreaView, View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import CustomDropdown from '../components/CustomDropdown';
// import PlaceAutocomplete from '../components/PlaceAutocomplete';
import PlaceAutocomplete from '../components/PlaceAutocomplete';

const NewPlaceScreen = ({navigation, route}) => {

    const [place, setPlace] = useState(null);
    const [category, setCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const [apiKey, setApiKey] = useState(null);

    const tripId = route.params.tripId;

    const categoryList = [
      { label: 'Food & Drink', value: 'Food & Drink' },
      { label: 'Sightseeing', value: 'Sightseeing' },
      { label: 'Activity', value: 'Activity' },
      { label: 'Shopping', value: 'Shopping' },
      { label: 'Other', value: 'Other' }
    ];

    // useEffect(() => {
    //   console.log('Fetching API key');
    //   const fetchApiKey = async () => {
    //     const key = await AutocompleteServices.getAutocompleteKey();
    //     setApiKey(key);
    //   };
    //   fetchApiKey();
    // }, []);

    const handleCreate = () => {
        if (!place || category.trim() === '') {
            setErrorMessage('Please specify place and category.');
            return;
        }
        const categoryValues = categoryList.map(item => item.value);
        if (!categoryValues.includes(category)) {
            setErrorMessage('Please specify a valid category.');
            return;
        }
        
        const input = {
            place,
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

    const handleCategorySelect = (item) => {
        setCategory(item.value);
    }

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
            <PlaceAutocomplete style={{zIndex: 10}} place={place} setPlace={setPlace}/>
            <CustomDropdown 
              options={categoryList} 
              labelField="label"
              valueField="value"
              placeholder="Select category"
              value={category} 
              handleSelect={handleCategorySelect}
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
      zIndex: 0,
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
      // justifyContent: 'center',
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