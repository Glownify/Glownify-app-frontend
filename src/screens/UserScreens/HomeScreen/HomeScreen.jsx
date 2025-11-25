import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, StatusBar, Button, ActivityIndicator, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeSalonsBySalonCategory, getAllCategories } from '../../../redux/slices/userSlice';
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
  const { loading, homeSalonsBySalonCategory, categories } = useSelector((state) => state.user);

  // Use a more robust check for data structure, but keep it minimal
  const salonList = Array.isArray(homeSalonsBySalonCategory?.data?.salons)
    ? homeSalonsBySalonCategory.data.salons
    : Array.isArray(homeSalonsBySalonCategory?.data)
    ? homeSalonsBySalonCategory.data
    : [];


  console.log('HomeScreen Rendered. HomeSalonsBySalonCategory:', homeSalonsBySalonCategory?.data);

  const [refreshing, setRefreshing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('women');
  const promoScrollRef = useRef(null);
  const promoImages = [
    require('../../../assets/promos/promo1.png'),
    require('../../../assets/promos/promo2.png'),
    require('../../../assets/promos/promo3.png'),
  ];

  const handleSelectSalonCategory = (category) => {
   dispatch(fetchHomeSalonsBySalonCategory(category));
   setSelectedCategory(category);
  }

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(fetchHomeSalonsBySalonCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    // Slide promo banner every 2 seconds
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % promoImages.length;
      setCurrentSlide(nextSlide);
      
      // 🚨 SAFETY CHECK: Ensure ref.current is not null before calling scrollTo
      if (promoScrollRef.current) {
         promoScrollRef.current.scrollTo({ x: nextSlide * width, animated: true });
      }
    }, 2000);

    // Clean up the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [currentSlide, promoImages.length]); // Added promoImages.length as a dependency

  const onRefresh = async () => {
    setRefreshing(true);
    // Use Promise.all if these were async thunks, but for dispatching, this is fine
    dispatch(getAllCategories());
    dispatch(fetchHomeSalonsBySalonCategory(selectedCategory));
    // A small delay or a check on Redux state change would make this more accurate,
    // but for simple refreshing, we stop the indicator:
    setRefreshing(false); 
  };

  const renderSalonSection = (title, data) => {
    console.log(`Rendering salon section: ${title}`, data);
    
    // Use the salonList variable or re-calculate listData for safety
    const listData = Array.isArray(data?.salons) ? data.salons : Array.isArray(data) ? data : [];

    if (listData.length === 0) return null;

    return (
      <View style={{ marginBottom: 20 }}>
        <SectionHeader
          title={title}
          showViewAll
          onPress={() => navigation.navigate('SalonsListScreen', { type: title })}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {listData.map((salon) => ( // Use listData here
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
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ marginTop: 10, fontSize: 16, color: colors.primary }}>
        Loading salons...
      </Text>
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

          
          <View style={styles.setCategoryContainer}>

  <TouchableOpacity
    style={[styles.categoryButton, selectedCategory === 'women' && styles.categoryButtonActive]}
    onPress={() => handleSelectSalonCategory('women')}
    accessibilityRole="button"
    accessibilityLabel={selectedCategory === 'women' ? 'Selected Women salon category' : 'Select Women salon category'}
  >
    <Text style={[styles.categoryButtonText, selectedCategory === 'women' && styles.categoryButtonTextActive]}>Women</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.categoryButton, selectedCategory === 'men' && styles.categoryButtonActive]}
    onPress={() => handleSelectSalonCategory('men')}
    accessibilityRole="button"
    accessibilityLabel={selectedCategory === 'men' ? 'Selected Men salon category' : 'Select Men salon category'}
  >
    <Text style={[styles.categoryButtonText, selectedCategory === 'men' && styles.categoryButtonTextActive]}>Men</Text>
  </TouchableOpacity>
</View>

          {/* Categories */}
          <SectionHeader title="What do you want to get?" />
          <View style={styles.categories}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat._id} 
                style={styles.categoryItem}
                accessibilityRole="button"
                accessibilityLabel={`View services for ${cat.name} category`}
              >
                <View style={styles.categoryIcon}>
                  <CategoryIcon uri={cat.icon} />
                </View>
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>


          {/* --- Salon Sections --- */}
          {renderSalonSection(selectedCategory.toUpperCase(), homeSalonsBySalonCategory?.data)}
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
  setCategoryContainer: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginHorizontal: 16,
  marginVertical: 16,
  gap: 16, // using gap for simplicity, test on target devices
},

categoryButton: {
  paddingVertical: 10,
  paddingHorizontal: 30,
  backgroundColor: colors.primaryLight,
  // borderRadius: 25, (Removed rounded border as it was commented out)
  borderWidth: 1,
  borderColor: 'transparent',
},

categoryButtonActive: {
  backgroundColor: colors.primary,
  borderColor: colors.primary,
},

categoryButtonText: {
  color: colors.primary,
  fontWeight: '600',
  fontSize: 16,
  textAlign: 'center',
},

categoryButtonTextActive: {
  color: colors.white,
},
  horizontalScroll: { paddingLeft: 16, paddingVertical: 10 },
  salonCardWrapper: { marginRight: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});