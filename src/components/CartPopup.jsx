import React, {useEffect, useRef} from 'react';
import {Animated, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hideCartPopup} from '../redux/slices/cartSlice';
import {S, getThemeColors} from '../theme';
import {moderateScale, wp} from '../utils/responsive';

const BADGE_SIZE = moderateScale(28);
const ICON_WRAPPER_SIZE = moderateScale(40);

export default function CartPopup() {
  const {items, visible, isCartScreenFocused} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  const slideAnim = useRef(new Animated.Value(100)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;

  const totalServices = items.reduce(
    (sum, item) => sum + (item.services?.length ?? 0),
    0,
  );

  const shouldShow = totalServices > 0 && !isCartScreenFocused;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: shouldShow ? 0 : 100,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [shouldShow, slideAnim]);

  useEffect(() => {
    if (visible && totalServices > 0) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();

      badgeScale.setValue(0);
      Animated.spring(badgeScale, {
        toValue: 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        dispatch(hideCartPopup());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [badgeScale, dispatch, pulseAnim, totalServices, visible]);

  if (totalServices === 0 || isCartScreenFocused) {
    return null;
  }

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: moderateScale(96),
        zIndex: 1000,
        alignItems: 'center',
        transform: [{translateY: slideAnim}],
      }}>
      <TouchableOpacity
        className="bg-info-700"
        style={{
          width: wp(52),
          minWidth: moderateScale(210),
          maxWidth: moderateScale(260),
          borderRadius: S.radius.xl,
          shadowColor: colors.black,
          shadowOffset: {width: 0, height: 6},
          shadowOpacity: 0.28,
          shadowRadius: moderateScale(10),
          elevation: 10,
        }}
        onPress={() => {
          dispatch(hideCartPopup());
          navigation.navigate('CartStack');
        }}
        activeOpacity={0.88}>
        <Animated.View
          className="absolute items-center justify-center rounded-full border-2 border-white bg-error-500"
          style={{
            top: -S.space.sm,
            right: -S.space.sm,
            minWidth: BADGE_SIZE,
            height: BADGE_SIZE,
            paddingHorizontal: S.space.sm,
            zIndex: 1,
            transform: [{scale: visible ? badgeScale : 1}],
          }}>
          <Text
            className="text-white"
            style={{fontSize: S.fs.sm, fontWeight: '700'}}>
            {totalServices}
          </Text>
        </Animated.View>

        <Animated.View
          className="flex-row items-center"
          style={{
            padding: S.space.md,
            gap: S.space.md,
            transform: [{scale: pulseAnim}],
          }}>
          <View
            className="items-center justify-center rounded-full bg-white/15"
            style={{width: ICON_WRAPPER_SIZE, height: ICON_WRAPPER_SIZE}}>
            <Ionicons name="bag-handle-outline" size={S.icon.md} color={colors.white} />
          </View>

          <View className="flex-1" style={{gap: S.space.xs / 2}}>
            <Text
              className="text-white"
              style={{fontSize: S.fs.md, fontWeight: '700'}}>
              {visible ? 'Added to Cart' : 'View Cart'}
            </Text>
            <Text
              className="text-white/75"
              style={{fontSize: S.fs.xs, fontWeight: '500'}}>
              {totalServices} {totalServices === 1 ? 'service' : 'services'}
            </Text>
          </View>

          <Ionicons
            name="arrow-forward"
            size={S.icon.md}
            color={colors.warning[400]}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}
