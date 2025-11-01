import { View, Text, Button, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuperAdminProfileScreen() {
    const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Text>SuperAdminProfileScreen</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});