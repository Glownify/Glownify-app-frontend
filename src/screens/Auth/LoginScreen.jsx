import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Feather from 'react-native-vector-icons/Feather';

export default function LoginScreen({navigation}) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    // simulate login success
    login({ name: 'John Doe', email });
    console.log('Logging in with:', { email, password });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.welcome}>Welcome back,</Text>
      <Text style={styles.subtitle}>
        Glad to meet you again!, please login to use the app.
      </Text>

      {/* Email Input */}
      <View style={styles.inputBox}>
      <View style={styles.inputWrapper}>
        <Feather name="mail" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <Feather name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>or</Text>

      {/* Google Sign-In */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require('../../assets/google-logo.png')} // Make sure you have this image
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Register */}
      <TouchableOpacity>
        <Text style={styles.footerText}>
          Don’t have an account? <Text onPress={() => navigation.navigate('Register')} style={styles.joinNow}>Join Now</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff', // Lighter background color
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1A1A1A',
  },
  subtitle: {
    color: '#888',
    marginBottom: 40,
    fontSize: 16,
  },
  inputBox: {
    marginVertical: 80,
  },
  // New wrapper for icon and text input
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3F6',
    borderWidth: 1,
    borderColor: '#F0F3F6',
    borderRadius: 30, // Fully rounded corners
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  forgotText: {
    color: '#1E90FF', // Brighter blue
    alignSelf: 'flex-end',
    marginBottom: 30,
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#156778', // Teal color from image
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    // Adding a subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 30,
    paddingVertical: 15,
    justifyContent: 'center',
    marginBottom: 40,
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
  googleText: {
    color: '#444',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
  },
  joinNow: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});