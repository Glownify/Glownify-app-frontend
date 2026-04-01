import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';

const HEADER_ICON_SIZE = S.icon.lg + S.space.md;
const CHEVRON_WRAPPER_SIZE = S.icon.sm + S.space.md;

export default function AboutUsCard({
  aboutText,
  badges = [],
  expanded,
  onToggle,
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-S.space.xs)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();

    if (expanded) {
      fadeAnim.setValue(0);
      slideAnim.setValue(-S.space.xs);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 60,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [expanded, fadeAnim, rotateAnim, slideAnim]);

  const chevronRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View
      className="bg-surface border border-t-2 border-neutral-100 border-t-primary-600 overflow-hidden shadow-sm"
      style={{borderRadius: S.radius.xl, elevation: 2}}>
      <TouchableOpacity
        className="flex-row items-center"
        style={{padding: S.space.lg, gap: S.space.sm}}
        onPress={onToggle}
        activeOpacity={0.75}>
        <View
          className="items-center justify-center bg-primary-50"
          style={{
            width: HEADER_ICON_SIZE,
            height: HEADER_ICON_SIZE,
            borderRadius: S.radius.md,
          }}>
          <Icon
            name="storefront-outline"
            size={S.icon.sm}
            color={colors.primary[600]}
          />
        </View>

        <Text
          className="flex-1 text-neutral-900"
          style={{fontSize: S.fs.sm, fontWeight: '700'}}>
          About Us
        </Text>

        <Animated.View style={{transform: [{rotate: chevronRotate}]}}>
          <View
            className={expanded ? 'bg-primary-50' : 'bg-neutral-100'}
            style={{
              width: CHEVRON_WRAPPER_SIZE,
              height: CHEVRON_WRAPPER_SIZE,
              borderRadius: S.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="chevron-down"
              size={S.icon.sm}
              color={expanded ? colors.primary[600] : colors.neutral[400]}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>

      {expanded ? (
        <>
          <View className="bg-neutral-100" style={{height: 1}} />
          <Animated.View
            style={{
              padding: S.space.lg,
              gap: S.space.md,
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            }}>
            <Text
              className="text-neutral-500"
              style={{fontSize: S.fs.xs, lineHeight: S.fs.md + S.space.xs}}>
              {aboutText}
            </Text>

            {badges.length > 0 ? (
              <View className="flex-row flex-wrap" style={{gap: S.space.sm}}>
                {badges.map((badge, index) => (
                  <View
                    key={`${badge}-${index}`}
                    className="flex-row items-center rounded-full border border-success-100 bg-success-50"
                    style={{
                      paddingHorizontal: S.space.sm + S.space.xs,
                      paddingVertical: S.space.xs,
                      gap: S.space.xs,
                    }}>
                    <Icon
                      name="checkmark-circle"
                      size={S.icon.xs}
                      color={colors.success[600]}
                    />
                    <Text
                      className="text-success-700"
                      style={{fontSize: S.fs.xxs, fontWeight: '600'}}>
                      {badge}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </Animated.View>
        </>
      ) : null}
    </View>
  );
}
