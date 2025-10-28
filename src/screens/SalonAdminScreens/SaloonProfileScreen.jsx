import { View, Text, Button, StyleSheet } from 'react-native'
import {logout} from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SaloonProfileScreen() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>SaloonProfileScreen</Text>
      <Button title="Logout" onPress={() => handleLogout()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});