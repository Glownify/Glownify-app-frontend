import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Define colors for this component
const colors = {
  primary: '#156778',
  white: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  star: '#FACC15',
  like: '#EF4444',
  likeBg: 'rgba(255, 255, 255, 0.9)', // --- AESTHETIC TWEAK: Slightly more opaque ---
  border: '#E5E7EB',
};

const SalonCard = ({ imageUrl, category, name, address, rating, reviews }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ShopDetailsSummary')}
      activeOpacity={0.8}
    >
      <Image
        source={imageUrl}
        style={styles.image}
        defaultSource={require('../../../assets/featuredSalon.png')}
      />
      <TouchableOpacity style={styles.heartButton}>
        <Ionicons name="heart-outline" size={20} color={colors.like} />
      </TouchableOpacity>
      
      <View style={styles.info}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={colors.star} />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.reviews}>({reviews})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    // --- AESTHETIC TWEAKS ---
    borderWidth: 1, 
    borderColor: colors.border, // Helps card pop on off-white bg
    overflow: 'hidden', // Ensures image corners are clipped
  },
  image: {
    width: '100%',
    height: 160,
    // Removed border radius, as parent 'overflow: hidden' handles it
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: colors.likeBg,
    borderRadius: 18,
    padding: 6,
  },
  info: {
    padding: 12,
  },
  category: {
    fontSize: 11,
    color: colors.primary,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 2,
  },
  address: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
    color: colors.text,
  },
  reviews: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});

export default SalonCard;