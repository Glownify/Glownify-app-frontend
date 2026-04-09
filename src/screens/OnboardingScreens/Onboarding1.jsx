import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';
import image from '../../assets/Onboarding/onboarding1.png';

const backgroundImage = image;

export default function Onboarding1({ navigation }) {
  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={[styles.imageBackground, { paddingBottom: S.space.lg }]}
      >
        <View style={styles.overlay} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding4')}
          style={[
            styles.skipBtn,
            { marginBottom: S.space['5xl'], marginLeft: S.space['6xl'] },
          ]}
        >
          <Text className="text-white">SKIP&gt;&gt;</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.contentContainer,
            {
              paddingHorizontal: S.space.gutter,
              paddingBottom: S.space.lg,
              gap: S.space.lg,
            },
          ]}
        >
          <Text
            className="text-white text-center font-bold"
            style={{ fontSize: S.fs.xxl }}
          >
            Best Stylist For You
          </Text>

          <Text
            className="text-neutral-200 text-center"
            style={{ fontSize: S.fs.sm, lineHeight: S.fs.sm * 1.5 }}
          >
            Styling your appearance according to your lifestyle
          </Text>

          <View
            className="flex-row justify-center"
            style={{ gap: moderateScale(10) }}
          >
            <TouchableOpacity
              style={[
                styles.dot,
                {
                  width: moderateScale(20),
                  height: moderateScale(8),
                  backgroundColor: '#FFA500',
                  borderRadius: S.radius.full,
                },
              ]}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Onboarding2')}
              style={[
                styles.dot,
                {
                  width: moderateScale(8),
                  height: moderateScale(8),
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: S.radius.full,
                },
              ]}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Onboarding3')}
              style={[
                styles.dot,
                {
                  width: moderateScale(8),
                  height: moderateScale(8),
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: S.radius.full,
                },
              ]}
            />
          </View>

          <TouchableOpacity
            className="bg-info-600 items-center justify-center w-full"
            style={[
              styles.button,
              { paddingVertical: S.space.lg, borderRadius: S.radius.xl },
            ]}
            onPress={() => navigation.navigate('Onboarding2')}
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: S.fs.md }}
            >
              Next
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
          >
            <Text
              className="text-neutral-200 text-center"
              style={{ fontSize: S.fs.sm }}
            >
              Already have an account?{' '}
              <Text className="text-warning-500 font-bold">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  skipBtn: {
    zIndex: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  dot: {
    marginHorizontal: 0,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
