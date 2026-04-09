import React, {useState, useRef, useEffect} from 'react';
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
import { verifyOTP, forgotPassword } from '../../redux/slices/authSlice';
import {S} from '../../theme';

const OTP_LENGTH = 4;

export default function EmailVerificationScreen({ navigation, route }) {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = text => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= OTP_LENGTH) setOtp(numericText);
  };

  const handleVerify = async () => {
    try {
      await dispatch(verifyOTP({ email, otp })).unwrap();
      navigation.navigate('ResetPassword', { email });
    } catch (err) {
      alert(err);
    }
  };

  const handleResend = () => {
    setOtp('');
    setTimer(159);
    inputRef.current?.focus();
    dispatch(forgotPassword({ email }));
  };

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

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
              Email verification,
            </Text>
            <Text className="text-neutral-500" style={{fontSize: S.fs.md}}>
              Please type OTP code that we sent to your email
            </Text>
          </View>

          {/* OTP Boxes */}
          <View style={{gap: S.space.lg}}>
            <View
              className="flex-row"
              style={{justifyContent: 'space-between', width: '100%'}}>
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <TouchableOpacity
                key={i}
                className="items-center justify-center rounded-xl bg-neutral-50"
                style={{
                  width: S.size.avatarLg + S.space.sm,
                  height: S.size.avatarLg + S.space.sm,
                  borderWidth: i === otp.length ? 2 : 1,
                  borderColor: i === otp.length ? '#7c3aed' : '#e0e0e0',
                }}
                activeOpacity={0.8}
                onPress={() => {
                  // Android fix: blur then focus to reopen keyboard
                  inputRef.current?.blur();
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 50);
                }}
              >
                <Text
                  className="text-neutral-900 font-semibold"
                  style={{fontSize: S.fs.xl}}>
                  {otp[i] || ''}
                </Text>
              </TouchableOpacity>
            ))}
            </View>

          {/* Hidden Input for Android */}
          <TextInput
            ref={inputRef}
            style={{width: 1, height: 1, opacity: 1, position: 'absolute'}}
            keyboardType="number-pad"
            value={otp}
            onChangeText={handleOtpChange}
            maxLength={OTP_LENGTH}
            autoFocus={true}
          />

          {/* Resend */}
          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Text
              className="font-semibold"
              style={{
                color: timer > 0 ? '#a1a1aa' : '#7c3aed',
                fontSize: S.fs.sm,
                textAlign: 'center',
              }}>
              Resend in {formatTime(timer)}
            </Text>
          </TouchableOpacity>

          {/* Verify Button */}
            <TouchableOpacity
              className="items-center rounded-full bg-primary-600"
              style={{padding: S.space.lg}}
              onPress={handleVerify}>
              <Text
                className="text-white font-bold"
                style={{fontSize: S.fs.md_h}}>
                Verify Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
