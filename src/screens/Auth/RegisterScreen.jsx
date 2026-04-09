import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/slices/authSlice';
import Dropdown from '../../components/common/Dropdown';
import AppButton from '../../components/common/Button';
import AppInput from '../../components/common/Input';
import {S} from '../../theme';

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
    <SafeAreaView className="flex-1 bg-base">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingVertical: S.space.xl}}
      >
        <View
          className="flex-1 justify-center"
          style={{
            paddingHorizontal: S.space.xl,
            gap: S.space['2xl'],
          }}>
          {/* ── Header ───────────────────────────────────────────────── */}
          <View style={{gap: S.space.sm}}>
            <Text className="font-bold text-neutral-900" style={{fontSize: S.fs.xl}}>
              Create an account
            </Text>
            <Text className="text-neutral-500" style={{fontSize: S.fs.md}}>
              Please type full information below and we can create your account
              for Salone.
            </Text>
          </View>

          {/* ── Input Fields ─────────────────────────────────────────── */}
          <View style={{gap: S.space.md}}>
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
            <View className="flex-row" style={{gap: S.space.sm}}>
              <View style={{width: S.size.docPreview * 0.65}}>
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
          <Text className="text-center text-neutral-400" style={{fontSize: S.fs.xs}}>
            By signing up you agree to our{' '}
            <Text className="text-primary-600 font-semibold" onPress={() => {}}>
              Terms of use
            </Text>
            <Text className="text-neutral-400"> and </Text>
            <Text className="text-primary-600 font-semibold" onPress={() => {}}>
              privacy notice
            </Text>
          </Text>

          {/* ── Actions ──────────────────────────────────────────────── */}
          <View style={{gap: S.space.lg}}>
            <AppButton
              label="Join Now"
              onPress={handleRegister}
              loading={signUpLoading}
              className="bg-primary-600"
            />

            {error && (
              <Text className="text-center text-error-500" style={{fontSize: S.fs.xs}}>
                {error}
              </Text>
            )}

            {/* Divider with lines + uppercase OR */}
            <View className="flex-row items-center">
              <View className="flex-1 h-px bg-neutral-200" />
              <Text
                className="text-neutral-400 font-semibold tracking-widest"
                style={{fontSize: S.fs.xs, paddingHorizontal: S.space.sm}}>
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
          <Text className="text-center text-neutral-500" style={{fontSize: S.fs.xs}}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              className="font-bold text-primary-600"
            >
              Sign In
            </Text>
          </Text>

          {/* ── Service Provider ─────────────────────────────────────── */}
          <TouchableOpacity
            className="items-center bg-primary-50 rounded-2xl"
            style={{padding: S.space.xl, gap: S.space.xs}}
            onPress={() => navigation.navigate('RoleSelection')}
          >
            <Text className="text-neutral-700 font-medium" style={{fontSize: S.fs.xs}}>
              Are you a Service Provider?
            </Text>
            <Text className="font-bold text-primary-600" style={{fontSize: S.fs.md}}>
              Register as Partner →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
