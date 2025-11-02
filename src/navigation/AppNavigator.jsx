// src/navigation/AppNavigator.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/UserScreens/HomeScreen/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
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

import ProfileEditScreen from '../screens/UserScreens/ProfileEditScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();

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
    </Stack.Navigator>
  );
}

// --- TOP TAB NAVIGATOR COMPONENT ---
function MessagesTopTabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#156778',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            textTransform: 'none',
            fontSize: 16,
            fontWeight: '600',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#156778',
            height: 2.5,
          },
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <TopTab.Screen
          name="Message"
          component={MessageScreen}
          options={{ title: 'Messages' }}
        />
        <TopTab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ title: 'Notification' }}
        />
      </TopTab.Navigator>
    </SafeAreaView>
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
          } else if (route.name === 'AIBasedHairs') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
         } else if (route.name === 'BookingsTab') {
           iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (route.name === 'MessagesTab') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
            showBadge = true;
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={styles.iconContainer}>
              <Icon name={iconName} size={26} color={color} />
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
            if (routeName === 'ShopDetailsSummary' ||
                routeName === 'ShopDetailsFull' ||
                routeName === 'ServiceDetails' ||
                routeName === 'Booking' ||
                routeName === 'SearchScreen') {
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
      <Tab.Screen name="BookingsTab" component={UserBookingsScreen} />
      <Tab.Screen name="AIBasedHairs" component={AIBasedHairs} />
      <Tab.Screen name="MessagesTab" component={MessagesTopTabNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
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
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
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