import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NewTripScreen from '../screens/NewTripScreen';
import TripListScreen from '../screens/TripListScreen';
import TripScreen from '../screens/TripScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';

const Tab = createBottomTabNavigator();

function NavigationBar() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Add" component={NewTripScreen} />
            <Tab.Screen name="Trips" component={TripListScreen} />
            <Tab.Screen name="TripScreen" component={TripScreen} 
                options={{
                    tabBarButton: () => null,
                }}
            />
            <Tab.Screen name="NewPlaceScreen" component={NewPlaceScreen}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Tab.Navigator>
        
    );
}

export default NavigationBar;