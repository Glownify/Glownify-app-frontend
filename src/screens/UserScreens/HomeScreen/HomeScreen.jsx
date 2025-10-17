import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import Header from '../../../components/Header';

export default function HomeScreen({ navigation }) { // <-- receive navigation prop
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Welcome {user?.name} 👕</Text>
      {/* <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} /> */}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
