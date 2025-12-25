import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSalonsByCategory } from '../../redux/slices/userSlice';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const salonData = [
  {
    id: 1,
    name: 'Glow Beauty Studio',
    image: require('../../assets/salonInterior.jpg'),
    // image: 'https://via.placeholder.com/350x180',
    services: 'Haircut ₹299 · Hair Color ₹899 · Facial ₹499',
    distance: '1.2 km',
    rating: '4.8',
  },
  {
    id: 2,
    name: 'Elegance Spa & Salon',
    // image: 'https://via.placeholder.com/350x180',
    services: 'Hair Color ₹1,299 · Spa ₹1,999',
    distance: '2.5 km',
    rating: '4.8',
  },
  {
    id: 3,
    name: 'Radiance Beauty Bar',
    // image: 'https://via.placeholder.com/350x180',
    services: 'Bridal Makeup ₹5,999 · Threading ₹99',
    distance: '4.9 km',
    rating: '4.8',
  },
  {
    id: 4,
    name: 'Radiance Beauty Bar',
    // image: 'https://via.placeholder.com/350x180',
    services: 'Bridal Makeup ₹5,999 · Threading ₹99',
    distance: '4.9 km',
    rating: '4.8',
  },
  {
    id: 5,
    name: 'Radiance Beauty Bar',
    // image: 'https://via.placeholder.com/350x180',
    services: 'Bridal Makeup ₹5,999 · Threading ₹99',
    distance: '4.9 km',
    rating: '4.8',
  },
  {
    id: 6,
    name: 'Radiance Beauty Bar',
    // image: 'https://via.placeholder.com/350x180',
    services: 'Bridal Makeup ₹5,999 · Threading ₹99',
    distance: '4.9 km',
    rating: '4.8',
  },
];

export default function AllSalonListScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { allSalons, loading, error } = useSelector(state => state.user);
  const { category, lat, lng } = route.params;

  console.log('AllSalonListScreen salons from redux:', allSalons);

  useEffect(() => {
    if (category && lat && lng) {
      dispatch(fetchAllSalonsByCategory({ category, lat, lng }));
    }
  }, [category, lat, lng, dispatch]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Popular Near Me</Text>
          {/* This button lets you close the modal */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-down-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Salon List */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 65 }}
          showsVerticalScrollIndicator={false}
        >
          {allSalons.map(salon => (
            <TouchableOpacity
              key={salon._id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('ShopDetailsFull', { salonId: salon._id })
              }
            >
              <Image
                source={require('../../assets/salonInterior.jpg')}
                style={styles.image}
              />

              <View style={styles.cardContent}>
                <Text style={styles.salonName}>{salon.shopName}</Text>
                <Text style={styles.services}>
                  Bridal Makeup ₹5,999 · Threading ₹99
                </Text>

                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>
                    📍 {(salon.distanceInMeters / 1000).toFixed(2)}
                  </Text>
                  <Text style={styles.footerText}>⭐ 4.8</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#156778',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: -10,
    marginHorizontal: -20, // Extend to screen edges
    paddingHorizontal: 20, // Re-apply padding
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600', // Semi-bold
    color: '#111111',
  },

  container: {
    backgroundColor: '#F8F8F8',
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },

  searchRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    elevation: 2,
  },

  filterBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },

  filterText: {
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    height: 320,
    overflow: 'hidden',
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 200,
  },

  cardContent: {
    padding: 12,
  },

  salonName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },

  services: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
    marginBottom: 10,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  footerText: {
    fontSize: 13,
    color: '#555',
  },
});
