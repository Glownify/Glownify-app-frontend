import React, {useContext} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native';
import HomeHeader from '../../../components/HomeHeader';
import SectionHeader from '../../../components/SectionHeader';
import SalonCard from './SalonCard';
import NearbyOfferCard from './NearbyOfferCard';
import { SafeAreaView } from 'react-native-safe-area-context';

import HaircutIcon from '../../../assets/categoryIcons/haircut.svg';
import NailsIcon from '../../../assets/categoryIcons/nails.svg';
import FacialIcon from '../../../assets/categoryIcons/facial.svg';
import ColoringIcon from '../../../assets/categoryIcons/coloring.svg';
import SpaIcon from '../../../assets/categoryIcons/spa.svg';
import WaxingIcon from '../../../assets/categoryIcons/waxing.svg';
import MakeupIcon from '../../../assets/categoryIcons/makeup.svg';
import MassageIcon from '../../../assets/categoryIcons/massage.svg';

import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeSalons } from '../../../redux/slices/userSlice';

const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  black: '#111827',
  text: '#374151',
  textSecondary: '#6B7280',
  background: '#FFFFFF',
  border: '#E5E7EB',
};

export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { loading, homeSalons, error } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(fetchHomeSalons());
  }, []);
  console.log('Home Screen - User:', homeSalons
  );

  console.log(error);



  const categories = [
    { icon: HaircutIcon, label: 'Haircut' },
    { icon: NailsIcon, label: 'Nails' },
    { icon: FacialIcon, label: 'Facial' },
    { icon: ColoringIcon, label: 'Coloring' },
    { icon: SpaIcon, label: 'Spa' },
    { icon: WaxingIcon, label: 'Waxing' },
    { icon: MakeupIcon, label: 'Makeup' },
    { icon: MassageIcon, label: 'Massage' },
  ];

  // Mock data - replace with your actual data
  const followedSalons = [
    { id: '1', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '2', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '3', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '4', imageUrl: require('../../../assets/salonfollow.png') },
  ];

  const menSaloons = [
    {
      id: '1',
      imageUrl: require('../../../assets/featuredSalon.png'),
      category: 'Hair • Facial',
      name: 'Salon de Elegance',
      address: '800 35th Ave #2, Point City...',
      rating: '4.9',
      reviews: '814',
    },
    // ... other salons
  ];

  const beautyParlours = [
    {
      id: 'b1',
      imageUrl: require('../../../assets/featuredSalon.png'),
      category: 'Makeup • Spa',
      name: 'Glow Beauty Lounge',
      address: 'Banjara Hills, Hyderabad',
      rating: '4.9',
      reviews: '1.8k',
    },
    // ... other parlours
  ];

  const homeServices = [
    {
      id: 'h1',
      imageUrl: require('../../../assets/featuredSalon.png'),
      category: 'Massage • Haircut',
      name: 'Urban Spa at Home',
      address: 'Madhapur, Hyderabad',
      rating: '4.8',
      reviews: '2.3k',
    },
    // ... other services
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
  <StatusBar
    barStyle="light-content" // white icons (good contrast for dark primary)
    backgroundColor={colors.primary} // Android only
  />
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <HomeHeader user={user} navigation={navigation} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >

        {/* --- Promo Banner --- */}
        <View style={styles.promoContainer}>
          <Image
            source={require('../../../assets/promo.png')}
            style={styles.promoImage}
          />
        </View>

        {/* Categories */}
        <SectionHeader title="What do you want to get?" showViewAll={false} />
        <View style={styles.categories}>
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <TouchableOpacity key={cat.label} style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  {IconComponent && <IconComponent width={32} height={32} />}
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* --- Salon you follow --- */}
        {/* <SectionHeader title="Salon you follow" showViewAll={false} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollContainer}
        >
          {followedSalons.map((salon) => (
            <TouchableOpacity key={salon.id} style={styles.followedSalonItem}>
              <LinearGradient
                colors={['#156778', '#03BAE1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBorder}
              >
                <Image source={salon.imageUrl} style={styles.followedSalonImage} />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        {/* Featured Salons - Men */}
        <SectionHeader title="Men Salon" onPress={() => navigation.navigate('SalonsListScreen', { type: 'Men' })} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollContainer}
        >
          {menSaloons.map((salon) => (
            <View key={salon.id} style={styles.featuredSalonCard}>
              <SalonCard {...salon} />
            </View>
          ))}
        </ScrollView>

        {/* Beauty Parlour Section */}
        <SectionHeader title="Beauty Parlour" onPress={() => navigation.navigate('SalonsListScreen', { type: 'Beauty' })} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollContainer}
        >
          {beautyParlours.map((salon) => (
            <View key={salon.id} style={styles.featuredSalonCard}>
              <SalonCard {...salon} />
            </View>
          ))}
        </ScrollView>

        {/* Home Service Section */}
        <SectionHeader title="Home Service" onPress={() => navigation.navigate('SalonsListScreen', { type: 'Home' })} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollContainer}
        >
          {homeServices.map((salon) => (
            <View key={salon.id} style={styles.featuredSalonCard}>
              <SalonCard {...salon} />
            </View>
          ))}
        </ScrollView>

        {/* Nearby Offers */}
        <SectionHeader title="Nearby Offers" onPress={() => navigation.navigate('SalonsListScreen', { type: 'Offers' })} />
        <View style={styles.nearbyOffersContainer}>
          <NearbyOfferCard
            imageUrl={require('../../../assets/featuredSalon.png')}
            category="Hair • Facial"
            name="Maroon's Luxury Salon"
            address="Kukatpally, Hyderabad"
            rating="4.8"
            reviews="3.7k"
            discount="15% Off"
          />
          {/* Add more NearbyOfferCard here */}
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContentContainer: {
    paddingBottom: 40, // Ensure space at the bottom
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  // Promo Styles
  promoContainer: {
    borderRadius: 16,
    // overflow: 'hidden',
    height: 180,
    // borderWidth: 1,
    // borderColor: 'red',
    marginHorizontal: 16, // Consistent horizontal margin
    marginVertical: 6, // Add space from location
  },
  promoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Categories
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8, // Space from SectionHeader
  },
  categoryItem: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 16,
  },
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
  
  // Horizontal Scrolling Sections
  horizontalScrollContainer: {
    paddingLeft: 16,
    paddingVertical: 12,
  },

  // --- Salon you follow ---
  followedSalonItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  gradientBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    padding: 3, // thickness
    alignItems: 'center',
    justifyContent: 'center',
  },
  followedSalonImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
  },

  // --- Featured Salon Card Wrapper ---
  featuredSalonCard: {
    width: 240, // Fixed width for horizontal scrolling
    marginRight: 16,
  },

  // --- Nearby Offers ---
  nearbyOffersContainer: {
    paddingHorizontal: 16, // Consistent horizontal padding
  },
});