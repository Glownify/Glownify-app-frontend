import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {S, getThemeColors} from '../../theme';

/**
 * AppInput - Reusable input component
 *
 * @param {string}   value              - Controlled input value
 * @param {function} onChangeText       - Value change handler
 * @param {string}   placeholder        - Placeholder text
 * @param {string}   placeholderTextColor - Placeholder color override
 * @param {string}   leftIcon           - Feather icon name for the left icon
 * @param {number}   iconSize           - Icon size
 * @param {string}   iconColor          - Icon color override
 * @param {boolean}  secureTextEntry    - Hide text and show eye toggle
 * @param {string}   keyboardType       - React Native keyboardType prop
 * @param {string}   autoCapitalize     - React Native autoCapitalize prop
 * @param {string}   label              - Optional label rendered above the input
 * @param {string}   error              - Optional error message rendered below the input
 * @param {boolean}  disabled           - Disable the input
 * @param {React.ReactNode} rightElement - Custom element rendered on the right
 * @param {string}   className          - Additional NativeWind className for the wrapper
 * @param {object}   inputStyle         - Inline style for the TextInput
 * @param {object}   containerStyle     - Inline style for the outer wrapper View
 * @param {object}   rest               - Any other TextInput props
 */
export default function AppInput({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  leftIcon,
  iconSize = S.icon.md,
  iconColor,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = 'none',
  label,
  error,
  disabled = false,
  rightElement,
  className = '',
  inputStyle,
  containerStyle,
  ...rest
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const resolvedPlaceholderTextColor =
    placeholderTextColor ?? colors.neutral[400];
  const resolvedIconColor = iconColor ?? colors.neutral[500];
  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View
      className={className}
      style={[{gap: S.space.sm}, containerStyle]}
    >
      {label ? (
        <Text
          className="text-neutral-700"
          style={{fontSize: S.fs.sm, fontWeight: '600'}}
        >
          {label}
        </Text>
      ) : null}

      <View
        className={[
          'flex-row items-center border bg-neutral-50',
          error ? 'border-error-500' : 'border-neutral-200',
          disabled ? 'opacity-60' : 'opacity-100',
        ].join(' ')}
        style={{
          minHeight: S.space['6xl'],
          paddingHorizontal: S.space.lg,
          borderRadius: S.radius.full,
          gap: S.space.sm,
        }}
      >
        {leftIcon ? (
          <Feather name={leftIcon} size={iconSize} color={resolvedIconColor} />
        ) : null}

        <TextInput
          className="flex-1 text-neutral-900"
          style={[{fontSize: S.fs.md, paddingVertical: 0}, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={resolvedPlaceholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          {...rest}
        />

        {rightElement ? (
          rightElement
        ) : secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(prev => !prev)}
            activeOpacity={0.8}
            className="items-center justify-center"
            style={{width: S.space['5xl'], height: S.space['5xl']}}
            hitSlop={{
              top: S.space.sm,
              bottom: S.space.sm,
              left: S.space.sm,
              right: S.space.sm,
            }}
          >
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={iconSize}
              color={resolvedIconColor}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text
          className="text-error-600"
          style={{fontSize: S.fs.xs, fontWeight: '500'}}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
