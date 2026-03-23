import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import IndependentProDashboard from '../screens/IndependentProScreens/tabScreens/IndependentProDashboard';
import IndependentManageServicesScreen from '../screens/IndependentProScreens/IndependentManageServicesScreen';
import IndependentProProfileScreen from '../screens/IndependentProScreens/IndependentProProfileScreen';
import IndependentProBooking from '../screens/IndependentProScreens/tabScreens/booking/IndependentProBooking';
import IndependentProBookingDetail from '../screens/IndependentProScreens/tabScreens/booking/Independentprobookingdetail';
import IndependentProBillingDetail from '../screens/IndependentProScreens/tabScreens/booking/Independentprobillingdetail';
import IndividualReportScreen from '../screens/IndependentProScreens/IndividualReportScreen';
import IndividualEarningsScreen from '../screens/IndependentProScreens/IndividualEarningsScreen';
import IndividualNotificationsScreen from '../screens/IndependentProScreens/IndividualNotificationsScreen';
import IndividualAvailabilityScreen from '../screens/IndependentProScreens/IndividualAvailabilityScreen';
import IndividualProfileManagementScreen from '../screens/IndependentProScreens/IndividualProfileManagementScreen';
import ArriveScreen from '../screens/IndependentProScreens/serviceWorkflow/ArriveScreen';
import OTPVerificationScreen from '../screens/IndependentProScreens/serviceWorkflow/OTPVerificationScreen';
import ServiceStartedScreen from '../screens/IndependentProScreens/serviceWorkflow/ServiceStartedScreen';
import CompleteServiceScreen from '../screens/IndependentProScreens/serviceWorkflow/CompleteServiceScreen';
import ServiceCompletedScreen from '../screens/IndependentProScreens/serviceWorkflow/ServiceCompletedScreen';
import SubscriptionPlanScreen from '../screens/SubscriptionPlanScreen';
import { loadIndependentServiceWorkflow } from '../redux/slices/independentServiceWorkflowSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const colors = {
  primary: '#156778',
  white: '#FFFFFF',
  inactive: '#E0E0E0',
};

function TabIcon({ focused, activeIcon, inactiveIcon }) {
  return (
    <View style={styles.iconContainer}>
      {focused ? <View style={styles.activeBar} /> : null}
      <Icon
        name={focused ? activeIcon : inactiveIcon}
        size={24}
        color={focused ? colors.white : colors.inactive}
      />
    </View>
  );
}

const hiddenBookingRoutes = new Set([
  'ArriveScreen',
  'OTPVerificationScreen',
  'ServiceStartedScreen',
  'CompleteServiceScreen',
  'ServiceCompletedScreen',
]);

function resolveBookingTabStyle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'IndividualBookingsHome';

  if (hiddenBookingRoutes.has(routeName)) {
    return { display: 'none' };
  }

  return styles.tabBar;
}

function IndividualBookingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IndividualBookingsHome" component={IndependentProBooking} />
      <Stack.Screen name="ArriveScreen" component={ArriveScreen} />
      <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
      <Stack.Screen name="ServiceStartedScreen" component={ServiceStartedScreen} />
      <Stack.Screen
        name="CompleteServiceScreen"
        component={CompleteServiceScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen name="ServiceCompletedScreen" component={ServiceCompletedScreen} />
    </Stack.Navigator>
  );
}

function IndependentTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 2,
          fontWeight: '600',
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: styles.tabBar,
      }}
      >
        <Tab.Screen
        name="IndependentProDashboardTab"
        component={IndependentProDashboard}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon="grid"
              inactiveIcon="grid-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="IndividualBookingsTab"
        component={IndividualBookingsStack}
        options={({ route }) => ({
          title: 'Booking',
          tabBarStyle: resolveBookingTabStyle(route),
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon="calendar"
              inactiveIcon="calendar-outline"
            />
          ),
        })}
      />

      <Tab.Screen
        name="ViewReport"
        component={IndividualReportScreen}
        options={{
          title: 'View Report',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon="bar-chart"
              inactiveIcon="bar-chart-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="IndividualServices"
        component={IndependentManageServicesScreen}
        options={{
          title: 'Services',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon="clipboard"
              inactiveIcon="clipboard-outline"
            />
          ),
        }}
      />

      <Tab.Screen
        name="IndividualProfile"
        component={IndependentProProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              activeIcon="person"
              inactiveIcon="person-outline"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function IndependentNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIndependentServiceWorkflow());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="IndependentTabs"
          component={IndependentTabs}
          options={{ animation: 'none' }}
        />
        <Stack.Screen name="IndividualBookingDetail" component={IndependentProBookingDetail} />
        <Stack.Screen name="IndividualBillingDetail" component={IndependentProBillingDetail} />
        <Stack.Screen name="IndividualNotifications" component={IndividualNotificationsScreen} />
        <Stack.Screen name="IndividualEarnings" component={IndividualEarningsScreen} />
        <Stack.Screen name="IndividualAvailability" component={IndividualAvailabilityScreen} />
        <Stack.Screen
          name="IndividualProfileManagement"
          component={IndividualProfileManagementScreen}
        />
        <Stack.Screen
          name="IndependentProProfileEdit"
          component={IndividualProfileManagementScreen}
        />
        <Stack.Screen name="IndividualManageServices" component={IndependentManageServicesScreen} />
        <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlanScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: 6,
    paddingTop: 6,
  },
  iconContainer: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBar: {
    position: 'absolute',
    top: -10,
    width: 36,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
});
