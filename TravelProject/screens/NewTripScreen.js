import React, { useState } from 'react';
import TripService from '../services/TripService';
import { SafeAreaView, View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import DateTimePicker from '@react-native-community/datetimepicker';

const NewTripScreen = ({navigation}) => {
    const [tripName, setTripName] = useState('');
    const [destination, setDestination] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    // const [additionalSpecs, setAdditionalSpecs] = useState('');

    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

    const handleCreate = () => {
        if (tripName.trim() === '' || destination.trim() === '') {
            setErrorMessage('Please specify trip name and destination.');
            return;
        }
        
        const input = {
            tripName,
            destination,
            // startDate,
            // endDate,
            // additionalSpecs,
        };

        const inputJson = JSON.stringify(input);
        console.log(inputJson);
        TripService.createTrip(inputJson)
        .then(() => {
            console.log('Created trip: ' + inputJson);
            // Navigate to home screen or do something else upon success
            navigation.navigate('Trips');
          })
          .catch(error => {
            console.error('Create trip failed:', error);
            // Handle errors (show message, etc.)
          });
            
    };

    // const onStartDateChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || startDate;
    //     setIsStartDatePickerVisible(Platform.OS === 'ios');
    //     setStartDate(currentDate);
    // };
    
    // const onEndDateChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || endDate;
    //     setIsEndDatePickerVisible(Platform.OS === 'ios');
    //     setEndDate(currentDate);
    // };

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headText}>New Trip</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="close" size={30} color="black"/>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <TextInput
              style={styles.inputField}
              placeholder="Trip Name"
              value={tripName}
              onChangeText={setTripName}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.inputField}
              placeholder="Destination"
              value={destination}
              onChangeText={setDestination}
              autoCapitalize="none"
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreate}
            >
              <Text>Create Trip</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      
      );

      

      /* <TextInput
                placeholder="Start Date"
                value={startDate.toString().split('T')[0]}
                onFocus={() => setIsStartDatePickerVisible(true)}
                onChangeText={setStartDate}
            />
            {isStartDatePickerVisible && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}
            <TextInput
                placeholder="End Date"
                value={endDate}
                onChangeText={setEndDate}
            />
            {isEndDatePickerVisible && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                />
            )} */
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

export default NewTripScreen;
