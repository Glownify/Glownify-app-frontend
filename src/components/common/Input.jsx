import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

/**
 * AppInput - Reusable input component
 *
 * @param {string}        value            - Controlled input value
 * @param {function}      onChangeText     - Value change handler
 * @param {string}        placeholder      - Placeholder text
 * @param {string}        placeholderTextColor - Placeholder color (default: '#999')
 * @param {string}        leftIcon         - Feather icon name for the left icon (e.g. 'mail', 'lock')
 * @param {number}        iconSize         - Icon size (default: 20)
 * @param {string}        iconColor        - Icon color (default: '#888')
 * @param {boolean}       secureTextEntry  - Hide text (for passwords). Adds eye toggle automatically.
 * @param {string}        keyboardType     - React Native keyboardType prop
 * @param {string}        autoCapitalize   - React Native autoCapitalize prop
 * @param {string}        label            - Optional label rendered above the input
 * @param {string}        error            - Optional error message rendered below the input
 * @param {boolean}       disabled         - Disable the input
 * @param {React.ReactNode} rightElement   - Custom element rendered on the right (overrides eye toggle)
 * @param {string}        className        - Additional NativeWind className for the container
 * @param {object}        inputStyle       - Inline style for the TextInput
 * @param {object}        containerStyle   - Inline style for the outer wrapper View
 * @param {object}        rest             - Any other TextInput props
 */
export default function AppInput({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = '#999',
  leftIcon,
  iconSize = 20,
  iconColor = '#888',
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

  // When secureTextEntry is true, we manage visibility internally
  const isSecure = secureTextEntry && !isPasswordVisible;

  // Determine border color: error = red, normal = #F0F3F6
  const borderColor = error ? '#EF4444' : '#F0F3F6';

  return (
    <View style={containerStyle} className={`mb-4 ${className}`}>
      {/* Optional label */}
      {label ? (
        <Text className="text-neutral-700 font-semibold text-sm mb-1.5 ml-1">
          {label}
        </Text>
      ) : null}

      {/* Input row */}
      <View
        style={{ borderColor, backgroundColor: '#F0F3F6' }}
        className="flex-row items-center border rounded-full px-4"
      >
        {/* Left icon */}
        {leftIcon ? (
          <Feather
            name={leftIcon}
            size={iconSize}
            color={iconColor}
            style={{ marginRight: 10 }}
          />
        ) : null}

        {/* Text input */}
        <TextInput
          style={[{ flex: 1, paddingVertical: 16, fontSize: 16, color: '#1a1a1a' }, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          {...rest}
        />

        {/* Right: custom element OR password eye toggle */}
        {rightElement ? (
          rightElement
        ) : secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={iconSize}
              color={iconColor}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Optional error message */}
      {error ? (
        <Text className="text-red-500 text-xs mt-1 ml-2">{error}</Text>
      ) : null}
    </View>
  );
}