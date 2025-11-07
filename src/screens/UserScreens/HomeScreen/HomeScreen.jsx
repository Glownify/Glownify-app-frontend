// src/screens/UserScreens/Home/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeSalons } from '../../../redux/slices/userSlice';
import HomeHeader from '../../../components/HomeHeader';
import SectionHeader from '../../../components/SectionHeader';
import SalonCard from './SalonCard';
import NearbyOfferCard from './NearbyOfferCard';

import HaircutIcon from '../../../assets/categoryIcons/haircut.svg';
import NailsIcon from '../../../assets/categoryIcons/nails.svg';
import FacialIcon from '../../../assets/categoryIcons/facial.svg';
import ColoringIcon from '../../../assets/categoryIcons/coloring.svg';
import SpaIcon from '../../../assets/categoryIcons/spa.svg';
import WaxingIcon from '../../../assets/categoryIcons/waxing.svg';
import MakeupIcon from '../../../assets/categoryIcons/makeup.svg';
import MassageIcon from '../../../assets/categoryIcons/massage.svg';

const colors = {
  primary: '#156778',
  primaryLight: '#E1F5FA',
  white: '#FFFFFF',
  background: '#FFFFFF',
  textSecondary: '#6B7280',
};

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { loading, homeSalons, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchHomeSalons());
  }, [dispatch]);

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

  const renderSalonSection = (title, data) => {
    if (!data || data.length === 0) return null;

    return (
      <View style={{ marginBottom: 20 }}>
        <SectionHeader title={title} showViewAll onPress={() => navigation.navigate('SalonsListScreen', { type: title })} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {data.map((salon) => (
            <View key={salon._id} style={styles.salonCardWrapper}>
              <SalonCard salon={salon} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading salons...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <HomeHeader user={user} navigation={navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Promo Banner */}
          <View style={styles.promoContainer}>
            <Image source={require('../../../assets/promo.png')} style={styles.promoImage} />
          </View>

          {/* Categories */}
          <SectionHeader title="What do you want to get?" />
          <View style={styles.categories}>
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <TouchableOpacity key={cat.label} style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <IconComponent width={32} height={32} />
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* --- Salon Sections --- */}
          {renderSalonSection('Men Salon', homeSalons?.menSalon)}
          {renderSalonSection('Beauty Parlour', homeSalons?.beautyParlour)}
          {renderSalonSection('Unisex', homeSalons?.unisex)}
          {renderSalonSection('Spa', homeSalons?.spa)}
          {renderSalonSection('Barbershop', homeSalons?.barbershop)}

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
  },
  promoImage: { width: '100%', height: 180, borderRadius: 12 },
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
  horizontalScroll: { paddingLeft: 16, paddingVertical: 10 },
  salonCardWrapper: { marginRight: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
