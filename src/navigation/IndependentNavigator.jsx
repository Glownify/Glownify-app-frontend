import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import IndependentProDashboard from '../screens/IndependentProScreens/tabScreens/IndependentProDashboard';
import IndependentManageServicesScreen from '../screens/IndependentProScreens/IndependentManageServicesScreen';
import IndependentProProfileScreen from '../screens/IndependentProScreens/IndependentProProfileScreen';
import IndependentProProfileEditScreen from '../screens/IndependentProScreens/IndependentProProfileEditScreen';
import IndependentProBooking from '../screens/IndependentProScreens/tabScreens/booking/IndependentProBooking';
import IndependentProBookingDetail from '../screens/IndependentProScreens/tabScreens/booking/Independentprobookingdetail';
import IndependentProBillingDetail from '../screens/IndependentProScreens/tabScreens/booking/Independentprobillingdetail';
import ArriveScreen from '../screens/IndependentProScreens/serviceWorkflow/ArriveScreen';
import OTPVerificationScreen from '../screens/IndependentProScreens/serviceWorkflow/OTPVerificationScreen';
import ServiceStartedScreen from '../screens/IndependentProScreens/serviceWorkflow/ServiceStartedScreen';
import CompleteServiceScreen from '../screens/IndependentProScreens/serviceWorkflow/CompleteServiceScreen';
import ServiceCompletedScreen from '../screens/IndependentProScreens/serviceWorkflow/ServiceCompletedScreen';
import { loadIndependentServiceWorkflow } from '../redux/slices/independentServiceWorkflowSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  inactive: '#E0E0E0',
  black: '#000000',
  badge: '#FFA500',
};

const hiddenBookingRoutes = new Set([
  'IndependentProBookingDetail',
  'IndependentProBillingDetail',
  'ArriveScreen',
  'OTPVerificationScreen',
  'ServiceStartedScreen',
  'CompleteServiceScreen',
  'ServiceCompletedScreen',
]);

const CustomerDetailsScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockText}>Customer Details Screen</Text>
  </View>
);

const resolveTabBarStyle = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'IndependentProBookingHome';

  if (hiddenBookingRoutes.has(routeName)) {
    return { display: 'none' };
  }

  return styles.tabBar;
};

function IndependentHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="IndependentProDashboardHome"
        component={IndependentProDashboard}
      />
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
    </Stack.Navigator>
  );
}

function IndependentBookingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen
        name="IndependentProBookingHome"
        component={IndependentProBooking}
      />
      <Stack.Screen
        name="IndependentProBookingDetail"
        component={IndependentProBookingDetail}
      />
      <Stack.Screen
        name="IndependentProBillingDetail"
        component={IndependentProBillingDetail}
      />
      <Stack.Screen name="ArriveScreen" component={ArriveScreen} />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
      />
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
      <Stack.Screen
        name="ServiceCompletedScreen"
        component={ServiceCompletedScreen}
      />
    </Stack.Navigator>
  );
}

function IndependentProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="IndependentProProfileHome"
        component={IndependentProProfileScreen}
      />
      <Stack.Screen
        name="IndependentProProfileEdit"
        component={IndependentProProfileEditScreen}
      />
    </Stack.Navigator>
  );
}

export default function IndependentNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIndependentServiceWorkflow());
  }, [dispatch]);

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: colors.primary }}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="IndependentProDashboardTab"
          component={IndependentHomeStack}
          options={{
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
          }}
        />

        <Tab.Screen
          name="IndependentProBookingsTab"
          component={IndependentBookingsStack}
          options={({ route }) => ({
            tabBarStyle: resolveTabBarStyle(route),
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeBar} />}
                <Icon
                  name={focused ? 'calendar' : 'calendar-outline'}
                  size={26}
                  color={focused ? colors.white : colors.inactive}
                />
                <View style={styles.badge} />
              </View>
            ),
          })}
        />

        <Tab.Screen
          name="IndependentManageServicesTab"
          component={IndependentManageServicesScreen}
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

        <Tab.Screen
          name="IndependentProProfileTab"
          component={IndependentProfileStack}
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
  tabBar: {
    height: 50,
    backgroundColor: colors.primary,
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: 5,
    paddingTop: 5,
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
  mockScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
