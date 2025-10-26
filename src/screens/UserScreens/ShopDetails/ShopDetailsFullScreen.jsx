import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceCard from './ServiceCard';
import SpecialistCard from './SpecialistCard';
import ReviewCard from './ReviewCard';

const { width } = Dimensions.get('window');

// Mock Data
const shopData = {
  name: 'Plush Beauty Lounge',
  location: 'Plain Toluid',
  distance: '18 km away available',
  rating: 4.7,
  reviews: '12k',
  views: '12k',
  images: [
    require('../../../assets/featuredSaloon.png'),
    require('../../../assets/featuredSaloon.png'),
    require('../../../assets/featuredSaloon.png'),
    require('../../../assets/featuredSaloon.png'),
  ],
  about: 'Looking for your career? Plush Beauty Lounge, they accept men as well as women. Our beauty treatment focuses on hair and skin, ensuring that if is shallots its skin, it matters to us.',
  openingHours: [
    { day: 'Monday', time: '08:00am - 09:00pm' },
    { day: 'Tuesday', time: 'Closed' },
    { day: 'Wednesday', time: '08:00am - 09:00pm' },
    { day: 'Thursday', time: '08:00am - 09:00pm' },
  ],
  services: [
    {
      id: '1',
      name: 'Women Haircut',
      price: 55,
      duration: '1.5 hour',
      description: 'A clean cut does is a shorter hairstyle Spec 1',
      discount: '-20%',
      image: require('../../../assets/featuredSaloon.png'),
    },
    {
      id: '2',
      name: 'Bob/ Lob Cut',
      price: 55,
      duration: '1.5 hour',
      description: 'The haircut is a women\'s hairstyle that is cut short...',
      discount: null,
      image: require('../../../assets/featuredSaloon.png'),
    },
    {
      id: '3',
      name: 'Medium Length Layer Cut',
      price: 80,
      duration: '1 hour',
      description: 'A layered hair is a hairstyle that gives the illusion of...',
      discount: null,
      image: require('../../../assets/featuredSaloon.png'),
    },
    {
      id: '4',
      name: 'V-Shaped Cut',
      price: 90,
      duration: '2.5 hour',
      description: 'There are a lot of variations between which...',
      discount: '-5%',
      image: require('../../../assets/featuredSaloon.png'),
    },
  ],
  specialists: [
    { id: '1', name: 'Ronald', image: require('../../../assets/featuredSaloon.png') },
    { id: '2', name: 'Merry', image: require('../../../assets/featuredSaloon.png') },
    { id: '3', name: 'Bella', image: require('../../../assets/featuredSaloon.png') },
    { id: '4', name: 'Joseph', image: require('../../../assets/featuredSaloon.png') },
  ],
  reviews: [
    {
      id: '1',
      userName: 'Jennie Whang',
      userImage: require('../../../assets/featuredSaloon.png'),
      rating: 4,
      date: '2 days ago',
      comment: 'The place was clean, great service, staff are friendly. I will certainly recommend to my friends and visit again! :)',
    },
    {
      id: '2',
      userName: 'Nathalie',
      userImage: require('../../../assets/featuredSaloon.png'),
      rating: 5,
      date: '1 weeks ago',
      comment: 'Very nice service from the specialist. I always going here for my treatment.',
    },
    {
      id: '3',
      userName: 'Julia Martha',
      userImage: require('../../../assets/featuredSaloon.png'),
      rating: 4,
      date: '2 weeks ago',
      comment: 'This is my favourite place to treat my hair :)',
    },
  ],
};
// Add this after line 102 (after shopData definition)
console.log('Reviews Data:', JSON.stringify(shopData.reviews, null, 2));

