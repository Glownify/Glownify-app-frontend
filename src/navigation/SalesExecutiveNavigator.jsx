import React from 'react';
import {View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SalesExecutiveDashboardScreen from '../screens/SalesExecutiveScreens/SalesExecutiveDashboardScreen'
import SalesExecutiveProfileScreen from '../screens/SalesExecutiveScreens/SalesExecutiveProfileScreen'

const Tab = createBottomTabNavigator();

// --- AESTHETIC REFINEMENT: Define color palette ---
const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  inactive: '#B0BEC5',
  inactiveLight: '#E0E0E0',
  black: '#000000',
  badge: '#FFA500', // Orange
  shadow: '#000000',
};



export default function SalesExecutiveNavigator() {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colors.primary }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 65,
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: '#F0F0F0',
            elevation: 10,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        {/* Screen 0: Home */}
        <Tab.Screen
          name="Dashboard"
          component={SalesExecutiveDashboardScreen}
          options={() => ({
            tabBarIcon: () => (
              <Ionicons name="grid" color={colors.primary}  size={30}/>
            ),
          })}
        ></Tab.Screen>
        
        {/* Screen 2: Home */}
        <Tab.Screen
          name="Profile"
          component={SalesExecutiveProfileScreen}
          options={() => ({
            tabBarIcon: () => (
              <Ionicons name="person" color={colors.primary} size={30}/>
            ),
          })}
        ></Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}
