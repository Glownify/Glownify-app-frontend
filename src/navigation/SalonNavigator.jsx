import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { checkSubscription } from '../utils/checkSubscription';

// --- Screens ---
import SalonAdminDashboard from '../screens/SalonAdminScreens/SalonAdminDashboard';
import SalonBookingsScreen from '../screens/SalonAdminScreens/bookings/SalonBookingsScreen';
import ManageSpecialistScreen from '../screens/SalonAdminScreens/Specialists/ManageSpecialistScreen';
import ManageServicesScreen from '../screens/SalonAdminScreens/ManageServicesScreen';
import SalonNotificationsScreen from '../screens/SalonAdminScreens/SalonNotificationsScreen';
import SalonProfileScreen from '../screens/SalonAdminScreens/SaloonProfileScreen';

const Tab = createBottomTabNavigator();

const colors = {
  primary: '#156778',
  white: '#FFFFFF',
  inactive: '#E0E0E0',
  badge: '#FFA500',
};

export default function SalonNavigator({ navigation }) {
  useEffect(() => {
    checkSubscription(navigation);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50,
            backgroundColor: colors.primary,
            borderTopWidth: 0,
            elevation: 0,
            paddingBottom: 5,
            paddingTop: 5,
          },
        }}
      >
        {/* Dashboard */}
        <Tab.Screen
          name="SalonDashboard"
          component={SalonAdminDashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'grid' : 'grid-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
              </View>
            ),
          }}
        />

        {/* Bookings */}
        <Tab.Screen
          name="SalonBookings"
          component={SalonBookingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'calendar' : 'calendar-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
              </View>
            ),
          }}
        />

        {/* Specialist */}
        <Tab.Screen
          name="ManageSpecialist"
          component={ManageSpecialistScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'person-add' : 'person-add-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
              </View>
            ),
          }}
        />

        {/* Manage Services */}
        <Tab.Screen
          name="ManageServices"
          component={ManageServicesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'cut' : 'cut-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
              </View>
            ),
          }}
        />

        {/* Notifications */}
        <Tab.Screen
          name="SalonNotifications"
          component={SalonNotificationsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'notifications' : 'notifications-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
                {!focused && <View style={styles.badge} />}
              </View>
            ),
          }}
        />

        {/* Profile */}
        <Tab.Screen
          name="SalonProfile"
          component={SalonProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'person' : 'person-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBar: {
    position: 'absolute',
    top: -10,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.badge,
    borderWidth: 1,
    borderColor: colors.white,
  },
});
