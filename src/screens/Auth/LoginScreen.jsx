import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, skipLogin } from '../../redux/slices/authSlice';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/common/Button';
import AppInput from '../../components/common/Input';
import {S} from '../../theme';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      dispatch(
        showSnackbar({
          message: 'Please enter both email and password',
          type: 'error',
          duration: 3000,
        }),
      );
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <SafeAreaView className="flex-1 bg-base">
      <View
        className="flex-1 justify-center"
        style={{paddingHorizontal: S.space.xl, gap: S.space.xl}}>

        {/* Header - "back," in pink */}
        <View style={{gap: S.space.sm}}>
          <Text
            className="font-bold text-neutral-900"
            style={{fontSize: S.fs.xxl}}>
            Welcome{' '}
            <Text className="text-primary-600">back,</Text>
          </Text>
          <Text className="text-neutral-500" style={{fontSize: S.fs.md}}>
            Glad to meet you again! Please login to use the app.
          </Text>
        </View>

        {/* Inputs */}
        <View style={{gap: S.space.lg}}>
          <AppInput
            value={email}
            onChangeText={setEmail}
            leftIcon="mail"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AppInput
            value={password}
            onChangeText={setPassword}
            leftIcon="lock"
            placeholder="Password"
            secureTextEntry
          />
        </View>

        {/* Forgot Password - pink */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          className="self-end">
          <Text className="text-primary-600 font-semibold">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Sign In - pink button */}
        <AppButton
          label="Sign In"
          onPress={handleLogin}
          loading={loading}
          className="bg-primary-600"
        />

        {/* Divider with lines */}
        <View className="flex-row items-center">
          <View className="flex-1 h-px bg-neutral-200" />
          <Text
            className="text-neutral-400"
            style={{paddingHorizontal: S.space.sm}}>
            or
          </Text>
          <View className="flex-1 h-px bg-neutral-200" />
        </View>

        {/* Google Sign-In */}
        <AppButton
          label="Sign in with Google"
          variant="outline"
          icon={{ source: require('../../assets/google-logo.png') }}
          onPress={() => {}}
        />

        {/* Register - "Join Now" in dark bold */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className="items-center">
          <Text className="text-center text-neutral-500" style={{fontSize: S.fs.sm}}>
            Don't have an account?{' '}
            <Text className="text-neutral-900 font-bold">Join Now</Text>
          </Text>
        </TouchableOpacity>

        {/* Skip - pink text */}
        <TouchableOpacity
          onPress={() => dispatch(skipLogin())}
          className="items-center"
          style={{padding: S.space.xs}}>
          <Text className="text-primary-600" style={{fontSize: S.fs.sm}}>
            Skip for now
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
