// src/navigation/SalonNavigator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SalonProfileScreen from '../screens/SalonAdminScreens/SaloonProfileScreen';

// Real screen for dashboard
import SalonAdminDashboard from '../screens/SalonAdminScreens/SalonAdminDashboard';

const Tab = createBottomTabNavigator();

// --- Simple static components for placeholder tabs ---
const SalonBookingsScreen = () => (
  <SafeAreaView style={styles.center}>
    <Text style={styles.text}>Bookings Screen (Static)</Text>
  </SafeAreaView>
);

const AddSpecialistScreen = () => (
  <SafeAreaView style={styles.center}>
    <Text style={styles.text}>Add Specialist Screen (Static)</Text>
  </SafeAreaView>
);

const SalonNotificationsScreen = () => (
  <SafeAreaView style={styles.center}>
    <Text style={styles.text}>Notifications Screen (Static)</Text>
  </SafeAreaView>
);

// --- Main Salon Tab Navigator ---
export default function SalonNavigator() {
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
          let showActiveDot = false;

          switch (route.name) {
            case 'SalonDashboard':
              iconName = focused ? 'grid' : 'grid-outline';
              showActiveDot = focused;
              break;
            case 'SalonBookings':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'AddSpecialist':
              iconName = focused ? 'person-add' : 'person-add-outline';
              break;
            case 'SalonNotifications':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'SalonProfile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={26} color={color} />
              {showActiveDot && <View style={styles.activeDot} />}
            </View>
          );
        },
        tabBarActiveTintColor: '#156778',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="SalonDashboard" component={SalonAdminDashboard} />
      <Tab.Screen name="SalonBookings" component={SalonBookingsScreen} />
      <Tab.Screen name="AddSpecialist" component={AddSpecialistScreen} />
      <Tab.Screen name="SalonNotifications" component={SalonNotificationsScreen} />
      <Tab.Screen name="SalonProfile" component={SalonProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    bottom: -10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#156778',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#156778',
    fontWeight: '600',
  },
});
