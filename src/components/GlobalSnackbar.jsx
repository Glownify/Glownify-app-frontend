import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {hideSnackbar} from '../redux/slices/snackbarSlice';
import {S, getThemeColors} from '../theme';
import {moderateScale} from '../utils/responsive';

const TYPE_CONFIG = {
  success: {containerClass: 'bg-success-600', icon: 'check-circle'},
  error: {containerClass: 'bg-error-600', icon: 'error'},
  warning: {containerClass: 'bg-warning-600', icon: 'warning'},
  info: {containerClass: 'bg-info-600', icon: 'info'},
};

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const {open, message, type, duration} = useSelector(state => state.snackbar);
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const translateY = useRef(new Animated.Value(120)).current;
  const timeoutRef = useRef(null);
  const [isRendered, setIsRendered] = useState(open);

  const hideWithAnimation = useCallback(
    (shouldDispatch = true) => {
      Animated.timing(translateY, {
        toValue: 120,
        duration: 260,
        useNativeDriver: true,
      }).start(() => {
        setIsRendered(false);
        if (shouldDispatch) {
          dispatch(hideSnackbar());
        }
      });
    },
    [dispatch, translateY],
  );

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (open) {
      setIsRendered(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 48,
        friction: 8,
      }).start();

      timeoutRef.current = setTimeout(() => {
        hideWithAnimation(true);
      }, duration);
    } else if (isRendered) {
      hideWithAnimation(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration, hideWithAnimation, isRendered, open, translateY]);

  if (!isRendered) {
    return null;
  }

  const config = TYPE_CONFIG[type] || TYPE_CONFIG.success;

  return (
    <Animated.View
      className={`absolute left-0 right-0 ${config.containerClass}`}
      style={{
        left: S.space.lg,
        right: S.space.lg,
        bottom: S.space.lg,
        borderRadius: S.radius.lg,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.28,
        shadowRadius: moderateScale(8),
        elevation: 8,
        zIndex: 9999,
        transform: [{translateY}],
      }}>
      <View
        className="flex-row items-center"
        style={{padding: S.space.lg, gap: S.space.md}}>
        <MaterialIcons name={config.icon} size={S.icon.lg} color={colors.white} />

        <Text
          className="flex-1 text-white"
          style={{
            fontSize: S.fs.sm,
            fontWeight: '600',
            lineHeight: S.fs.md + S.space.xs,
          }}
          numberOfLines={2}>
          {message}
        </Text>

        <TouchableOpacity onPress={() => hideWithAnimation(true)} activeOpacity={0.75}>
          <MaterialIcons name="close" size={S.icon.md} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default GlobalSnackbar;
