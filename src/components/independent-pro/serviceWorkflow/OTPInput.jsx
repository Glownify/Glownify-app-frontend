import React, {useMemo, useRef} from 'react';
import {TextInput, View, useColorScheme} from 'react-native';

import {S, getThemeColors} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

const OTP_LENGTH = 4;

export default function OTPInput({
  value,
  onChange,
  disabled = false,
  hasError = false,
}) {
  const refs = useRef([]);
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const digits = useMemo(
    () => Array.from({length: OTP_LENGTH}, (_, index) => value[index] ?? ''),
    [value],
  );

  const focusField = index => {
    refs.current[index]?.focus();
  };

  const updateValue = nextDigits => {
    onChange(nextDigits.join('').replace(/\D/g, '').slice(0, OTP_LENGTH));
  };

  const handleChangeText = (text, index) => {
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

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      focusField(index - 1);
    }
  };

  return (
    <View className="flex-row items-center" style={{gap: S.space.sm}}>
      {digits.map((digit, index) => {
        const stateClassName = hasError
          ? 'border-error-500'
          : digit
          ? 'border-primary-600 bg-surface'
          : 'border-neutral-200 bg-neutral-50';

        return (
          <TextInput
            key={`otp-${index}`}
            ref={input => {
              refs.current[index] = input;
            }}
            value={digit}
            editable={!disabled}
            className={`flex-1 rounded-2xl border text-neutral-900 ${stateClassName}`}
            style={{
              height: moderateScale(60),
              fontSize: S.fs.xl,
              fontWeight: '700',
            }}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            onChangeText={text => handleChangeText(text, index)}
            onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, index)}
            selectionColor={colors.primary[600]}
          />
        );
      })}
    </View>
  );
}