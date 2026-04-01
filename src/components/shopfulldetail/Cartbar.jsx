import React, {useEffect, useRef} from 'react';
import {Animated, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

function resolveItemPrice(item, bookingMode) {
  if (item.price != null && !Number.isNaN(item.price)) {
    return item.price;
  }

  const mode = item.chosenMode ?? bookingMode;
  if (mode === 'home' && item.homePrice != null && !Number.isNaN(item.homePrice)) {
    return item.homePrice;
  }
  if (item.salonPrice != null && !Number.isNaN(item.salonPrice)) {
    return item.salonPrice;
  }

  return 0;
}

const formatCurrency = value => `Rs. ${value.toLocaleString('en-IN')}`;

export default function CartBar({cartItems = [], bookingMode, onContinue}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const slideAnim = useRef(new Animated.Value(80)).current;
  const hasItems = cartItems.length > 0;

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + resolveItemPrice(item, bookingMode),
    0,
  );
  const serviceCount = cartItems.filter(item => !item.parentId).length;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 60,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      className="absolute bottom-0 left-0 right-0"
      style={{transform: [{translateY: slideAnim}]}}>
      <View pointerEvents="none" style={{height: S.space.lg}} />

      <View
        className="bg-surface border-t border-neutral-100"
        style={{padding: S.space.lg, paddingBottom: S.space['2xl']}}>
        {hasItems ? (
          <TouchableOpacity
            className="flex-row items-center justify-between bg-primary-600"
            style={{borderRadius: S.radius.xl, padding: S.space.lg}}
            onPress={onContinue}
            activeOpacity={0.88}>
            <View className="flex-row items-center" style={{gap: S.space.sm}}>
              <View
                className="bg-white/20"
                style={{
                  borderRadius: S.radius.md,
                  paddingHorizontal: S.space.sm,
                  paddingVertical: S.space.xs,
                }}>
                <Text
                  className="text-white"
                  style={{fontSize: S.fs.xs, fontWeight: '700'}}>
                  {serviceCount} {serviceCount === 1 ? 'service' : 'services'}
                </Text>
              </View>

              <Text
                className="text-white"
                style={{fontSize: S.fs.md, fontWeight: '600'}}>
                {formatCurrency(cartTotal)}
              </Text>
            </View>

            <View className="flex-row items-center" style={{gap: S.space.xs}}>
              <Text
                className="text-white"
                style={{fontSize: S.fs.md, fontWeight: '700'}}>
                Continue
              </Text>
              <Icon name="arrow-forward" size={S.icon.sm} color={colors.white} />
            </View>
          </TouchableOpacity>
        ) : (
          <View
            className="flex-row items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-base"
            style={{padding: S.space.lg, gap: S.space.sm}}>
            <Icon name="bag-outline" size={S.icon.sm} color={colors.neutral[300]} />
            <Text
              className="text-neutral-400"
              style={{fontSize: S.fs.sm, fontWeight: '600'}}>
              Select a service to continue
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}
