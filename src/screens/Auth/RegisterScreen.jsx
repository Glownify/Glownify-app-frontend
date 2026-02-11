import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/slices/authSlice';
import Loader from '../../components/Loader';
import Dropdown from './../../components/common/Dropdown';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPnoneNo = /^[6-9]\d{9}$/;

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  const dispatch = useDispatch();
  const { signUpLoading, error } = useSelector(state => state.auth);

  const countryCodes = [
    { label: '🇮🇳 +91', value: '+91' },
    { label: '🇺🇸 +01', value: '+01' },
    { label: '🇬🇧 +44', value: '+44' },
  ];

  const handleRegister = async () => {
    if (!name || !email || !mobileNumber || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    } else if (!regexEmail.test(email)) {
      Alert.alert('Please Enter Valid Email!');
      return;
    } else if (!regexPnoneNo.test(mobileNumber)) {
      Alert.alert('Please Enter Valid Mobile Number!');
      return;
    }
    try {
      await dispatch(
        signupUser({ name, email, phone: mobileNumber, password }),
      ).unwrap();
      Alert.alert('Success', 'Account created successfully');
    } catch (err) {
      Alert.alert('Signup Failed', err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center gap-2xl">
        {/* ── Header ───────────────────────────────────────────────── */}
        <View className="gap-2 ">
          <Text className="text-3xl font-bold text-black">
            Create an account,
          </Text>
          <Text className="text-base text-gray-500">
            Please type full information below and we can {'\n'}create your
            account
          </Text>
        </View>

        {/* ── Input Fields ─────────────────────────────────────────── */}
        <View className="gap-3">
          {/* Name */}
          <View className="flex-row items-center px-md py-md gap-xs bg-neutral-100 rounded-input">
            <Feather name="user" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 text-base py-0 text-neutral-800"
              placeholder="Name"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <View className="flex-row items-center px-md py-md gap-xs bg-neutral-100 rounded-input">
            <Feather name="mail" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 text-base py-0 text-neutral-800"
              placeholder="Email address"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Mobile + Country Code */}
          <View className="flex-row items-center gap-2">
            <View className="w-32">
              <Dropdown
                options={countryCodes}
                value={selectedCountryCode}
                onSelect={setSelectedCountryCode}
                iconPosition="left"
              />
            </View>
            <View className="flex-1 flex-row items-center px-md py-md gap-xs bg-neutral-100 rounded-input">
              <TextInput
                className="flex-1 text-base py-0 text-neutral-800"
                placeholder="Mobile number"
                placeholderTextColor="#9ca3af"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password */}
          <View className="flex-row items-center px-md py-md gap-xs bg-neutral-100 rounded-input">
            <Feather name="lock" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 text-base py-0 text-neutral-800"
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="pl-3"
            >
              <Feather
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Terms ────────────────────────────────────────────────── */}
        <View className="items-center justify-center">
          <Text className="text-sm text-center text-neutral-400">
            By signing up you agree to our{' '}
          </Text>
          <Text className="font-semibold text-info">
            Terms of use and privacy notice
          </Text>
        </View>

        {/* ── Actions ──────────────────────────────────────────────── */}
        <View className="gap-4">
          {/* Join Now */}
          <TouchableOpacity
            className="py-4 items-center bg-primary rounded-full"
            onPress={handleRegister}
            disabled={signUpLoading}
          >
            {signUpLoading ? (
              <Loader />
            ) : (
              <Text className="text-white font-bold text-base">Join Now</Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text className="text-sm text-center text-error">{error}</Text>
          )}

          {/* Divider */}
          <Text className="text-center text-neutral-400">or</Text>

          {/* Google */}
          <TouchableOpacity className="flex-row items-center justify-center py-4 gap-3 border border-neutral-200 rounded-button">
            <Image
              source={require('../../assets/google-logo.png')}
              className="w-[22px] h-[22px]"
            />
            <Text className="font-semibold text-base text-neutral-700">
              Join with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Sign In ──────────────────────────────────────────────── */}
        <TouchableOpacity>
          <Text className="text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              className="font-bold text-info"
            >
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>

        {/* ── Service Provider ─────────────────────────────────────── */}
        <TouchableOpacity
          className="items-center py-4 gap-1 bg-primary-50 rounded-2xl"
          onPress={() => navigation.navigate('RoleSelection')}
        >
          <Text className="text-sm font-semibold text-primary-900">
            Are You a Service Provider?
          </Text>
          <Text className="text-base font-bold text-primary-500">
            Register as Partner
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}