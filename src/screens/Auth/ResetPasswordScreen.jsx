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

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.content}>
          {/* ## Header Text ## */}
          <Text style={styles.title}>New password,</Text>
          <Text style={styles.subtitle}>
            Now, you can create a new password and confirm it below
          </Text>

          {/* ## New Password Input ## */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={22} color="#8e8e8e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="New password"
              placeholderTextColor="#8e8e8e"
              secureTextEntry // Hides the password input
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* ## Confirm Password Input ## */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={22} color="#8e8e8e" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#8e8e8e"
              secureTextEntry // Hides the password input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* ## Confirmation Button ## */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => console.log('Confirming new password...')}>
            <Text style={styles.buttonText}>Confirm New Password</Text>
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
    marginBottom: 20,
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
  button: {
    backgroundColor: '#156778', // A nice teal color
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});