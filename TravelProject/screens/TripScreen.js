import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, FlatList, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useScrollViewOffset, useAnimatedStyle, useAnimatedScrollHandler } from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/AntDesign';
import TripService from '../services/TripService';
import PlaceService from '../services/PlaceService';
import TabBar from '../components/TabBar';

const IMG_HEIGHT = 170;

const OverviewTab = ({places}) => (
    <View style={styles.tripBody}>
        <Text style={styles.headerText}>Overview</Text>
        <FlatList 
            data={places}
            keyExtractor={(item) => item.placeId}
            horizontal={true}
            renderItem={({item}) => (
                <View>
                    <Text style={styles.smallText}>{item.name}</Text>
                    <Text style={styles.smallText}>{item.category}</Text>
                </View>
            )}
        />
    </View>
);

const FoodDrinkTab = () => (
    <View style={styles.tripBody}>
        <Text style={styles.headerText}>Food & Drink</Text>       
    </View>
);

const ActivitiesRoute = () => (
    <View style={styles.tripBody}>
        <Text style={styles.headerText}>Activities</Text>       
    </View>
);

const SightseeingRoute = () => (
    <View style={styles.tripBody}>
        <Text style={styles.headerText}>Sightseeing</Text>       
    </View>
);

const TripScreen = ({navigation, route}) => {

    const tripId = route.params.tripId;

    const [trip, setTrip] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);

    const scrollRef = useAnimatedRef();
    const scrollOffset = useScrollViewOffset(scrollRef);

    // const [index, setIndex] = useState(0);
    const tabRoutes = [
        { key: 'overview', title: 'Overview', component: OverviewTab },
        { key: 'foodDrink', title: 'Food & Drink', component: FoodDrinkTab },
    ];

    // const layout = useWindowDimensions();

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
          scrollOffset.value = event.contentOffset.y;
        },
      });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    // interpolate: map one value to a range of values
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT], // input range
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75], // output range
                    )
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1] // scale up to 2x, then back to 1x
                    )
                }
            ]
        };
    });

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                setTrip([]);
                setPlaces([]);
                setLoading(true);
                const tripData = await TripService.getTrip(tripId);
                setTrip(tripData);
                const placeData = await PlaceService.getAllPlaces(tripId);
                setPlaces(placeData);
                setLoading(false);
            } catch (error) {
                console.error("Error loading the trip: ", error);
                setLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', () => {
            fetchTrip();
        });

        fetchTrip();
        return unsubscribe;
    }, [navigation, tripId]);

    const handleDelete = () => {
        TripService.deleteTrip(tripId)
        .then(() => {
            console.log('Deleted trip: ' + tripId);
            navigation.navigate('Trips');
          })
          .catch(error => {
            console.error('Delete trip failed:', error);
          });
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <Animated.ScrollView ref={scrollRef} onScroll={scrollHandler} scrollEventThrottle={16}>
                <Animated.Image source={require('../example.png')} style={[styles.tripImage, imageAnimatedStyle]}/>
                <View style={styles.tripContainer}>
                    <View style={styles.tripHeaderContainer}>
                        <View style={styles.tripHeader}>
                            <Text style = {[styles.headerText, {marginBottom: 4}]} >{trip.tripName}</Text>
                            <Text style={[styles.bodyText, {color: '#717171'}]}>{trip.destination}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addPlaceButton}
                            onPress={() => navigation.navigate('NewPlaceScreen', {tripId: tripId})}
                        >
                            <Text>Add Place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.deletePlaceButton}
                        onPress={handleDelete}>
                            <Icon name="delete" size={30} color="red"/>
                            <Text>Remove Trip</Text>
                        </TouchableOpacity>
                    </View>
                    <TabBar routes={tabRoutes} places={places} />
                    
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tripImage: {
        width: '100%',
        height: IMG_HEIGHT,
        flexShrink: 0,
        position: 'absolute',
    },

    container: {
        flex: 1,
    },

    tripContainer: {
        flex: 1,
        marginTop: IMG_HEIGHT,
        backgroundColor: 'white',
    },

    tripHeaderContainer: {
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    tripHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 4,
    },

    smallText: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 14,
    },

    headerText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        fontStyle: 'normal',
    },

    tabBar: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 16,
        flexShrink: 0,
    },

    tabItem: {
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'transparent',
    },

    selectedTabItem: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

    tripBody: {
        display: 'flex',
        backgroundColor: '#f6f6f6',
        height: 1000,
        padding: 16
    },

    addPlaceButton: {
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row'
        // fontFamily: 'System',
        // fontSize: 30,
      },

});

export default TripScreen;