// src/navigation/SalonNavigator.js
import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { checkSubscription } from '../utils/CheckSubscription'; // your function
import SalonProfileScreen from '../screens/SalonAdminScreens/SaloonProfileScreen';
import SalonNotificationsScreen from '../screens/SalonAdminScreens/SalonNotificationsScreen';
// Real screens
import SalonAdminDashboard from '../screens/SalonAdminScreens/SalonAdminDashboard';
import SalonBookingsScreen from '../screens/SalonAdminScreens/bookings/SalonBookingsScreen';

import AddSpecialistScreen from '../screens/SalonAdminScreens/Specialists/AddSpecialistScreen';
import ManageServicesScreen from '../screens/SalonAdminScreens/ManageServicesScreen';

const Tab = createBottomTabNavigator();

// --- Main Salon Tab Navigator ---
export default function SalonNavigator({ navigation }) {

  //   // ✅ Check subscription on mount
  useEffect(() => {
    checkSubscription(navigation); // pass navigation so it can redirect if expired
  }, []);

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
            case 'ManageServices':
              iconName = focused ? 'cut' : 'cut-outline';
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
      })}>
      <Tab.Screen name="SalonDashboard" component={SalonAdminDashboard} />
      <Tab.Screen name="SalonBookings" component={SalonBookingsScreen} />
      <Tab.Screen name="AddSpecialist" component={AddSpecialistScreen} />
      <Tab.Screen name="ManageServices" component={ManageServicesScreen} />
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