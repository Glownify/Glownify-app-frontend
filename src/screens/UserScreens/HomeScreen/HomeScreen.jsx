import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, StatusBar, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeSalons, getAllCategories } from '../../../redux/slices/userSlice';
import HomeHeader from '../../../components/HomeHeader';
import SectionHeader from '../../../components/SectionHeader';
import SalonCard from './SalonCard';
import NearbyOfferCard from './NearbyOfferCard';

const { width } = Dimensions.get('window');

const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  background: '#FFFFFF',
  textSecondary: '#6B7280',
};

const CategoryIcon = ({ uri }) => {
  const isSvg = uri?.endsWith('.svg');
  if (isSvg) return <SvgUri width={32} height={32} uri={uri} />;
  return <Image source={{ uri }} style={{ width: 32, height: 32, resizeMode: 'contain' }} />;
};

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { loading, homeSalons, categories } = useSelector((state) => state.user);

  console.log('HomeSalons:', homeSalons);

  const [refreshing, setRefreshing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const promoScrollRef = useRef(null);
  const promoImages = [
    require('../../../assets/promos/promo1.png'),
    require('../../../assets/promos/promo2.png'),
    require('../../../assets/promos/promo3.png'),
  ];

  const loadData = async () => {
    try {
      await Promise.all([dispatch(fetchHomeSalons()), dispatch(getAllCategories())]);
    } catch (err) {
      console.log('Error refreshing:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Slide promo banner every 3 seconds
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % promoImages.length;
      setCurrentSlide(nextSlide);
      promoScrollRef.current?.scrollTo({ x: nextSlide * width, animated: true });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const renderSalonSection = (title, data) => {
    if (!data || data.length === 0) return null;

    return (
      <View style={{ marginBottom: 20 }}>
        <SectionHeader
          title={title}
          showViewAll
          onPress={() => navigation.navigate('SalonsListScreen', { type: title })}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {data.map((salon) => (
            <View key={salon._id} style={styles.salonCardWrapper}>
              <SalonCard salon={salon} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <Text>Loading salons...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <HomeHeader user={user} navigation={navigation} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* Promo Banner Slider */}
          <View style={styles.promoContainer}>
            <ScrollView
              ref={promoScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false} // Auto scroll only
            >
              {promoImages.map((img, index) => (
                <Image key={index} source={img} style={styles.promoImage} />
              ))}
            </ScrollView>
          </View>

          {/* Categories */}
          <SectionHeader title="What do you want to get?" />
          <View style={styles.categories}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat._id} style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <CategoryIcon uri={cat.icon} />
                </View>
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* --- Salon Sections --- */}
          {renderSalonSection('Men Salon', homeSalons?.men)}
          {renderSalonSection('Beauty Parlour', homeSalons?.beautyParlour)}
          {renderSalonSection('Unisex', homeSalons?.unisex)}
          {renderSalonSection('Spa', homeSalons?.spa)}

          {/* --- Nearby Offers --- */}
          <SectionHeader title="Nearby Offers" />
          <View style={{ paddingHorizontal: 16 }}>
            <NearbyOfferCard
              imageUrl={require('../../../assets/featuredSalon.png')}
              category="Hair • Facial"
              name="Maroon's Luxury Salon"
              address="Kukatpally, Hyderabad"
              rating="4.8"
              reviews="3.7k"
              discount="15% Off"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.primary },
  promoContainer: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  promoImage: { width: width - 32, height: 180, borderRadius: 12, marginRight: 16 },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  categoryItem: { alignItems: 'center', width: '22%', marginBottom: 16 },
  categoryIcon: {
    backgroundColor: colors.primaryLight,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    textAlign: 'center',
  },
  horizontalScroll: { paddingLeft: 16, paddingVertical: 10 },
  salonCardWrapper: { marginRight: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
