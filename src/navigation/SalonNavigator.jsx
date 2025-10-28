import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SalonAdminDashboard from '../screens/SalonAdminScreens/SalonAdminDashboard';

const Stack = createNativeStackNavigator();

export default function SalonNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SalonDashboard" component={SalonAdminDashboard} />
    </Stack.Navigator>
  );
}