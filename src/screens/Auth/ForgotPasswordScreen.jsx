import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.content}>
          {/* ## Header Text ## */}
          <Text style={styles.title}>Forgot password,</Text>
          <Text style={styles.subtitle}>
            Please type your email below and we will give you an OTP code
          </Text>

          {/* ## Email Input ## */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={22} color="#8e8e8e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#8e8e8e"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* ## Alternative Link ## */}
          <TouchableOpacity onPress={() => console.log('Navigate to phone number screen...')}>
            <Text style={styles.linkText}>Use phone number?</Text>
          </TouchableOpacity>
          
          {/* ## Send Code Button ## */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => console.log('Sending OTP code...')}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ## Stylesheet ##
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7F8',
    borderRadius: 50,
    marginBottom: 15, // Adjusted margin
    paddingHorizontal: 20,
    height: 55,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  linkText: {
    color: '#156778',
    fontSize: 15,
    textAlign: 'right',
    marginBottom: 30, // Spacing before the button
    fontWeight: '600'
  },
  button: {
    backgroundColor: '#156778',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});