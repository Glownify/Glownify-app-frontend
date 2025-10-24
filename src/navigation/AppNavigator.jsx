// src/navigation/AppNavigator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from '../screens/UserScreens/HomeScreen/HomeScreen';
import ShopDetailsScreen from '../screens/UserScreens/ShopDetails/ShopDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import NearbyListScreen from '../screens/UserScreens/NearbyListScreen';
import BookingScreen from '../screens/UserScreens/Bookings/BookingScreen';
import SearchScreen from '../screens/UserScreens/SearchScreen';

// --- Placeholder Screens for the new tabs ---
const CalendarScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Calendar Screen</Text>
  </View>
);
const MessagesScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Messages Screen</Text>
  </View>
);
// --- End of Placeholder Screens ---

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ShopDetails" component={ShopDetailsScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let showBadge = false;
          let showActiveDot = false;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
            showActiveDot = focused;
          } else if (route.name === 'NearbySaloonTab') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'CalendarTab') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'MessagesTab') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
            showBadge = true;
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={26} color={color} />
              {showBadge && <View style={styles.badge} />}
              {showActiveDot && <View style={styles.activeDot} />}
            </View>
          );
        },
        tabBarActiveTintColor: '#156778',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';
            // Hide tab bar on ShopDetails and SearchScreen
            if (routeName === 'ShopDetails' || routeName === 'SearchScreen') {
              return { display: 'none' };
            }
            return {
              height: 70,
              paddingBottom: 5,
              paddingTop: 5,
            };
          })(route),
        })}
      />
      <Tab.Screen name="NearbySaloonTab" component={NearbyListScreen} />
      <Tab.Screen name="CalendarTab" component={CalendarScreen} />
      <Tab.Screen name="MessagesTab" component={MessagesScreen} />
      <Tab.Screen name="ProfileTab" component={ShopDetailsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
    borderWidth: 1,
    borderColor: '#fff',
  },
  activeDot: {
    position: 'absolute',
    bottom: -10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#156778',
  },
});