import React, { useEffect, useState } from 'react';
import TripService from '../services/TripService';
import { View, TouchableOpacity, FlatList, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TripsScreen = ({navigation}) => {

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoading(true);
                const tripsData = await TripService.getAllTrips();
                setTrips(tripsData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', () => {
            fetchTrips();
        });

        fetchTrips();
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headText}>Trips</Text>
            <TouchableOpacity
              style={styles.createTripButton}
              onPress={() => navigation.navigate('NewTripScreen')}
            >
              <Text>Create Trip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <FlatList data={trips}  showsVerticalScrollIndicator={false} renderItem={({item}) => 
                <View style={styles.tripContainer}>
                    <Image source={require('../example.png')} style={styles.tripImage}/>
                    <View style={styles.tripText}>
                        <Text style={styles.tripTitle}>{item.tripName}</Text>
                        <Text style={styles.tripDestination}>{item.destination}</Text>
                    </View>
                    <Icon name="right" size={16} style={styles.tripButton}/>
                </View>
                
            }/>
            
          </View>
        </View>
      
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginHorizontal: 16,
    },
    header: {
        width: '100%',
        marginTop: 30,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
    },
    headText: {
        fontSize: 30,
        fontWeight: '700',
        alignSelf: 'center',
    },
    content: {
      justifyContent: 'center',
      flex: 1,
    },
    createTripButton: {
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 20,
      padding: 10,
      flexDirection: 'row'
      // fontFamily: 'System',
      // fontSize: 30,
    },
    tripContainer: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
        alignItems: 'center',
        gap: 13,
    },
    tripImage: {
        width: 81,
        height: 54,
        borderRadius: 5,
    },
    tripText: {
        flexDirection: 'column',
        gap: 4,
        alignItems: 'flex-start'
    },
    tripTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    tripDestination: {
        fontSize: 14,
        fontWeight: '400',
        color: '#8a8a8a'
    },
    tripButton: {
        position: 'absolute',
        left: 314,
        color: "#7f7f7f",
    }

  });

export default TripsScreen;