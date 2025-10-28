import React, {useContext} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HomeHeader from '../../../components/HomeHeader';
import SectionHeader from '../../../components/SectionHeader';
import SalonCard from './SalonCard';
import NearbyOfferCard from './NearbyOfferCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import HaircutIcon from '../../../assets/categoryIcons/haircut.svg';
import NailsIcon from '../../../assets/categoryIcons/nails.svg';
import FacialIcon from '../../../assets/categoryIcons/facial.svg';
import ColoringIcon from '../../../assets/categoryIcons/coloring.svg';
import SpaIcon from '../../../assets/categoryIcons/spa.svg';
import WaxingIcon from '../../../assets/categoryIcons/waxing.svg';
import MakeupIcon from '../../../assets/categoryIcons/makeup.svg';
import MassageIcon from '../../../assets/categoryIcons/massage.svg';
import { useSelector } from 'react-redux';
import { LocationContext } from '../../../components/LocationProvider';


export default function HomeScreen({ navigation }) {
  const { location, loading } = useContext(LocationContext);

  const user = useSelector((state) => state.auth.user);

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

  // Mock data for followed salons - replace with your actual data
  const followedSalons = [
    { id: '1', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '2', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '3', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '4', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '5', imageUrl: require('../../../assets/salonfollow.png') },
    { id: '6', imageUrl: require('../../../assets/salonfollow.png') },
  ];

  const featuredSalons = [
    {
      id: '1',
      imageUrl: require('../../../assets/featuredSalon.png'),
      category: 'Hair • Facial',
      name: 'Salon de Elegance',
      address: '800 35th Ave #2, Point City...',
      rating: '4.9',
      reviews: '814',
    },
    {
      id: '2',
      imageUrl: require('../../../assets/featuredSalon.png'),
      category: 'Hair • Color',
      name: 'Plum Beauty Lounge',
      address: '5007 Imperial Hwy...',
      rating: '4.7',
      reviews: '514',
    },
    {
      id: '3',
      imageUrl: require('../../../assets/featuredSalon.png'),
      category: 'Spa • Massage',
      name: 'Zen Glow Studio',
      address: 'Hitech City, Hyderabad',
      rating: '4.8',
      reviews: '1.2k',
    },
  ];


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <HomeHeader user={user} navigation={navigation} />

           {/* Display user location */}
          {loading ? (
  <Text>Fetching location...</Text>
) : location ? (
  <Text>
    Your Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
  </Text>
) : (
  <Text>Location unavailable</Text>
)}

          {/* --- Promo Banner --- */}
          <View style={styles.promoContainer}>
            <Image
              source={require('../../../assets/promo.png')}
              style={styles.promoImage}
            />
            {/* <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Today's Special</Text>
              <Text style={styles.promoSubtitle}>Get a special offer for today</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Get an offer</Text>
              </TouchableOpacity>
            </View> */}
            {/* <View style={styles.discountBadge}>
              <Text style={styles.discountText}>50%</Text>
              <Text style={styles.discountSubText}>OFF</Text>
            </View> */}
          </View>

          {/* Categories */}
          <SectionHeader title="What do you want to get?" showViewAll={false} />

          <View style={styles.categories}>
            {categories.map((cat) => {
              const IconComponent = cat.icon; // SVG component
              return (
                <View key={cat.label} style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    {IconComponent && <IconComponent width={32} height={32} />}
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </View>
              );
            })}
          </View>

          {/* --- Salon you follow --- ADDED SECTION --- */}
          <SectionHeader title="Salon you follow" showViewAll={false} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.followedSalonsContainer}>
            {followedSalons.map((salon) => (
              <TouchableOpacity key={salon.id} style={styles.followedSalonItem}>
                <LinearGradient
                  colors={['#156778', '#03BAE1']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                >
                  <Image source={salon.imageUrl} style={styles.followedSalonImage} />
                  {/* <Image source={{ uri: salon.imageUrl }} style={styles.followedSalonImage} /> */}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>


          {/* Featured Salons */}
          <SectionHeader title="Featured Salon" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredSalonContainer}
          >
            {featuredSalons.map((salon) => (
              <View key={salon.id} style={styles.featuredSalonCard}>
                <SalonCard
                  imageUrl={salon.imageUrl}
                  category={salon.category}
                  name={salon.name}
                  address={salon.address}
                  rating={salon.rating}
                  reviews={salon.reviews}
                />
              </View>
            ))}
          </ScrollView>


          {/* Nearby Offers */}
          <SectionHeader title="Nearby Offers" />
          <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 26,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#000000ff', marginBottom: 6 },
  headerSubtitle: { fontSize: 13, color: '#50555C' },
  searchButton: {
    backgroundColor: '#156778',
    padding: 10,
    borderRadius: 50,
  },

  // Promo Styles
  promoContainer: {
    // margin: 4,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ffffffff',
    height: 140,
    justifyContent: 'center',
  },
  promoImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 16,
  },

  promoContent: {
    marginLeft: 16,
    width: '60%',
    zIndex: 10,
  },
  promoTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  promoSubtitle: { fontSize: 13, color: '#fff', marginVertical: 4 },
  promoButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  promoButtonText: { color: '#111827', fontWeight: '600', fontSize: 13 },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FBBF24',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-15deg' }],
  },
  discountText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  discountSubText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  // Categories
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 16,
  },
  categoryIcon: {
    backgroundColor: '#E1F5FA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 13,
    color: '#156778',
    fontWeight: '500',
  },
  // --- Added Styles for Salon you follow ---
  followedSalonsContainer: {
    paddingLeft: 16,
    paddingVertical: 12, // Added some vertical padding
    marginBottom: 8, // Added margin at the bottom
  },
  followedSalonItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  gradientBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    padding: 3, // thickness of the gradient border
    alignItems: 'center',
    justifyContent: 'center',
  },
  followedSalonImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  featuredSalonContainer: {
    paddingLeft: 16,
    paddingVertical: 10,
  },
  featuredSalonCard: {
    width: 240,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2, // For Android shadow
  },

});
