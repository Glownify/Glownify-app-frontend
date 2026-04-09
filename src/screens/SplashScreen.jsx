import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import {wp} from '../utils/responsive';
import {S} from '../theme';

const {width} = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation sequence
    Animated.sequence([
      // Logo fade in and scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Text fade in after logo
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      className="flex-1 items-center justify-center bg-primary-700"
      style={{gap: S.space.xl}}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{scale: scaleAnim}],
          width: width * 0.5,
          height: width * 0.5,
        }}>
        <Image
          source={require('../assets/GlownifyLogoPng.png')}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={{opacity: textFadeAnim, alignItems: 'center', gap: S.space.sm}}>
        <Text
          className="text-white font-bold"
          style={{fontSize: S.fs.xxl, letterSpacing: 1}}>
          Glownify
        </Text>
        <Text className="text-white font-medium" style={{fontSize: S.fs.md}}>
          Your Style, Our Passion
        </Text>
      </Animated.View>

      <Animated.View style={{opacity: textFadeAnim}}>
        <View className="flex-row items-center" style={{gap: S.space.sm}}>
          <View
            className="rounded-full bg-warning-500"
            style={{width: wp(2.5), height: wp(2.5)}}
          />
          <View
            className="rounded-full bg-warning-500"
            style={{width: wp(2.5), height: wp(2.5), opacity: 0.6}}
          />
          <View
            className="rounded-full bg-warning-500"
            style={{width: wp(2.5), height: wp(2.5), opacity: 0.3}}
          />
        </View>
      </Animated.View>
    </View>
  );
}
