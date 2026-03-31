import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

export function FieldLabel({label, required}) {
  return (
    <Text
      className="text-neutral-700"
      style={{fontSize: S.fs.labelMd, fontWeight: '500'}}
    >
      {label}
      {required ? <Text className="text-primary-600"> *</Text> : null}
    </Text>
  );
}

/**
 * LabeledInput - Text input with label above, white card style with border
 *
 * @param {string}   label            - Label text
 * @param {boolean}  required         - Show required asterisk
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
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const isSecure = secureTextEntry && !visible;

  return (
    <View style={[{gap: S.space.sm}, style]}>
      {label ? <FieldLabel label={label} required={required} /> : null}

      <View
        className="flex-row items-center border border-neutral-200 bg-neutral-50"
        style={{
          minHeight: S.space['6xl'],
          paddingHorizontal: S.space.md,
          borderRadius: S.radius.lg,
          gap: S.space.sm,
        }}
      >
        <TextInput
          className="flex-1 text-neutral-800"
          style={{fontSize: S.fs.sm, paddingVertical: 0}}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral[400]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...rest}
        />

        {secureTextEntry && !rightElement ? (
          <TouchableOpacity
            onPress={() => setVisible(v => !v)}
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
            <Icon
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              size={S.icon.md}
              color={colors.neutral[400]}
            />
          </TouchableOpacity>
        ) : null}

        {rightElement ?? null}
      </View>
    </View>
  );
}
