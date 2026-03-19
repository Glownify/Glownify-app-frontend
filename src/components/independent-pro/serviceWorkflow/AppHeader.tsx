import React, { type ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  workflowColors,
  workflowGradient,
  workflowRadius,
  workflowSpacing,
} from './theme';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightContent?: ReactNode;
  showBackButton?: boolean;
}

export default function AppHeader({
  title,
  subtitle,
  onBack,
  rightContent,
  showBackButton = true,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={workflowGradient}
      style={[
        styles.container,
        {
          paddingTop: insets.top + workflowSpacing.sm,
        },
      ]}
    >
      <View style={styles.row}>
        {showBackButton ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onBack}
            style={styles.iconButton}
          >
            <Icon name="chevron-back" size={22} color={workflowColors.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        <View style={styles.rightSlot}>
          {rightContent ?? <View style={styles.placeholder} />}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: workflowSpacing.md,
    paddingBottom: workflowSpacing.lg,
    borderBottomLeftRadius: workflowRadius.xl,
    borderBottomRightRadius: workflowRadius.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  placeholder: {
    width: 42,
    height: 42,
  },
  titleBlock: {
    flex: 1,
    marginHorizontal: workflowSpacing.sm,
  },
  title: {
    color: workflowColors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.86)',
    fontSize: 13,
    fontWeight: '400',
  },
  rightSlot: {
    minWidth: 42,
    alignItems: 'flex-end',
  },
});



