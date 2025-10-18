// src/navigation/AppNavigator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Import View and StyleSheet
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/UserScreens/HomeScreen/HomeScreen';
import ShopDetailsScreen from '../screens/UserScreens/ShopDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

// --- Placeholder Screens for the new tabs ---
// You can replace these with your actual screens
const ExploreScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Explore Screen</Text>
  </View>
);
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
          // Optional: Add some padding if the dot gets cut off
          height: 60,
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
          } else if (route.name === 'ExploreTab') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'CalendarTab') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'MessagesTab') {
            // Using chatbubble-ellipses as it's a good match for the image
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
            // Hardcoding badge for demo. In a real app, this would come from state.
            showBadge = true; 
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={24} color={color} />
              {showBadge && <View style={styles.badge} />}
              {showActiveDot && <View style={styles.activeDot} />}
            </View>
          );
        },
        tabBarActiveTintColor: '#156778', // Your active color
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="ExploreTab" component={ExploreScreen} />
      <Tab.Screen name="CalendarTab" component={CalendarScreen} />
      <Tab.Screen name="MessagesTab" component={MessagesScreen} />
      {/* Using your ShopDetailsScreen for the Profile tab */}
      <Tab.Screen name="ProfileTab" component={ShopDetailsScreen} />
    </Tab.Navigator>
  );
}

// Add this StyleSheet
const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of children
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'orange', // Matches the image
    borderWidth: 1,
    borderColor: '#fff', // Optional: white border like in many apps
  },
  activeDot: {
    position: 'absolute',
    bottom: -10, // Position it below the icon
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#156778', // Match the active tint color
  },
});