import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, skipLogin } from '../../redux/slices/authSlice';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../components/common/Button';
import AppInput from '../../components/common/Input';

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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-6 justify-center">

        {/* Header - "back," in pink */}
        <View className="mb-10">
          <Text className="text-4xl font-bold text-neutral-900">
            Welcome{' '}
            <Text className="text-[#E91E63]">back,</Text>
          </Text>
          <Text className="text-neutral-500 text-base mt-2">
            Glad to meet you again! Please login to use the app.
          </Text>
        </View>

        {/* Inputs */}
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

        {/* Forgot Password - pink */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          className="self-end mb-6"
        >
          <Text className="text-[#E91E63] font-semibold">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Sign In - pink button */}
        <AppButton
          label="Sign In"
          onPress={handleLogin}
          loading={loading}
          className="mb-6"
          style={{ backgroundColor: '#E91E63' }}
        />

        {/* Divider with lines */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-neutral-200" />
          <Text className="text-neutral-400 mx-3">or</Text>
          <View className="flex-1 h-px bg-neutral-200" />
        </View>

        {/* Google Sign-In */}
        <AppButton
          label="Sign in with Google"
          variant="outline"
          icon={{ source: require('../../assets/google-logo.png') }}
          onPress={() => {}}
          className="mb-8"
        />

        {/* Register - "Join Now" in dark bold */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className="mb-4"
        >
          <Text className="text-center text-neutral-500 text-[15px]">
            Don't have an account?{' '}
            <Text className="text-neutral-900 font-bold">Join Now</Text>
          </Text>
        </TouchableOpacity>

        {/* Skip - pink text */}
        <TouchableOpacity
          onPress={() => dispatch(skipLogin())}
          className="items-center py-2"
        >
          <Text className="text-[#E91E63] text-[15px]">Skip for now</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}