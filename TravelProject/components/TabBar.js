import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, FlatList, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useScrollViewOffset, useAnimatedStyle, useAnimatedScrollHandler } from 'react-native-reanimated';

const TabBar = ({ routes }) => {
    const [selectedTab, setSelectedTab] = useState(routes[0].key);

    const renderTabBar = () => (
        <Animated.ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            style={styles.tabBar}
        >
            {routes.map(route => (
                <TouchableOpacity
                    key={route.key}
                    onPress={() => setSelectedTab(route.key)}
                    style={[
                        styles.tabItem,
                        selectedTab === route.key && styles.selectedTabItem
                    ]}
                >
                    <Text style={styles.smallText}>{route.title}</Text>
                </TouchableOpacity>
            ))}
        </Animated.ScrollView>
    );

    const renderTabContent = () => {
        const selectedRoute = routes.find(route => route.key === selectedTab);
        const TabComponent = selectedRoute.component;
        const tabProps = selectedRoute.props || {};
        return TabComponent ? <TabComponent {...tabProps} /> : null;
    }

    return (
        <View>
            {renderTabBar()}
            {renderTabContent()}
        </View>
    );
};

const styles = StyleSheet.create({

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

});

export default TabBar;