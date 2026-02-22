import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * FieldLabel - Label with optional red asterisk for required fields
 */
export function FieldLabel({ label, required }) {
  return (
    <Text
      style={{
        fontSize: 13,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 6,
      }}
    >
      {label}
      {required && (
        <Text style={{ color: '#E91E63' }}> *</Text>
      )}
    </Text>
  );
}

/**
 * LabeledInput - Text input with label above, white card style with border
 *
 * @param {string}   label            - Label text
 * @param {boolean}  required         - Show red asterisk
 * @param {string}   placeholder      - Placeholder text
 * @param {string}   value            - Controlled value
 * @param {function} onChangeText     - Change handler
 * @param {boolean}  secureTextEntry  - Password mode with eye toggle
 * @param {string}   keyboardType     - RN keyboardType
 * @param {string}   autoCapitalize   - RN autoCapitalize
 * @param {React.ReactNode} rightElement - Custom right element
 * @param {object}   style            - Extra style on wrapper
 * @param {object}   rest             - Any other TextInput props
 */
export function LabeledInput({
  label,
  required,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = 'none',
  rightElement,
  style,
  ...rest
}) {
  const [visible, setVisible] = useState(false);
  const isSecure = secureTextEntry && !visible;

  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label ? <FieldLabel label={label} required={required} /> : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FAFAFA',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 12,
          paddingHorizontal: 14,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            paddingVertical: 14,
            fontSize: 15,
            color: '#1F2937',
          }}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...rest}
        />
        {/* Password eye toggle */}
        {secureTextEntry && !rightElement ? (
          <TouchableOpacity
            onPress={() => setVisible((v) => !v)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#C0C0C0"
            />
          </TouchableOpacity>
        ) : null}
        {/* Custom right element */}
        {rightElement ?? null}
      </View>
    </View>
  );
}