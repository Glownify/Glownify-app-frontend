import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// ========================
// IMPORT SCREENS
// ========================
import SalesPersonDashboard from '../screens/Salesman/Salespersondashboard';
import SalesPersonProfileScreen from '../screens/Salesman/Salespersonprofilescreen';

// ========================
//  MOCK SCREENS (TABS)
// ========================
const SalesManOrders = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockText}>Salesman Orders Screen</Text>
  </View>
);

const SalesManChat = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockText}>Salesman Chat Screen</Text>
  </View>
);

const SalesManQRCode = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockText}>AI / QR Code Screen</Text>
  </View>
);

// ========================
// EXTRA SCREENS (NOT IN TABS)
// ========================
const CustomerDetailsScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockText}>Customer Details Screen</Text>
  </View>
);

const AddCustomerScreen = () => (
  <View style={styles.mockScreen}>
    <Text style={styles.mockText}>Add Customer Screen</Text>
  </View>
);

// ========================
// NAV SETUP
// ========================
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// COLORS
const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  inactive: '#E0E0E0',
  black: '#000000',
  badge: '#FFA500',
};

// MAIN STACK (Dashboard + others)
function SalesHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SalesHomeMain" component={SalesPersonDashboard} />

      {/* Screens not shown in tab bar */}
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
      <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
    </Stack.Navigator>
  );
}

export default function SalesmanNavigator() {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colors.primary }}>
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
        {/* DASHBOARD */}
        <Tab.Screen
          name="SalesHome"
          component={SalesHomeStack}
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

        {/* CHAT / NOTIFICATION */}
        <Tab.Screen
          name="SalesChat"
          component={SalesManChat}
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

        {/* FAB – QR / AI */}
        <Tab.Screen
          name="SalesQRCode"
          component={SalesManQRCode}
          options={{
            tabBarIcon: () => (
              <Icon name="qr-code-outline" size={28} color={colors.primary} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} style={styles.fabContainer}>
                <View style={styles.fab}>
                  {props.children}
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        {/* ORDERS */}
        <Tab.Screen
          name="SalesOrders"
          component={SalesManOrders}
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

        {/* PROFILE */}
        <Tab.Screen
          name="SalesProfile"
          component={SalesPersonProfileScreen}
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


// ========================
// STYLES
// ========================
const styles = StyleSheet.create({
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    transform: [{ translateY: -25 }],
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.primary,
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