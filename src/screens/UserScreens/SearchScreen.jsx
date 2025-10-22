import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Mock Data ---

const recentSearches = [
  { id: '1', term: 'Hair service' },
  { id: '2', term: 'Nail' },
  { id: '3', term: 'Wax' },
];

const popularSearches = [
  'Hair',
  'Nails',
  'Coloring',
  'Message',
  'Facials',
];

const suggestionData = [
  {
    id: '1',
    name: 'Lakme Salon',
    location: 'Banjara hills, Hyderabad..',
    categories: 'Hair . Facial',
    rating: 4.7,
    reviews: '2.7k',
    discount: '-58%',
    image: require('../../assets/image.png'),
  },
  {
    id: '2',
    name: 'Lovely Lather',
    location: 'Hitech city road, Madhapur..',
    categories: 'Hair . Facial',
    rating: 4.5,
    reviews: '2.8k',
    discount: '-58%',
    image: require('../../assets/image.png'),
  },
];

// --- Re-usable Salon Card Component ---
// (Based on the component from NearbyListScreen)
const SalonCard = ({ item }) => (
  <TouchableOpacity style={styles.cardContainer}>
    <View style={styles.imageContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <TouchableOpacity style={styles.heartIcon}>
        <Icon name="heart" size={18} color="#E53935" />
      </TouchableOpacity>
    </View>
    <View style={styles.cardContent}>
      <View>
        <Text style={styles.cardCategories}>{item.categories}</Text>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardLocation}>{item.location}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFC107" />
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviews})
          </Text>
        </View>
        <View style={styles.discountContainer}>
          <Icon name="pricetag-outline" size={16} color="#3498db" />
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

// --- Main Screen Component ---
export default function SearchScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 28 }} /> {/* Spacer */}
      </View>

      {/* --- Search Bar --- */}
      <View style={styles.searchBarContainer}>
        <Icon
          name="search-outline"
          size={22}
          color="#9CA3AF"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search salon or service.."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* --- Recents Section --- */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recents</Text>
            <TouchableOpacity>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentsList}>
            {recentSearches.map((item) => (
              <View key={item.id} style={styles.recentItem}>
                <Text style={styles.recentItemText}>{item.term}</Text>
                <TouchableOpacity>
                  <Icon name="close-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* --- Popular Search Section --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Search</Text>
          <View style={styles.popularChipsContainer}>
            {popularSearches.map((item) => (
              <TouchableOpacity key={item} style={styles.popularChip}>
                <Text style={styles.popularChipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- Suggestion for you Section --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Suggestion for you</Text>
          {/* Using map instead of FlatList since it's inside a ScrollView */}
          <View>
            {suggestionData.map((item) => (
              <SalonCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1F2937',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light grey background for content
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  clearAllText: {
    fontSize: 14,
    color: '#0288D1', // Blue text
    fontWeight: '500',
  },
  recentsList: {},
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  recentItemText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  popularChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  popularChip: {
    backgroundColor: '#E1F5FE', // Light blue background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  popularChipText: {
    color: '#0288D1', // Blue text
    fontSize: 14,
    fontWeight: '500',
  },
  // --- Salon Card Styles ---
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    height: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    // Add a light border as seen in the image
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  imageContainer: {
    width: 130,
    height: '100%',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 6,
    borderRadius: 15,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardCategories: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 2,
  },
  cardLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#1F2937',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
});
