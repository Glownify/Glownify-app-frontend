import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/slices/authSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {S} from '../../theme';

export default function ResetPasswordScreen({ navigation, route }) {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleReset = async () => {
    if (password !== confirmPassword) return alert('Passwords do not match');
    try {
      await dispatch(resetPassword({email, newPassword: password})).unwrap();
      alert('Password reset successfully!');
      navigation.navigate('Login'); // Go to login
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-base">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <View
          className="flex-1 justify-center"
          style={{paddingHorizontal: S.space.xl, gap: S.space['2xl']}}>
          <View style={{gap: S.space.sm}}>
            <Text
              className="text-neutral-900 font-bold"
              style={{fontSize: S.fs.xxl}}>
              New password,
            </Text>
            <Text className="text-neutral-500" style={{fontSize: S.fs.md}}>
              Create a new password and confirm it below
            </Text>
          </View>

          <View style={{gap: S.space.md}}>
            <View
              className="flex-row items-center rounded-full bg-neutral-50"
              style={{paddingHorizontal: S.space.lg, height: S.size.avatarLg}}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={S.icon.md}
                color="#8e8e8e"
              />
              <TextInput
                className="flex-1 text-neutral-900"
                style={{fontSize: S.fs.md, marginLeft: S.space.sm}}
                placeholder="New password"
                placeholderTextColor="#8e8e8e"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View
              className="flex-row items-center rounded-full bg-neutral-50"
              style={{paddingHorizontal: S.space.lg, height: S.size.avatarLg}}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={S.icon.md}
                color="#8e8e8e"
              />
              <TextInput
                className="flex-1 text-neutral-900"
                style={{fontSize: S.fs.md, marginLeft: S.space.sm}}
                placeholder="Confirm new password"
                placeholderTextColor="#8e8e8e"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity
              className="items-center rounded-full bg-primary-600"
              style={{padding: S.space.lg}}
              onPress={handleReset}>
              <Text
                className="text-white font-bold"
                style={{fontSize: S.fs.md_h}}>
                Confirm New Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
