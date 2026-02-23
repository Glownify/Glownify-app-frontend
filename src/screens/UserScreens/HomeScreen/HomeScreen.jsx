import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHomeSalonsBySalonCategory,
  fetchHomeIndependentprosByCategory,
  getAllCategories,
  fetchUnisexSalons,
} from '../../../redux/slices/userSlice';
import { LocationContext } from '../../../components/LocationProvider';

// Layout & Global
import HomeHeader from '../../../components/HomeHeader';

// Home-specific components
import BookAtHomeBanner from '../../../components/homescreen/Bookathomebanner';
import GenderToggle from '../../../components/homescreen/Gendertoggle';
import ServiceCategoriesSection from '../../../components/homescreen/Servicecategoriessection';
import SalonListSection from '../../../components/homescreen/Salonlistsection';
import ServiceAtHomeSection from '../../../components/homescreen/Serviceathomesection';
import NearbySection from '../../../components/homescreen/Nearbysection';
import GlownifyFooter from '../../../components/homescreen/Glownifyfooter';

// Skeletons for individual sections
import SalonListSkeleton from '../../../components/Salonlistskeleton';
import SkeletonLoadingScreen from './SkeletonLoadingScreen';

const SERVICE_CATEGORIES = [
  { id: 1, name: 'Hairs' },
  { id: 2, name: 'Spa' },
  { id: 3, name: 'Nails' },
  { id: 4, name: 'Coloring' },
  { id: 5, name: 'Wax' },
  { id: 6, name: 'Makeup' },
  { id: 7, name: 'Make Up' },
  { id: 8, name: 'Something' },
];

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { location } = useContext(LocationContext);
  const { homeSalonsBySalonCategory, homeIndependentProsByCategory } =
    useSelector(state => state.user);

  const salonList = Array.isArray(homeSalonsBySalonCategory?.data?.salons)
    ? homeSalonsBySalonCategory.data.salons
    : Array.isArray(homeSalonsBySalonCategory?.data)
    ? homeSalonsBySalonCategory.data
    : [];

  const independentProsList = Array.isArray(
    homeIndependentProsByCategory?.data?.independentPros,
  )
    ? homeIndependentProsByCategory.data.independentPros
    : Array.isArray(homeIndependentProsByCategory?.data)
    ? homeIndependentProsByCategory.data
    : [];

  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('women');

  // Per-section loading states — avoids full-screen skeleton on toggle
  const [salonLoading, setSalonLoading] = useState(true);
  const [prosLoading, setProsLoading] = useState(true);

  // Track if this is the very first load (show full skeleton) or a toggle/refresh
  const isFirstLoad = useRef(true);

  const fetchCategoryData = async (category, lat, lng) => {
    setSalonLoading(true);
    setProsLoading(true);
    try {
      await Promise.all([
        dispatch(getAllCategories(category)),
        dispatch(fetchHomeSalonsBySalonCategory({ category, lat, lng })),
        dispatch(fetchHomeIndependentprosByCategory({ category, lat, lng })),
        dispatch(fetchUnisexSalons({ lat, lng })),
      ]);
    } finally {
      setSalonLoading(false);
      setProsLoading(false);
      isFirstLoad.current = false;
    }
  };

  useEffect(() => {
    if (selectedCategory && location?.latitude && location?.longitude) {
      fetchCategoryData(selectedCategory, location.latitude, location.longitude);
    }
  }, [selectedCategory, location]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategoryData(
      selectedCategory,
      location?.latitude,
      location?.longitude,
    );
    setRefreshing(false);
  };

  const handleCategorySelect = category => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
  };

  // Only show full skeleton on very first load
  if (isFirstLoad.current && salonLoading) {
    const SkeletonLoadingScreen =
      require('./SkeletonLoadingScreen').default;
    return <SkeletonLoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-teal-600" edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#156778" />

      <View className="flex-1 bg-neutral-white">
        <HomeHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {/* 0 — Book at Home Banner */}
          <BookAtHomeBanner
            onPress={() => navigation.navigate('ProfessionalsListScreen')}
          />

          {/* 1 — Gender Toggle (sticky) */}
          <GenderToggle
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />

          {/* 2 — Service Categories (static, no loading state needed) */}
          <ServiceCategoriesSection
            categories={SERVICE_CATEGORIES}
            onViewAll={() => navigation.navigate('AllCategoriesScreen')}
            onCategoryPress={category =>
              navigation.navigate('CategoryServicesScreen', {
                categoryId: category.id,
                categoryName: category.name,
              })
            }
          />

          {/* 3 — Salon List (skeleton on toggle) */}
          {salonLoading ? (
            <SalonListSkeleton selectedCategory={selectedCategory} />
          ) : (
            <SalonListSection
              salonList={salonList}
              selectedCategory={selectedCategory}
              onViewAll={() =>
                navigation.navigate('AllSalonListScreen', {
                  category: selectedCategory,
                  lat: location?.latitude,
                  lng: location?.longitude,
                })
              }
              onSalonPress={salonId =>
                navigation.navigate('ShopDetailsFull', { salonId: 'sample-id' })
              }
            />
          )}

          {/* 4 — Service At Home (skeleton on toggle) */}
          {prosLoading ? (
            <SkeletonLoadingScreen />
          ) : (
            <ServiceAtHomeSection
              independentProsList={independentProsList}
              onViewAll={() => navigation.navigate('ProfessionalsListScreen')}
              onProPress={id =>
                navigation.navigate('ProfessionalDetailScreen', { id })
              }
            />
          )}

          {/* 5 — Nearby Offers */}
          <NearbySection
            title="Nearby Offers"
            data={[]}
            onViewAll={() => navigation.navigate('OffersScreen')}
            onCardPress={() =>
              navigation.navigate('ShopDetailsFull', { salonId: 'sample-id' })
            }
          />

          {/* Footer */}
          <GlownifyFooter />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}