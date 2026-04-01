import React, {useEffect, useRef} from 'react';
import {Animated, View, useColorScheme} from 'react-native';
import {getThemeColors} from '../theme';

export const Skeleton = ({style}) => {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const translateX = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: 200,
        duration: 1200,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [translateX]);

  return (
    <View
      className="overflow-hidden"
      style={[{backgroundColor: colors.neutral[100]}, style]}>
      <Animated.View
        style={{
          width: '40%',
          height: '100%',
          backgroundColor:
            colorScheme === 'dark'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(255,255,255,0.4)',
          transform: [{translateX}],
        }}
      />
    </View>
  );
};
