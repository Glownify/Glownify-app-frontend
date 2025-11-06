import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ManageSalonsScreen from '../screens/SuperAdminScreens/ManageSalonsScreen';
import ManageCategoriesScreen from '../screens/SuperAdminScreens/ManageCategoriesScreen';

// --- Screens ---
import SuperAdminDashboard from '../screens/SuperAdminScreens/SuperAdminDashboard';
import SuperAdminProfileScreen from '../screens/SuperAdminScreens/SuperAdminProfileScreen';
import ManageUsersScreen from '../screens/SuperAdminScreens/ManageUsersScreen';

import SalesTeamManagement from '../screens/SuperAdminScreens/SalesTeamManagement';

const ManageUsersScreen = () => (
  <SafeAreaView style={styles.center}>
    <Text style={styles.text}>Manage Users Screen (Static)</Text>
  </SafeAreaView>
);

const Tab = createBottomTabNavigator();

// --- Main Super Admin Tab Navigator ---
export default function SuperAdminNavigator() {
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
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let showActiveDot = false;

          switch (route.name) {
            case 'SuperDashboard':
              iconName = focused ? 'grid' : 'grid-outline';
              showActiveDot = focused;
              break;
            case 'SalesTeam':
              iconName = focused ? 'trending-up' : 'trending-up-outline';
              break;
            case 'ManageSalons':
              iconName = focused ? 'business' : 'business-outline';
              break;
            case 'ManageUsers':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'ManageCategories':
              iconName = focused ? 'pricetag' : 'pricetag-outline';
              break;
            case 'SuperProfile':
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
      <Tab.Screen name="SuperDashboard" component={SuperAdminDashboard} />
      <Tab.Screen name="SalesTeam" component={SalesTeamManagement} />
      <Tab.Screen name="ManageSalons" component={ManageSalonsScreen} />
      <Tab.Screen name="ManageUsers" component={ManageUsersScreen} />
      <Tab.Screen name="ManageCategories" component={ManageCategoriesScreen} />
      <Tab.Screen name="SuperProfile" component={SuperAdminProfileScreen} />
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