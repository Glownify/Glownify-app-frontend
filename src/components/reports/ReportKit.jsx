import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const REPORT_COLORS = {
  bg: '#fff1f2',
  card: '#ffffff',
  accent: '#e11d48',
  accentSoft: '#fda4af',
  accentMuted: '#fb7185',
  border: '#fce7f3',
  text: '#1f2937',
  textMuted: '#9ca3af',
  success: '#16a34a',
  danger: '#dc2626',
};

export const formatCurrency = value => {
  const numeric = Number(value) || 0;

  if (numeric >= 100000) {
    return `₹${(numeric / 100000).toFixed(1)}L`;
  }

  if (numeric >= 1000) {
    return `₹${(numeric / 1000).toFixed(1)}k`;
  }

  return `₹${numeric}`;
};

export const formatCount = value => {
  const numeric = Number(value) || 0;
  return numeric >= 1000 ? `${(numeric / 1000).toFixed(1)}k` : `${numeric}`;
};

export function ReportSectionHeading({ icon, title }) {
  return (
    <View className="flex-row items-center gap-2 mb-3 px-4">
      <View className="w-7 h-7 rounded-full bg-rose-100 items-center justify-center">
        <Icon name={icon} size={14} color={REPORT_COLORS.accent} />
      </View>
      <Text className="text-base font-bold text-neutral-800">{title}</Text>
    </View>
  );
}

export function ReportCard({ children, className = '' }) {
  return (
    <View
      className={`bg-white rounded-2xl mx-4 p-4 mb-4 ${className}`}
      style={{
        shadowColor: '#f9a8b8',
        shadowOpacity: 0.13,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      {children}
    </View>
  );
}

export function ReportStatCard({ icon, label, value, diff = 0, accent }) {
  const isPositive = diff >= 0;

  return (
    <View
      className="bg-white rounded-2xl p-4 flex-1"
      style={{
        shadowColor: '#f9a8b8',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: `${accent}22` }}
      >
        <Icon name={icon} size={17} color={accent} />
      </View>
      <Text className="text-2xl font-extrabold text-neutral-800">{value}</Text>
      <Text className="text-xs text-neutral-400 font-medium mt-0.5">{label}</Text>

      <View className="flex-row items-center gap-1 mt-2">
        <Icon
          name={isPositive ? 'trending-up-outline' : 'trending-down-outline'}
          size={13}
          color={isPositive ? REPORT_COLORS.success : REPORT_COLORS.danger}
        />
        <Text
          className={`text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}
        >
          {isPositive ? '+' : ''}
          {diff}%
        </Text>
        <Text className="text-xs text-neutral-300">vs last</Text>
      </View>
    </View>
  );
}

export function ReportPeriodToggle({ options, value, onChange }) {
  return (
    <View className="flex-row bg-white rounded-xl border border-neutral-100 p-0.5 mx-4 mb-4">
      {options.map(option => {
        const active = value === option;

        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            className={`flex-1 py-2 rounded-lg items-center ${active ? 'bg-rose-500' : ''}`}
            activeOpacity={0.8}
          >
            <Text
              className={`text-sm font-semibold capitalize ${active ? 'text-white' : 'text-neutral-400'}`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function ReportStateCard({
  icon,
  title,
  message,
  loading,
  actionLabel,
  onAction,
}) {
  return (
    <ReportCard>
      <View className="items-center py-8">
        <View className="w-16 h-16 rounded-full bg-rose-100 items-center justify-center mb-4">
          {loading ? (
            <ActivityIndicator color={REPORT_COLORS.accent} />
          ) : (
            <Icon name={icon} size={28} color={REPORT_COLORS.accentMuted} />
          )}
        </View>
        <Text className="text-base font-bold text-neutral-800 text-center">{title}</Text>
        <Text className="text-sm text-neutral-400 text-center mt-1 leading-5">
          {message}
        </Text>
        {actionLabel && onAction ? (
          <TouchableOpacity
            onPress={onAction}
            className="mt-4 bg-rose-500 rounded-full px-4 py-2"
            activeOpacity={0.85}
          >
            <Text className="text-white font-bold text-sm">{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ReportCard>
  );
}
