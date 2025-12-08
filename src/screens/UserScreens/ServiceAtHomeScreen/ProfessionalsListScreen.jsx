import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ProfessionalDetailScreen from './ProfessionalDetailScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();



// Mock data based on your image
const salonData = [
  {
    id: '1',
    name: 'Ashok Sinha',
    location: 'Banjara hills, Hyderabad..',
    categories: 'Hair . Facial',
    rating: 4.7,
    reviews: '2.7k',
    discount: '-58%',
    distance: '5.1km',
    image: require('../../../assets/profileImg.jpg'), // Using placeholder
  },
  {
    id: '2',
    name: 'Kumar roy',
    location: 'Hitech city road, Madhapur,Hyderabad..',
    categories: 'Hair . Facial',
    rating: 4.5,
    reviews: '2.8k',
    discount: '-58%',
    distance: '5.1km',
    image: require('../../../assets/profileImg.jpg'), // Using placeholder
  },
  {
    id: '3',
    name: 'Vinit Singh',
    location: 'Nexus mall, Hyderabad..',
    categories: 'Hair . Facial',
    rating: 4.3,
    reviews: '1.7k',
    discount: '-58%',
    distance: '5.1km',
    image: require('../../../assets/profileImg.jpg'), // Using placeholder
  },
  {
    id: '4',
    name: 'Dinesh Kapoor',
    location: 'Kondapur, Hyderabad..',
    categories: 'Hair . Facial',
    rating: 4.9,
    reviews: '3.1k',
    discount: '-58%',
    distance: '5.1km',
    image: require('../../../assets/profileImg.jpg'), // Using placeholder
  },
];

// --- Salon Card Component (Updated) ---
const SalonCard = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.cardContainer}
    onPress={() => navigation.navigate('ProfessionalDetailScreen')}
  >
    {/* IMAGE + RATING BADGE */}
    <View style={styles.leftSection}>
      <Image source={item.image} style={styles.profileImg} />

      {/* Green Rating Badge */}
      <View style={styles.ratingBadge}>
        <Icon name="star" size={12} color="#fff" />
        <Text style={styles.ratingBadgeText}>{item.rating}</Text>
      </View>
    </View>

    {/* MIDDLE CONTENT */}
    <View style={styles.middleSection}>
      <Text style={styles.nameText}>{item.name}</Text>

      <View style={styles.row}>
        <Icon name="location-outline" size={16} color="#7A7D82" />
        <Text style={styles.detailText}>{item.location}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="briefcase-outline" size={16} color="#7A7D82" />
        <Text style={styles.detailText}>{item.categories}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="cut-outline" size={16} color="#7A7D82" />
        <Text style={styles.detailText}>Makeup | Makeup | Wax</Text>
      </View>

      <View style={styles.row}>
        <Icon name="female-outline" size={16} color="#7A7D82" />
        <Text style={styles.detailText}>FEMALE</Text>
      </View>
    </View>

    {/* RIGHT ARROW */}
    <View style={styles.rightSection}>
      <Icon name="chevron-forward" size={22} color="#0A5C62" />
    </View>
  </TouchableOpacity>
);

// --- Filter Categories ---
const filters = ['Hair', 'Nails', 'Facial', 'Color'];

export default function ProfessionalsListScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('Facial');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nearby Specialists List</Text>
          {/* This button lets you close the modal */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-down-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* --- Filter ScrollView --- */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Salon List --- */}
        <FlatList
          data={salonData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <SalonCard item={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// --- Styles (Updated) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA', // Light background for the whole screen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF', // White header background
    marginHorizontal: -20, // Extend to screen edges
    paddingHorizontal: 20, // Re-apply padding
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600', // Semi-bold
    color: '#111111',
  },
  filterContainer: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF', // White filter background
    marginHorizontal: -20, // Extend to screen edges
    paddingHorizontal: 20, // Re-apply padding
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F3F4F6', // Default light grey
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Default grey border
  },
  filterButtonActive: {
    backgroundColor: '#E1F5FE', // Light blue background
    borderColor: '#0288D1', // Blue border
  },
  filterText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111111', // Darker grey text
  },
  filterTextActive: {
    color: '#156778', // Blue text
    fontWeight: '600',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 0.1,
    borderColor: 'black',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  leftSection: {
    position: 'relative',
    marginRight: 14,
  },

  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },

  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    left: -2,
    backgroundColor: '#00A86B',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingBadgeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },

  middleSection: {
    flex: 1,
  },

  nameText: {
    fontSize: 18,
    color: '#0A5C62',
    fontWeight: '700',
    marginBottom: 4,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  detailText: {
    fontSize: 14,
    color: '#6B7075',
    marginLeft: 6,
  },

  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    width: 130, // Fixed width for the image container
    height: '100%',
    position: 'relative', // Needed for absolute positioning of icons
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12, // Apply border radius to the image
    borderBottomLeftRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 6,
    borderRadius: 15,
  },
  distanceTag: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    backgroundColor: '#FFF9E5', // Light orange as in image
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F98600', // Dark orange text
  },
  cardContent: {
    flex: 1, // Take up remaining space
    padding: 14,
    justifyContent: 'space-between', // Space content vertically
  },
  cardCategories: {
    fontSize: 13,
    color: '#156778',
  },
  cardTitle: {
    fontSize: 18, // Slightly smaller for horizontal card
    fontWeight: 'bold',
    color: '#111111',
    marginVertical: 2,
  },
  cardLocation: {
    fontSize: 13,
    color: '#50555C',
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
    marginLeft: 6,
    fontSize: 14,
    color: '#111111',
    fontWeight: '600',
  },
  reviewText: {
    marginLeft: 6,
    fontSize: 14,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Removed background color to match UI
  },
  discountText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#111111', // Blue text to match icon
  },
});
