import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, skipLogin } from '../../redux/slices/authSlice';
import { showSnackbar } from '../../redux/slices/snackbarSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // ✅ Handle login
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
        <View className="gap-md">
          <Text className="text-4xl font-bold text-neutral-900">
            Welcome back,
          </Text>
          <Text className="text-neutral-500 text-base">
            Glad to meet you again! Please login to use the app.
          </Text>
        </View>

        <View className="my-20">
          {/* Email Input */}
          <View className="flex-row items-center bg-[#F0F3F6] border border-[#F0F3F6] rounded-full px-4 mb-4">
            <Feather name="mail" size={20} color="#888" className="mr-2.5" />
            <TextInput
              className="flex-1 py-4 text-base text-neutral-800"
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="flex-row items-center bg-[#F0F3F6] border border-[#F0F3F6] rounded-full px-4 mb-4">
            <Feather name="lock" size={20} color="#888" className="mr-2.5" />
            <TextInput
              className="flex-1 py-4 text-base text-neutral-800"
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Feather
                name={isPasswordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text className="text-[#1E90FF] self-end mb-8 font-semibold">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-[#156778] py-[18px] rounded-full items-center mb-8 shadow-sm"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-base">Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <Text className="text-center text-neutral-400 mb-8">or</Text>

        {/* Google Sign-In */}
        <TouchableOpacity className="flex-row items-center bg-white border border-neutral-200 rounded-full py-4 justify-center mb-10">
          <Image
            source={require('../../assets/google-logo.png')}
            className="w-[22px] h-[22px] mr-3"
          />
          <Text className="text-neutral-700 font-semibold text-base">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Register */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-center text-neutral-500 text-[15px]">
            Don’t have an account?{' '}
            <Text className="text-[#1E90FF] font-bold">Join Now</Text>
          </Text>
        </TouchableOpacity>

        {/* Skip for now */}
        <TouchableOpacity
          className="items-center justify-center"
          onPress={() => dispatch(skipLogin())}
        >
          <Text className="text-center text-blue-500 text-[15px]">Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
