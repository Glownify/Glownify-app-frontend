import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomeScreen from '../screens/UserScreens/HomeScreen/HomeScreen';
import BookingScreen from '../screens/UserScreens/Bookings/BookingScreen';
import SearchScreen from '../screens/UserScreens/SearchScreen';
import MessageScreen from '../screens/UserScreens/MessageScreen';
import NotificationScreen from '../screens/UserScreens/NotificationScreen';
import ShopDetailsSummaryScreen from '../screens/UserScreens/ShopDetails/ShopDetailsSummaryScreen';
import ShopDetailsFullScreen from '../screens/UserScreens/ShopDetails/ShopDetailsFullScreen';
import ServiceDetailsScreen from '../screens/UserScreens/ServiceDetails/ServiceDetailsScreen';
import ProfileScreen from '../screens/UserScreens/ProfileScreen';
import UserBookingsScreen from '../screens/UserScreens/BookingScreen';
import AIBasedHairs from '../screens/UserScreens/AIBasedHairs';
import SalonsListScreen from '../screens/UserScreens/SalonsListScreen';
import ProfileEditScreen from '../screens/UserScreens/ProfileEditScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

// --- AESTHETIC REFINEMENT: Define color palette ---
const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  inactive: '#E0E0E0',
  black: '#000000',
  badge: '#FFA500', // Orange
};

// --- Your Navigators (Unchanged) ---
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ShopDetailsSummary" component={ShopDetailsSummaryScreen} />
      <Stack.Screen name="ShopDetailsFull" component={ShopDetailsFullScreen} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="UserBookingsScreen" component={UserBookingsScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="SalonsListScreen" component={SalonsListScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colors.primary }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50, // Standard height
            backgroundColor: colors.primary,
            borderTopWidth: 0,
            elevation: 0,
            // Add padding to account for the FAB
            paddingBottom: 5,
            paddingTop: 5,
          },
        }}
      >
        {/* --- Screen 1: Home --- */}
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={({ route }) => ({
            tabBarStyle: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeMain';
              // Logic to hide tab bar (preserved)
              if (
                [
                  'ShopDetailsSummary',
                  'ShopDetailsFull',
                  'ServiceDetails',
                  'Booking',
                  'SearchScreen',
                ].includes(routeName)
              ) {
                return { display: 'none' };
              }
              // Default style
              return {
                height: 50,
                backgroundColor: colors.primary,
                borderTopWidth: 0,
                elevation: 0,
                paddingBottom: 5,
                paddingTop: 5,
              };
            })(route),
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'home' : 'home-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
              </View>
            ),
          })}
        />

         {/* --- Screen 2: Notifications --- */}
        <Tab.Screen
          name="NotificationTab"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
                {!focused && <View style={styles.badge} />}
              </View>
            ),
          }}
        />

        

        {/* --- Screen 3: AI FAB --- */}
        <Tab.Screen
          name="AIBasedHairs"
          component={AIBasedHairs}
          options={{
            tabBarIcon: ({ focused }) => (
              // This is the icon inside the FAB
              <Icon
                name="qr-code-outline"
                size={30}
                color={colors.primary}
              />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                style={styles.fabContainer}
                activeOpacity={0.9}
              >
                <View style={styles.fab}>
                  {props.children}
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        {/* --- Screen 4: Bookings --- */}
        <Tab.Screen
          name="BookingsTab"
          component={UserBookingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'clipboard' : 'clipboard-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
              </View>
            ),
          }}
        />


        {/* --- Screen 5: Profile --- */}
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
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

const styles = StyleSheet.create({
  // --- New FAB Styles ---
  fabContainer: {
    // This container helps center the FAB
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    // Lifts the button up
    transform: [{ translateY: -25 }],
    // Shadow for depth
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    // Center the icon
    justifyContent: 'center',
    alignItems: 'center',
    // "Cutout" effect
    borderWidth: 4,
    borderColor: colors.primary,
  },
  
  // --- Refined Icon Styles ---
  iconContainer: {
    width: 50, // Standardized width
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,  // Adjusted position
    right: 12, // Adjusted position
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.badge,
    borderWidth: 1,
    borderColor: colors.white, // White border to pop
  },
  activeBar: {
    position: 'absolute',
    top: -10,
 // Position at the top of the container
    width: 40, // Width of the bar
    height: 4,  // Thickness of the bar
    borderRadius: 2,
    backgroundColor: colors.white,
  },
});