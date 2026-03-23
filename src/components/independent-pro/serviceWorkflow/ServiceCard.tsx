import React, { type ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { ActiveService } from './types';
import {
  workflowColors,
  workflowRadius,
  workflowShadow,
  workflowSpacing,
} from './theme';

interface DetailItem {
  icon: string;
  label: string;
  value: string;
}

interface ServiceCardProps {
  service: ActiveService;
  details: DetailItem[];
  footer?: ReactNode;
  headerAdornment?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function ServiceCard({
  service,
  details,
  footer,
  headerAdornment,
  style,
}: ServiceCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={styles.avatarWrap}>
          {service.avatarUrl ? (
            <Image source={{ uri: service.avatarUrl }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarFallback}>
              {getInitials(service.customerName)}
            </Text>
          )}
        </View>

        <View style={styles.headerCopy}>
          <Text style={styles.customerName}>{service.customerName}</Text>
          <Text style={styles.serviceName}>{service.serviceName}</Text>
          <View style={styles.codePill}>
            <Text style={styles.codeText}>{service.serviceCode}</Text>
          </View>
        </View>

        {headerAdornment}
      </View>

      <View style={styles.divider} />

      <View style={styles.detailList}>
        {details.map(detail => (
          <View key={`${detail.label}-${detail.value}`} style={styles.detailRow}>
            <View style={styles.iconWrap}>
              <Icon name={detail.icon} size={16} color={workflowColors.primaryStart} />
            </View>
            <View style={styles.detailCopy}>
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {footer ? (
        <>
          <View style={styles.divider} />
          {footer}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: workflowColors.card,
    borderRadius: workflowRadius.md,
    padding: workflowSpacing.md,
    ...workflowShadow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: workflowColors.gradientSoft,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    color: workflowColors.primaryStart,
    fontSize: 18,
    fontWeight: '600',
  },
  headerCopy: {
    flex: 1,
    marginLeft: workflowSpacing.sm,
    marginRight: workflowSpacing.sm,
  },
  customerName: {
    color: workflowColors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  serviceName: {
    color: workflowColors.subtitle,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 2,
  },
  codePill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    borderRadius: workflowRadius.pill,
    backgroundColor: workflowColors.gradientSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  codeText: {
    color: workflowColors.primaryStart,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: workflowColors.border,
    marginVertical: workflowSpacing.md,
  },
  detailList: {
    gap: workflowSpacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: workflowColors.gradientSoft,
    marginRight: workflowSpacing.sm,
  },
  detailCopy: {
    flex: 1,
  },
  detailLabel: {
    color: workflowColors.muted,
    fontSize: 12,
    fontWeight: '400',
  },
  detailValue: {
    color: workflowColors.text,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 2,
  },
});



