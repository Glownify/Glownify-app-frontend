import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearAuthState } from '../../redux/slices/authSlice';
import {S} from '../../theme';

export default function ForgotPasswordScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  // Get loading and error from redux
  const {loading, error} = useSelector(state => state.auth);

  const handleForgotPassword = async () => {
    try {
      // Clear previous states
      dispatch(clearAuthState());
      // Dispatch forgot password
      await dispatch(forgotPassword({ email })).unwrap();
      // Navigate to OTP screen with email
      navigation.navigate('EmailVerification', { email });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-base">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View
          className="flex-1 justify-center"
          style={{paddingHorizontal: S.space.xl, gap: S.space['2xl']}}>
          <View style={{gap: S.space.sm}}>
            <Text
              className="text-neutral-900 font-bold"
              style={{fontSize: S.fs.xxl}}>
              Forgot password,
            </Text>
            <Text className="text-neutral-500" style={{fontSize: S.fs.md}}>
              Please type your email below and we will give you an OTP code
            </Text>
          </View>

          <View style={{gap: S.space.md}}>
            <View
              className="flex-row items-center rounded-full bg-neutral-50"
              style={{paddingHorizontal: S.space.lg, height: S.size.avatarLg}}>
              <MaterialCommunityIcons
                name="email-outline"
                size={S.icon.md}
                color="#8e8e8e"
              />
              <TextInput
              className="flex-1 text-neutral-900"
              style={{fontSize: S.fs.md, marginLeft: S.space.sm}}
              placeholder="Email address"
              placeholderTextColor="#8e8e8e"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              className="items-center rounded-full bg-primary-600"
              style={{padding: S.space.lg}}
              onPress={handleForgotPassword}
              disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                className="font-bold text-white"
                style={{fontSize: S.fs.md_h}}>
                Send Code
              </Text>
            )}
            </TouchableOpacity>

            {error && (
              <Text
                className="text-error-500 text-center"
                style={{fontSize: S.fs.sm}}>
                {error}
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
