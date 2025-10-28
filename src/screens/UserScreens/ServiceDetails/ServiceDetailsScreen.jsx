import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ServiceDetailsScreen({ navigation }) {
  const serviceData = {
    name: 'Woman Medium Blunt Cut',
    duration: '2.5 hours service',
    price: 2500,
    discount: '-20%',
    image: require('../../../assets/featuredSalon.png'),
    about: 'A blunt cut bob is a shorter hairstyle that\'s cut into a straight line at the ends. Bobs have proven themselves to be transcending the hair world by continuing to be a top hairstyle year after year. They can be customized to fit your preferences, are low maintenance and look good with many outfits.',
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#156778" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Service Detail</Text>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Service Image */}
          <View style={styles.imageContainer}>
            <Image source={serviceData.image} style={styles.serviceImage} />

            {/* Image Indicators */}
            <View style={styles.imageIndicators}>
              <View style={[styles.indicator, styles.activeIndicator]} />
              <View style={styles.indicator} />
              <View style={styles.indicator} />
            </View>
          </View>

          {/* Service Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.serviceName}>{serviceData.name}</Text>

            <View style={styles.durationRow}>
              <Icon name="time-outline" size={18} color="#6B7280" />
              <Text style={styles.durationText}>{serviceData.duration}</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>₹ {serviceData.price}</Text>
              {serviceData.discount && (
                <View style={styles.discountBadge}>
                  <Icon name="pricetag" size={14} color="#F59E0B" />
                  <Text style={styles.discountText}>{serviceData.discount}</Text>
                </View>
              )}
            </View>

            {/* About Service */}
            <Text style={styles.sectionTitle}>About Service</Text>
            <Text style={styles.aboutText}>{serviceData.about}</Text>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Booking')}
          >
            <Text style={styles.addButtonText}>Add to Booking Chart</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
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
    backgroundColor: '#F59E0B',
    width: 24,
  },
  infoContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  serviceName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  durationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginRight: 12,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  addButton: {
    backgroundColor: '#156778',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});