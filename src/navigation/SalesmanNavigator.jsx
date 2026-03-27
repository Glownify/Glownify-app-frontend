import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import SalesPersonDashboard from '../screens/Salesman/Salespersondashboard';
import SalesmanLeadsScreen from '../screens/Salesman/SalesmanLeadsScreen';
import MySalonsScreen from '../screens/Salesman/MySalonsScreen';
import SalesPersonProfileScreen from '../screens/Salesman/Salespersonprofilescreen';
import SalesmanSalonDetailScreen from '../screens/Salesman/SalesmanSalonDetailScreen';
import SalesmanRegisterSalonScreen from '../screens/Salesman/SalesmanRegisterSalonScreen';
import {
  buildSalesmanSummary,
  salesmanTheme,
} from '../screens/Salesman/salesmanData';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const leadsBadgeCount = buildSalesmanSummary().followUpsDue;

function TabIcon({
  focused,
  activeIcon,
  inactiveIcon,
  label,
  badgeCount,
}) {
  return (
    <View style={styles.tabItem}>
      <View style={[styles.iconShell, focused && styles.iconShellActive]}>
        <Icon
          name={focused ? activeIcon : inactiveIcon}
          size={22}
          color={focused ? salesmanTheme.brand : '#98A2B3'}
        />
        {!focused && badgeCount ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

const renderDashboardTabIcon = ({ focused }) => (
  <TabIcon
    focused={focused}
    label="Home"
    activeIcon="home"
    inactiveIcon="home-outline"
  />
);

const renderLeadsTabIcon = ({ focused }) => (
  <TabIcon
    focused={focused}
    label="Leads"
    activeIcon="flash"
    inactiveIcon="flash-outline"
    badgeCount={leadsBadgeCount}
  />
);

const renderSalonsTabIcon = ({ focused }) => (
  <TabIcon
    focused={focused}
    label="Salons"
    activeIcon="storefront"
    inactiveIcon="storefront-outline"
  />
);

const renderProfileTabIcon = ({ focused }) => (
  <TabIcon
    focused={focused}
    label="Profile"
    activeIcon="person"
    inactiveIcon="person-outline"
  />
);

function SalesmanTabs() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="SalesDashboardTab"
          component={SalesPersonDashboard}
          options={{
            tabBarIcon: renderDashboardTabIcon,
          }}
        />
        <Tab.Screen
          name="SalesLeadsTab"
          component={SalesmanLeadsScreen}
          options={{
            tabBarIcon: renderLeadsTabIcon,
          }}
        />
        <Tab.Screen
          name="SalesSalonsTab"
          component={MySalonsScreen}
          options={{
            tabBarIcon: renderSalonsTabIcon,
          }}
        />
        <Tab.Screen
          name="SalesProfileTab"
          component={SalesPersonProfileScreen}
          options={{
            tabBarIcon: renderProfileTabIcon,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function SalesmanNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SalesmanTabs" component={SalesmanTabs} />
      <Stack.Screen
        name="SalesmanSalonDetail"
        component={SalesmanSalonDetailScreen}
      />
      <Stack.Screen
        name="SalesmanRegisterSalon"
        component={SalesmanRegisterSalonScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: salesmanTheme.surface,
  },
  tabBar: {
    height: 72,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#E4E7EC',
    backgroundColor: salesmanTheme.surface,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 76,
  },
  iconShell: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconShellActive: {
    backgroundColor: salesmanTheme.brandSoft,
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: '#98A2B3',
  },
  tabLabelActive: {
    color: salesmanTheme.brand,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 2,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.accent,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
