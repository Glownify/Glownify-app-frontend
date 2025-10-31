import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SelectAdminTypeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Select your account type</Text>

      {/* Salon Admin Button */}
      <TouchableOpacity
        style={[styles.button, styles.salonButton]}
        onPress={() => navigation.navigate('SalonAdminRegister')}
      >
        <Icon name="storefront" size={28} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Salon Admin</Text>
        <Text style={styles.buttonSubText}>Manage your salon & staff</Text>
      </TouchableOpacity>

      {/* Independent Professional Button */}
      <TouchableOpacity
        style={[styles.button, styles.independentButton]}
        onPress={() => navigation.navigate('IndependentProRegister')}
      >
        <Icon name="account-tie" size={28} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Independent Professional</Text>
        <Text style={styles.buttonSubText}>Offer services independently</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 25 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 8, 
    color: '#1A1A1A' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#888', 
    marginBottom: 50, 
    textAlign: 'center' 
  },
  button: { 
    width: '100%', 
    paddingVertical: 20, 
    borderRadius: 25, 
    marginBottom: 20, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  salonButton: {
    backgroundColor: '#156778',
  },
  independentButton: {
    backgroundColor: '#1E90FF',
  },
  icon: {
    marginBottom: 6,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  buttonSubText: {
    color: '#E0F2F7', 
    fontSize: 13, 
    marginTop: 4,
    textAlign: 'center'
  }
});
