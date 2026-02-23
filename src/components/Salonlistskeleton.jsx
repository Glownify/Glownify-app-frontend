import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55;

function ShimmerBox({ width: w, height: h, borderRadius = 10, style }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: w,
          height: h,
          borderRadius,
          backgroundColor: '#e5e7eb',
          opacity,
        },
        style,
      ]}
    />
  );
}

export default function SalonListSkeleton({ selectedCategory }) {
  return (
    <View style={{ marginBottom: 20 }}>
      {/* Header row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        <ShimmerBox width={80} height={16} borderRadius={8} />
        <ShimmerBox width={50} height={14} borderRadius={8} />
      </View>

      {/* Cards row */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
        {[0, 1].map(i => (
          <View
            key={i}
            style={{
              width: CARD_WIDTH,
              marginRight: 12,
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: '#f9fafb',
            }}
          >
            {/* Image placeholder */}
            <ShimmerBox
              width={CARD_WIDTH}
              height={CARD_WIDTH * 0.85}
              borderRadius={0}
            />
            {/* Text placeholders */}
            <View style={{ padding: 10 }}>
              <ShimmerBox width={CARD_WIDTH * 0.7} height={13} style={{ marginBottom: 6 }} />
              <ShimmerBox width={CARD_WIDTH * 0.5} height={11} style={{ marginBottom: 10 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ShimmerBox width={60} height={11} />
                <ShimmerBox width={70} height={11} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}