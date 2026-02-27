import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
      >
        <View className="flex-1 px-6 justify-center gap-2xl mt-6">
          {/* ── Header ───────────────────────────────────────────────── */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-[#1a1a2e]">
              Create an account
            </Text>
            <Text className="text-base text-gray-500">
              Please type full information below and we can create your account
              for Salone.
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
            <View className="flex-row gap-2">
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
          <Text className="text-sm text-center text-neutral-400">
            By signing up you agree to our{' '}
            <Text className="text-[#E91E63] font-semibold" onPress={() => {}}>
              Terms of use
            </Text>
            <Text className="text-neutral-400"> and </Text>
            <Text className="text-[#E91E63] font-semibold" onPress={() => {}}>
              privacy notice
            </Text>
          </Text>

          {/* ── Actions ──────────────────────────────────────────────── */}
          <View className="gap-4">
            <AppButton
              label="Join Now"
              onPress={handleRegister}
              loading={signUpLoading}
              style={{ backgroundColor: '#E91E63' }}
            />

            {error && (
              <Text className="text-sm text-center text-error">{error}</Text>
            )}

            {/* Divider with lines + uppercase OR */}
            <View className="flex-row items-center">
              <View className="flex-1 h-px bg-neutral-200" />
              <Text className="text-neutral-400 mx-3 text-xs font-semibold tracking-widest">
                OR
              </Text>
              <View className="flex-1 h-px bg-neutral-200" />
            </View>

            <AppButton
              label="Join with Google"
              variant="outline"
              icon={{ source: require('../../assets/google-logo.png') }}
              onPress={() => {}}
            />
          </View>

          {/* ── Sign In ──────────────────────────────────────────────── */}
          <Text className="text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              className="font-bold text-[#E91E63]"
            >
              Sign In
            </Text>
          </Text>

          {/* ── Service Provider ─────────────────────────────────────── */}
          <TouchableOpacity
            className="items-center py-5 bg-[#FFF0F3] rounded-2xl"
            onPress={() => navigation.navigate('RoleSelection')}
          >
            <Text className="text-sm text-neutral-700 font-medium mb-1">
              Are you a Service Provider?
            </Text>
            <Text className="text-base font-bold text-[#E91E63]">
              Register as Partner →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
