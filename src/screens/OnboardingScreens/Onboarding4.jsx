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
import image from '../../assets/Onboarding/onboarding4.png';

const backgroundImage = image;

export default function Onboarding4({ navigation }) {
  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={[styles.imageBackground, { paddingBottom: S.space.lg }]}
      >
        <View style={styles.overlay} />

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
            Let's Join with Us
          </Text>

          <Text
            className="text-neutral-200 text-center"
            style={{
              fontSize: S.fs.sm,
              lineHeight: S.fs.sm * 1.5,
              paddingHorizontal: S.space.lg,
            }}
          >
            Find and book Beauty, Salon, Barber and Spa services anywhere,
            anytime
          </Text>

          <TouchableOpacity
            className="bg-info-600 items-center justify-center w-full"
            style={[
              styles.button,
              { paddingVertical: S.space.lg, borderRadius: S.radius.xl },
            ]}
            onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: S.fs.md }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center w-full"
            style={[
              styles.button,
              {
                paddingVertical: S.space.lg,
                borderRadius: S.radius.xl,
                borderWidth: 2.5,
                borderColor: '#156778',
                backgroundColor: '#0789a3',
              },
            ]}
            onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: S.fs.md }}
            >
              Continue Without Register
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
  contentContainer: {
    alignItems: 'center',
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
