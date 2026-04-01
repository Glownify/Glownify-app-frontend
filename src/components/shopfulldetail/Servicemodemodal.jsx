import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

function Option({
  mode,
  icon,
  label,
  description,
  selectedMode,
  onSelectMode,
  colors,
}) {
  const isSelected = selectedMode === mode;
  const iconWrapperSize = S.icon.lg + S.space.md;
  const checkSize = S.icon.sm + S.space.xs;

  return (
    <TouchableOpacity
      className={`flex-row items-center rounded-2xl border-2 ${
        isSelected
          ? 'border-primary-600 bg-primary-50'
          : 'border-neutral-100 bg-base'
      }`}
      style={{padding: S.space.lg, gap: S.space.md}}
      onPress={() => onSelectMode(mode)}
      activeOpacity={0.8}>
      <View
        className={`items-center justify-center rounded-2xl ${
          isSelected ? 'bg-primary-600' : 'bg-neutral-100'
        }`}
        style={{width: iconWrapperSize, height: iconWrapperSize}}>
        <Icon
          name={icon}
          size={S.icon.sm}
          color={isSelected ? colors.white : colors.neutral[400]}
        />
      </View>

      <View className="flex-1" style={{gap: S.space.xs / 2}}>
        <Text
          className={isSelected ? 'text-primary-600' : 'text-neutral-700'}
          style={{fontSize: S.fs.sm, fontWeight: '700'}}>
          {label}
        </Text>
        <Text className="text-neutral-400" style={{fontSize: S.fs.xs}}>
          {description}
        </Text>
      </View>

      {isSelected ? (
        <View
          className="items-center justify-center rounded-full bg-primary-600"
          style={{width: checkSize, height: checkSize}}>
          <Icon name="checkmark" size={S.icon.xs} color={colors.white} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default function ServiceModeModal({
  visible,
  selectedMode,
  onSelectMode,
  onConfirm,
  onDismiss,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View className="flex-1 justify-end bg-overlay">
          <TouchableWithoutFeedback>
            <View
              className="rounded-t-3xl border-t border-neutral-100 bg-surface shadow-lg"
              style={{padding: S.space.lg, gap: S.space.lg}}>
              <View className="items-center">
                <View
                  className="rounded-full bg-neutral-200"
                  style={{width: S.space['2xl'], height: 4}}
                />
              </View>

              <View className="flex-row items-center justify-between">
                <Text
                  className="text-neutral-900"
                  style={{fontSize: S.fs.lg, fontWeight: '700'}}>
                  Choose Service Mode
                </Text>
                <TouchableOpacity
                  className="items-center justify-center rounded-full bg-neutral-100"
                  style={{width: S.icon.lg + S.space.sm, height: S.icon.lg + S.space.sm}}
                  onPress={onDismiss}
                  activeOpacity={0.75}>
                  <Icon name="close" size={S.icon.sm} color={colors.neutral[600]} />
                </TouchableOpacity>
              </View>

              <View style={{gap: S.space.md}}>
                <Option
                  mode="salon"
                  icon="storefront-outline"
                  label="At Salon"
                  description="Visit the salon for your service"
                  selectedMode={selectedMode}
                  onSelectMode={onSelectMode}
                  colors={colors}
                />
                <Option
                  mode="home"
                  icon="home-outline"
                  label="At Home"
                  description="Professional comes to your doorstep"
                  selectedMode={selectedMode}
                  onSelectMode={onSelectMode}
                  colors={colors}
                />
              </View>

              <TouchableOpacity
                className={selectedMode ? 'bg-primary-600' : 'bg-neutral-200'}
                style={{
                  borderRadius: S.radius.xl,
                  paddingVertical: S.space.lg,
                  alignItems: 'center',
                }}
                disabled={!selectedMode}
                onPress={onConfirm}
                activeOpacity={0.85}>
                <Text
                  className={selectedMode ? 'text-white' : 'text-neutral-400'}
                  style={{fontSize: S.fs.md, fontWeight: '700'}}>
                  {selectedMode ? 'Confirm Selection' : 'Select a Mode'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
