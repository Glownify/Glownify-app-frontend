import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/slices/authSlice';
import Dropdown from '../../components/common/Dropdown';
import AppButton from '../../components/common/Button';
import AppInput from '../../components/common/Input';

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPhoneNo = /^[6-9]\d{9}$/;

const countryCodes = [
  { label: '🇮🇳 +91', value: '+91' },
  { label: '🇺🇸 +01', value: '+01' },
  { label: '🇬🇧 +44', value: '+44' },
];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

  const dispatch = useDispatch();
  const { signUpLoading, error } = useSelector(state => state.auth);

  const handleRegister = async () => {
    if (!name || !email || !mobileNumber || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    } else if (!regexEmail.test(email)) {
      Alert.alert('Please Enter Valid Email!');
      return;
    } else if (!regexPhoneNo.test(mobileNumber)) {
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
        <View className="gap-2">
          <Text className="text-3xl font-bold text-black">
            Create an account,
          </Text>
          <Text className="text-base text-gray-500">
            Please type full information below and we can {'\n'}create your account
          </Text>
        </View>

        {/* ── Input Fields ─────────────────────────────────────────── */}
        <View className="gap-3">
          <AppInput
            value={name}
            onChangeText={setName}
            leftIcon="user"
            placeholder="Name"
            autoCapitalize="words"
          />

          <AppInput
            value={email}
            onChangeText={setEmail}
            leftIcon="mail"
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />

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
            <View className="flex-1">
              <AppInput
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="Mobile number"
                keyboardType="phone-pad"
                className="mb-0"
              />
            </View>
          </View>

          <AppInput
            value={password}
            onChangeText={setPassword}
            leftIcon="lock"
            placeholder="Password"
            secureTextEntry
          />
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
          <AppButton
            label="Join Now"
            onPress={handleRegister}
            loading={signUpLoading}
          />

          {error && (
            <Text className="text-sm text-center text-error">{error}</Text>
          )}

          <Text className="text-center text-neutral-400">or</Text>

          <AppButton
            label="Join with Google"
            variant="outline"
            icon={{ source: require('../../assets/google-logo.png') }}
            onPress={() => {}}
          />
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