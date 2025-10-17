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
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker'; // For the country code picker

export default function RegisterScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+01'); // Default country code

  const handleRegister = () => {
    console.log('Registering with:', { name, email, mobileNumber, password });
    // Add your registration logic here
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Text style={styles.title}>Create an account,</Text>
      <Text style={styles.subtitle}>
        Please type full information bellow and we can {'\n'}create your account
      </Text>

      {/* Name Input */}
      <View style={styles.inputBox}>
        <View style={styles.inputWrapper}>
          <Feather name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Feather name="mail" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Mobile Number Input with Country Code */}
        <View style={styles.inputWrapper}>
          {/* Country Code Picker */}
          <View style={styles.countryCodeContainer}>
            <Image
              source={{ uri: 'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg' }} // Placeholder flag, you might want to use a local asset or a more robust library
              style={styles.flagIcon}
            />
            <Picker
              selectedValue={selectedCountryCode}
              onValueChange={(itemValue, itemIndex) => setSelectedCountryCode(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem} // Apply style to picker items
            >
              <Picker.Item label="+01" value="+01" />
              <Picker.Item label="+91" value="+91" />
              <Picker.Item label="+44" value="+44" />
              {/* Add more country codes as needed */}
            </Picker>
            <Feather name="chevron-down" size={16} color="#888" style={styles.pickerArrow} />
          </View>
          <TextInput
            style={[styles.input, styles.mobileInput]}
            placeholder="Mobile number"
            placeholderTextColor="#999"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
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
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.termsText}>
        By signing up you agree to our <Text style={styles.linkText}>Term of use and privacy {'\n'}notice</Text>
      </Text>

      {/* Join Now Button */}
      <TouchableOpacity style={styles.joinNowButton} onPress={handleRegister}>
        <Text style={styles.joinNowText}>Join Now</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>or</Text>

      {/* Google Sign-Up */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require('../../assets/google-logo.png')} // Make sure you have this image in your assets folder
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Join with Google</Text>
      </TouchableOpacity>

      {/* Already have an account? Sign In */}
      <TouchableOpacity>
        <Text style={styles.footerText}>
          Already have an account? <Text onPress={() => navigation.navigate('Login')} style={styles.signInLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 25,
    paddingTop: StatusBar.currentHeight + 20, // Adjust for status bar
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1A1A1A',
  },
  subtitle: {
    color: '#888',
    marginBottom: 40,
    fontSize: 16,
    lineHeight: 24,
  },
  inputBox: {
    marginBottom: 20, // Space below the input fields block
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3F6',
    borderRadius: 15, // Slightly less rounded than full pill for a softer look
    paddingHorizontal: 15,
    marginBottom: 15, // Space between input fields
    height: 55, // Fixed height for consistency
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0, // Remove default vertical padding
  },
  // Specific styling for the mobile input when combined with country code
  mobileInput: {
    flex: 1, // Allow it to take remaining space
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Space between picker and mobile input
  },
  flagIcon: {
    width: 24,
    height: 24,
    borderRadius: 12, // Make it circular
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  picker: {
    width: 65, // Adjust width to fit content
    height: 50, // Match inputWrapper height for vertical alignment
    color: '#333',
    paddingVertical: 0,
    justifyContent: 'center',
  },
  pickerItem: {
    fontSize: 16,
  },
  pickerArrow: {
    marginLeft: -5, // Adjust to bring closer to the text
    marginRight: 5,
  },
  eyeIconContainer: {
    paddingLeft: 10, // Padding for better touch target
  },
  termsText: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  linkText: {
    color: '#1E90FF', // Brighter blue
    fontWeight: '600',
  },
  joinNowButton: {
    backgroundColor: '#156778', // Teal color
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  joinNowText: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
  signInLink: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});