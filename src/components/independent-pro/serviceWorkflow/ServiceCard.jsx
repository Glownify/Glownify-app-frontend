import React from 'react';
import {Image, Text, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {S, getThemeColors} from '../../../theme';
import {moderateScale} from '../../../utils/responsive';

const AVATAR_SIZE = moderateScale(56);
const DETAIL_ICON_SIZE = moderateScale(34);

const getInitials = name =>
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
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <View
      className="rounded-3xl border border-neutral-100 bg-surface"
      style={[
        {
          padding: S.space.lg,
          borderRadius: S.radius.xl,
          gap: S.space.lg,
          shadowColor: colors.black,
          shadowOffset: {width: 0, height: moderateScale(10)},
          shadowOpacity: 0.08,
          shadowRadius: moderateScale(20),
          elevation: 5,
        },
        style,
      ]}>
      <View className="flex-row items-center" style={{gap: S.space.md}}>
        <View
          className="items-center justify-center overflow-hidden rounded-full bg-primary-50"
          style={{width: AVATAR_SIZE, height: AVATAR_SIZE}}>
          {service.avatarUrl ? (
            <Image
              source={{uri: service.avatarUrl}}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <Text
              className="text-primary-600"
              style={{fontSize: S.fs.md, fontWeight: '700'}}>
              {getInitials(service.customerName)}
            </Text>
          )}
        </View>

        <View className="flex-1" style={{gap: S.space.xs / 2}}>
          <Text
            className="text-neutral-900"
            style={{fontSize: S.fs.lg, fontWeight: '700'}}>
            {service.customerName}
          </Text>
          <Text
            className="text-neutral-600"
            style={{fontSize: S.fs.sm, fontWeight: '500'}}>
            {service.serviceName}
          </Text>
          <View
            className="self-start rounded-full bg-primary-50"
            style={{
              paddingHorizontal: S.space.sm,
              paddingVertical: S.space.xs,
            }}>
            <Text
              className="text-primary-600"
              style={{fontSize: S.fs.xxs, fontWeight: '700'}}>
              {service.serviceCode}
            </Text>
          </View>
        </View>

        {headerAdornment}
      </View>

      <View className="h-px bg-neutral-100" />

      <View style={{gap: S.space.sm}}>
        {details.map(detail => (
          <View
            key={`${detail.label}-${detail.value}`}
            className="flex-row items-start"
            style={{gap: S.space.sm}}>
            <View
              className="items-center justify-center rounded-full bg-primary-50"
              style={{width: DETAIL_ICON_SIZE, height: DETAIL_ICON_SIZE}}>
              <Icon
                name={detail.icon}
                size={S.icon.sm}
                color={colors.primary[600]}
              />
            </View>
            <View className="flex-1" style={{gap: S.space.xs / 2}}>
              <Text
                className="text-neutral-500"
                style={{fontSize: S.fs.xs, fontWeight: '500'}}>
                {detail.label}
              </Text>
              <Text
                className="text-neutral-900"
                style={{
                  fontSize: S.fs.sm,
                  fontWeight: '600',
                  lineHeight: S.fs.md + 4,
                }}>
                {detail.value}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {footer ? (
        <>
          <View className="h-px bg-neutral-100" />
          {footer}
        </>
      ) : null}
    </View>
  );
}