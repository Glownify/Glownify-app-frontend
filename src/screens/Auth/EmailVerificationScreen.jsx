import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

const OTP_LENGTH = 4; // Define the length of the OTP

export default function EmailVerificationScreen() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(159); // 2 minutes and 39 seconds = 159 seconds
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the hidden input when the component mounts
    inputRef.current?.focus();

    // Start the countdown timer
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text) => {
    // Allow only numeric input and limit to OTP_LENGTH
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= OTP_LENGTH) {
      setOtp(numericText);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    setTimer(159); // Reset timer
    setOtp(''); // Clear OTP
    inputRef.current?.focus();
  };

  const renderOtpBoxes = () => {
    const boxes = [];
    for (let i = 0; i < OTP_LENGTH; i++) {
      const digit = otp[i] || '';
      const isFocused = i === otp.length;

      boxes.push(
        <View key={i} style={[styles.otpBox, isFocused && styles.focusedOtpBox]}>
          <Text style={styles.otpText}>{digit}</Text>
        </View>
      );
    }
    return boxes;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <TouchableOpacity style={styles.touchableContainer} activeOpacity={1} onPress={() => inputRef.current?.focus()}>
            <View style={styles.content}>
              {/* ## Header Text ## */}
              <Text style={styles.title}>Email verification,</Text>
              <Text style={styles.subtitle}>
                Please type OTP code that we give you
              </Text>

              {/* ## OTP Input Boxes ## */}
              <View style={styles.otpContainer}>
                {renderOtpBoxes()}
              </View>

              {/* ## Hidden TextInput for keyboard ## */}
              <TextInput
                  ref={inputRef}
                  style={styles.hiddenInput}
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={handleOtpChange}
                  maxLength={OTP_LENGTH}
                  caretHidden // Hides the cursor
              />


              {/* ## Resend Timer ## */}
              <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                <Text style={[styles.resendText, timer > 0 && styles.disabledResend]}>
                    Resend on {formatTime(timer)}
                </Text>
              </TouchableOpacity>
              
              {/* ## Verify Button ## */}
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => console.log(`Verifying OTP: ${otp}`)}>
                <Text style={styles.buttonText}>Verify Email</Text>
              </TouchableOpacity>
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ## Stylesheet ##
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  touchableContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  subtitle: {
    fontSize: 16,
    color: '#616161',
    marginBottom: 40,
    alignSelf: 'flex-start'
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otpBox: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7F8',
  },
  focusedOtpBox: {
    borderColor: '#156778', // Highlight color
    borderWidth: 2,
  },
  otpText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#212121',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  resendText: {
    color: '#156778',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 40,
  },
  disabledResend: {
    color: '#9e9e9e',
  },
  button: {
    backgroundColor: '#156778',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});