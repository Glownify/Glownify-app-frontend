import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuperAdminDashboard from '../screens/SuperAdminScreens/SuperAdminDashboard';

const Stack = createNativeStackNavigator();

export default function SuperAdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={SuperAdminDashboard} />
      {/* add more screens */}
    </Stack.Navigator>
  );
}