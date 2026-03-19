import React, { useMemo, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {
  workflowColors,
  workflowRadius,
  workflowSpacing,
} from './theme';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

const OTP_LENGTH = 4;

export default function OTPInput({
  value,
  onChange,
  disabled = false,
  hasError = false,
}: OTPInputProps) {
  const refs = useRef<Array<any>>([]);
  const digits = useMemo(
    () => Array.from({ length: OTP_LENGTH }, (_, index) => value[index] ?? ''),
    [value],
  );

  const focusField = (index: number) => {
    refs.current[index]?.focus();
  };

  const updateValue = (nextDigits: string[]) => {
    onChange(nextDigits.join('').replace(/\D/g, '').slice(0, OTP_LENGTH));
  };

  const handleChangeText = (text: string, index: number) => {
    const sanitized = text.replace(/\D/g, '');

    if (!sanitized) {
      const nextDigits = [...digits];
      nextDigits[index] = '';
      updateValue(nextDigits);
      return;
    }

    if (sanitized.length > 1) {
      const nextDigits = [...digits];

      sanitized
        .slice(0, OTP_LENGTH)
        .split('')
        .forEach((digit, offset) => {
          if (index + offset < OTP_LENGTH) {
            nextDigits[index + offset] = digit;
          }
        });

      updateValue(nextDigits);
      focusField(Math.min(index + sanitized.length, OTP_LENGTH - 1));
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = sanitized;
    updateValue(nextDigits);

    if (index < OTP_LENGTH - 1) {
      focusField(index + 1);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      focusField(index - 1);
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => (
        <TextInput
          key={`otp-${index}`}
          ref={input => {
            refs.current[index] = input;
          }}
          value={digit}
          editable={!disabled}
          style={[
            styles.input,
            hasError && styles.inputError,
            digit && styles.inputFilled,
          ]}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          selectionColor={workflowColors.primaryStart}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: workflowSpacing.sm,
  },
  input: {
    flex: 1,
    height: 60,
    borderRadius: workflowRadius.sm,
    backgroundColor: workflowColors.background,
    borderWidth: 1,
    borderColor: workflowColors.border,
    color: workflowColors.text,
    fontSize: 24,
    fontWeight: '600',
  },
  inputFilled: {
    borderColor: workflowColors.primaryStart,
    backgroundColor: workflowColors.white,
  },
  inputError: {
    borderColor: workflowColors.error,
  },
});

