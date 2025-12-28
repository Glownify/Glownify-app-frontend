import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
    Image,
} from 'react-native'

const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  background: '#FFFFFF',
  textSecondary: '#6B7280',
};

const ITEM_WIDTH = 94 // width + marginRight

export default function CategoriesMarquee({ categories }) {
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollRef = useRef(null)
  
  const CategoryIcon = ({ uri }) => {
  const isSvg = uri?.endsWith('.svg');
  if (isSvg) return <SvgUri width={32} height={32} uri={uri} />;
  return (
    <Image
      source={{ uri }}
      style={{ width: 32, height: 32, resizeMode: 'contain' }}
    />
  );
};

  // duplicate list for infinite loop
  const data = [...categories, ...categories]

  useEffect(() => {
    const totalWidth = categories.length * ITEM_WIDTH

    Animated.loop(
      Animated.timing(scrollX, {
        toValue: totalWidth,
        duration: categories.length * 2000, // ⭐ slow speed
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()

    scrollX.addListener(({ value }) => {
      scrollRef.current?.scrollTo({ x: value, animated: false })
    })

    return () => scrollX.removeAllListeners()
  }, [categories])

  return (
    <Animated.ScrollView
      ref={scrollRef}
      horizontal
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 8 }}
    >
      <View style={styles.categories}>
        {data.map((cat, index) => (
          <TouchableOpacity
            key={`${cat._id}-${index}`}
            style={styles.categoryItem}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIcon}>
              <CategoryIcon uri={cat.icon} />
            </View>
            <Text style={styles.categoryLabel} numberOfLines={1}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
categories: {
  flexDirection: 'row',
  paddingHorizontal: 16,
  alignItems: 'center',
},

categoryItem: {
  alignItems: 'center',
  width: 80,        // fixed width works best for marquee
  marginRight: 14,  // space between items
},

categoryIcon: {
  backgroundColor: colors.primaryLight,
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 6,
},

categoryLabel: {
  fontSize: 12,
  color: colors.primary,
  fontWeight: '500',
  textAlign: 'center',
},
})
