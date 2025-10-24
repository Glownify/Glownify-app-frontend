// src/navigation/AppNavigator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; // <-- NEW IMPORT
import HomeScreen from '../screens/UserScreens/HomeScreen/HomeScreen';
import ShopDetailsScreen from '../screens/UserScreens/ShopDetails/ShopDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import NearbyListScreen from '../screens/UserScreens/NearbyListScreen';
import BookingScreen from '../screens/UserScreens/Bookings/BookingScreen';
import SearchScreen from '../screens/UserScreens/SearchScreen';
import MessageScreen from '../screens/UserScreens/MessageScreen';
import NotificationScreen from '../screens/UserScreens/NotificationScreen';

// --- Placeholder Screens for the new tabs ---
const CalendarScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Calendar Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator(); // <-- NEW NAVIGATOR

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

// --- NEW TOP TAB NAVIGATOR COMPONENT ---
// This component will be rendered when you tap the "MessagesTab"
function MessagesTopTabNavigator() {
  return (
    // SafeAreaView pushes the content below the phone's status bar (like "9:41")
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#156778', // Your app's active color
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            textTransform: 'none', // As seen in image (not all caps)
            fontSize: 16,
            fontWeight: '600',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#156778', // Line under the active tab
            height: 2.5,
          },
          tabBarStyle: {
            backgroundColor: 'white', // BG color of the tab bar itself
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
        }}
      >
        <TopTab.Screen
          name="Message"
          component={MessageScreen}
          options={{ title: 'Messages' }} // Title shown on the tab
        />
        <TopTab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ title: 'Notification' }} // Title shown on the tab
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}
// --- END OF NEW TOP TAB NAVIGATOR ---

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
            // We set the dot to be orange like in your screenshot
            showBadge = true; 
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={26} color={color} />
              {/* Updated badge style to match the small orange dot */}
              {showBadge && !focused && <View style={styles.badge} />}
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
      
      {/* --- THIS IS THE UPDATED LINE --- */}
      <Tab.Screen name="MessagesTab" component={MessagesTopTabNavigator} />
      
      <Tab.Screen name="ProfileTab" component={ShopDetailsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    // Made container slightly wider to accommodate the badge
    width: 30, 
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0, // Positioned top-right of the icon
    right: 0,
    width: 8, // Made smaller to match image
    height: 8,
    borderRadius: 4,
    backgroundColor: 'orange', // Color from your image
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