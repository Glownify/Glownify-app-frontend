import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const NearbyOfferCard = ({ imageUrl, category, name, address, rating, reviews, discount }) => {
  const navigation = useNavigation();
  const [imgSource, setImgSource] = useState(
    typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ShopDetailsSummary')}
      activeOpacity={0.8}
    >
      <TouchableOpacity style={styles.heartButton}>
        <Ionicons name="heart-outline" size={20} color="#EF4444" />
      </TouchableOpacity>

      <Image
        source={imgSource}
        style={styles.image}
        resizeMode="cover"
        onError={() => setImgSource(require('../../../assets/featuredSalon.png'))}
      />

      <View style={styles.info}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FACC15" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.reviews}>({reviews})</Text>
        </View>
        {discount && <Text style={styles.discount}>{discount}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    padding: 4,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 12,
    margin: 8,
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  category: {
    fontSize: 10,
    color: '#6B7280',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  address: {
    fontSize: 12,
    color: '#6B7280',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1F2937',
  },
  reviews: {
    fontSize: 11,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  discount: {
    marginTop: 4,
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});

export default NearbyOfferCard;