export default function ShopDetailsScreen({ navigation }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]} edges={[]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Icon name="arrow-back" size={24} color="#156778" />
          </TouchableOpacity>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="heart-outline" size={24} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Icon name="map-outline" size={24} color="#156778" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Image Gallery */}
          <View style={styles.imageGallery}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / width);
                setCurrentImageIndex(index);
              }}
              scrollEventThrottle={16}
            >
              {shopData.images.map((image, index) => (
                <Image key={index} source={image} style={styles.galleryImage} />
              ))}
            </ScrollView>

            {/* Image Indicators */}
            <View style={styles.imageIndicators}>
              {shopData.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    currentImageIndex === index && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Shop Info */}
          <View style={styles.infoSection}>
            <Text style={styles.shopName}>{shopData.name}</Text>

            <View style={styles.locationRow}>
              <Icon name="location-outline" size={16} color="#6B7280" />
              <Text style={styles.locationText}>{shopData.location}</Text>
              <View style={styles.dot} />
              <Text style={styles.distanceText}>{shopData.distance}</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Icon name="star" size={16} color="#FACC15" />
                <Text style={styles.statText}>{shopData.rating}</Text>
                <Text style={styles.statSubText}>({shopData.reviewCount || shopData.reviews.length})</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Icon name="eye-outline" size={16} color="#6B7280" />
                <Text style={styles.statText}>{shopData.views} views</Text>
              </View>
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>{shopData.about}</Text>
          </View>

          {/* Opening Hours */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opening Hours</Text>
            {shopData.openingHours.map((item, index) => (
              <View key={index} style={styles.hourRow}>
                <Text style={styles.dayText}>{item.day}</Text>
                <Text style={[
                  styles.timeText,
                  item.time === 'Closed' && styles.closedText
                ]}>
                  {item.time}
                </Text>
              </View>
            ))}
          </View>

          {/* Our Services */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Services</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            {/* Service Filter Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterTabsContainer}
            >
              <TouchableOpacity
                style={[styles.filterTab, styles.filterTabActive]}
                activeOpacity={0.7}
              >
                <View style={styles.filterIconContainer}>
                  <Icon name="cut-outline" size={20} color="#156778" />
                </View>
                <Text style={[styles.filterTabText, styles.filterTabTextActive]}>
                  Haircut
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTab} activeOpacity={0.7}>
                <View style={styles.filterIconContainer}>
                  <Icon name="happy-outline" size={20} color="#6B7280" />
                </View>
                <Text style={styles.filterTabText}>Facial</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterTab} activeOpacity={0.7}>
                <View style={styles.filterIconContainer}>
                  <Icon name="hand-left-outline" size={20} color="#6B7280" />
                </View>
                <Text style={styles.filterTabText}>Nails</Text>
              </TouchableOpacity>
            </ScrollView>

            {shopData.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}

            <TouchableOpacity style={styles.viewAllServicesButton}>
              <Text style={styles.viewAllServicesText}>View All Services</Text>
            </TouchableOpacity>
          </View>

          {/* Gallery */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {shopData.images.map((image, index) => (
                <Image key={index} source={image} style={styles.galleryThumb} />
              ))}
            </ScrollView>
          </View>

          {/* Our Specialist */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Specialist</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {shopData.specialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
              ))}
            </ScrollView>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            {shopData.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </View>
        </ScrollView>

        {/* Fixed Bottom Bar */}
        <View style={styles.bottomBar}>
          <View style={styles.priceContainer}>
            <Icon name="checkmark-circle" size={24} color="#156778" />
            <View style={styles.priceInfo}>
              <Text style={styles.totalLabel}>Total (1 Service)</Text>
              <Text style={styles.totalPrice}>₹ 2500</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('Booking')}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  imageGallery: {
    height: 250,
    position: 'relative',
  },
  galleryImage: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  shopName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 8,
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  statSubText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 2,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#06B6D4',
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dayText: {
    fontSize: 14,
    color: '#111827',
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  closedText: {
    color: '#EF4444',
  },
  viewAllServicesButton: {
    borderWidth: 1,
    borderColor: '#156778',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  viewAllServicesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#156778',
  },
  galleryThumb: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  priceInfo: {
    marginLeft: 8,
  },
  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  bookButton: {
    backgroundColor: '#156778',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  filterTabsContainer: {
    marginBottom: 16,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
  },
  filterTabActive: {
    backgroundColor: '#E1F5FA',
    borderColor: '#156778',
  },
  filterIconContainer: {
    marginRight: 8,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#156778',
    fontWeight: '600',
  },
});