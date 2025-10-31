import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function SalonAdminRegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [salonName, setSalonName] = useState('');
  const [salonAddress, setSalonAddress] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = () => {
    const data = { fullName, email, mobileNumber, password, salonName, salonAddress, licenseNumber };
    console.log('Salon Admin Registration Data:', data);
    // TODO: API call
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.title}>Register as Salon Admin</Text>

      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="mail" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="phone" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Mobile Number" value={mobileNumber} onChangeText={setMobileNumber} keyboardType="phone-pad" />
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!isPasswordVisible} />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={{ paddingLeft: 10 }}>
          <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="home" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Salon Name" value={salonName} onChangeText={setSalonName} />
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="map-pin" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Salon Address" value={salonAddress} onChangeText={setSalonAddress} />
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="file-text" size={20} color="#888" style={styles.icon} />
        <TextInput style={styles.input} placeholder="License Number" value={licenseNumber} onChangeText={setLicenseNumber} />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 25, paddingTop: StatusBar.currentHeight + 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F3F6', borderRadius: 15, paddingHorizontal: 15, marginBottom: 15, height: 55 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333', paddingVertical: 0 },
  registerButton: { backgroundColor: '#156778', paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginBottom: 30 },
  registerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
