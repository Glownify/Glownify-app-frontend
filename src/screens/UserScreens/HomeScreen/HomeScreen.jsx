import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHomeSalonsBySalonCategory,
  fetchHomeIndependentprosByCategory,
  getAllCategories,
  fetchUnisexSalons,
} from '../../../redux/slices/userSlice';
import HomeHeader from '../../../components/HomeHeader';
import SectionHeader from '../../../components/SectionHeader';
import SalonCard from './SalonCard';
import NearbyOfferCard from './NearbyOfferCard';
import UnisexCard from './UnisexCard';
import ServiceAtHomeCard from './ServiceAtHomeCard';
import PromoBanner, { PROMO_BANNER_DURATION } from './PromoBanner';
import PromoBanner2, { PROMO_BANNER_2_DURATION } from './PromoBanner2';
import SkeletonLoadingScreen from './SkeletonLoadingScreen';
import { LocationContext } from '../../../components/LocationProvider';
const { width } = Dimensions.get('window');

// TODO: Replace these with actual icon components or images from your assets
// These are placeholder icon names - you'll need to use actual icons from react-native-vector-icons or your asset folder
const categoryIcons = {
  hairs: 'scissors', // Use actual icon or image
  spa: 'spa',
  nails: 'hand',
  coloring: 'palette',
  wax: 'candle',
  makeup: 'makeup-brush',
  makeUp: 'face',
  something: 'dots-horizontal',
};

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { location } = useContext(LocationContext);
  const user = useSelector(state => state.auth.user);
  const {
    loading,
    homeSalonsBySalonCategory,
    homeIndependentProsByCategory,
    unisexSalons,
    categories,
  } = useSelector(state => state.user);

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

  // TODO: Replace with actual category data from API
  const serviceCategories = [
    { id: 1, name: 'Hairs', icon: 'hairs' },
    { id: 2, name: 'Spa', icon: 'spa' },
    { id: 3, name: 'Nails', icon: 'nails' },
    { id: 4, name: 'Coloring', icon: 'coloring' },
    { id: 5, name: 'Wax', icon: 'wax' },
    { id: 6, name: 'Makeup', icon: 'makeup' },
    { id: 7, name: 'Make Up', icon: 'makeUp' },
    { id: 8, name: 'Something', icon: 'something' },
  ];

  const womenImage = require('../../../assets/men-women/woman.png');
  const menImage = require('../../../assets/men-women/men.png');

  const handleSelectSalonCategory = category => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory && location?.latitude && location?.longitude) {
      const lat = location.latitude;
      const lng = location.longitude;
      dispatch(getAllCategories(selectedCategory));
      dispatch(
        fetchHomeSalonsBySalonCategory({
          category: selectedCategory,
          lat,
          lng,
        }),
      );
      dispatch(
        fetchHomeIndependentprosByCategory({
          category: selectedCategory,
          lat,
          lng,
        }),
      );
      dispatch(fetchUnisexSalons({ lat, lng }));
    }
  }, [selectedCategory, dispatch, location]);

  const onRefresh = async () => {
    setRefreshing(true);
    const lat = location?.latitude;
    const lng = location?.longitude;
    dispatch(getAllCategories(selectedCategory));
    dispatch(
      fetchHomeSalonsBySalonCategory({
        category: selectedCategory,
        lat,
        lng,
      }),
    );
    dispatch(
      fetchHomeIndependentprosByCategory({
        category: selectedCategory,
        lat,
        lng,
      }),
    );
    dispatch(fetchUnisexSalons({ lat, lng }));
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <SkeletonLoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#156778]" edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#156778" />
      <View className="flex-1 bg-white">
        {/* Header */}
        <HomeHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Book at Home Banner */}
          <View className="mx-4 mt-4 mb-4 bg-gradient-to-r from-purple-100 to-blue-50 rounded-2xl p-5 flex-row items-center">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                {/* TODO: Replace with actual beautician icon */}
                <View className="w-10 h-10 bg-purple-200 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">💇</Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-600">
                    Step 1 Choose Your
                  </Text>
                  <Text className="text-sm font-semibold text-gray-800">
                    Beautician
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-500">
                Browse available beauticians and pick your favorite one.
              </Text>
            </View>
            {/* TODO: Replace with actual phone mockup image */}
            <View className="w-32 h-40 bg-gray-200/50 rounded-3xl items-center justify-center ml-3">
              <Text className="text-gray-400 text-xs text-center px-2">
                Book a Beautician
              </Text>
            </View>
          </View>

          {/* Gender Category Toggle */}
          <View className="bg-white py-4">
            <View className="flex-row mx-4 rounded-full bg-[#E8F6F8] p-1.5 border-2 border-[#156778]">
              <TouchableOpacity
                className={`flex-1 flex-row items-center justify-center py-2.5 px-4 rounded-full ${
                  selectedCategory === 'women' ? 'bg-[#156778]' : ''
                }`}
                onPress={() => handleSelectSalonCategory('women')}
                activeOpacity={0.8}
              >
                {/* TODO: Replace with actual woman icon */}
                <View className="w-8 h-8 mr-2">
                  <Text className="text-2xl">👩</Text>
                </View>
                <Text
                  className={`text-base font-semibold ${
                    selectedCategory === 'women'
                      ? 'text-white'
                      : 'text-[#156778]'
                  }`}
                >
                  Women
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 flex-row items-center justify-center py-2.5 px-4 rounded-full ${
                  selectedCategory === 'men' ? 'bg-[#156778]' : ''
                }`}
                onPress={() => handleSelectSalonCategory('men')}
                activeOpacity={0.8}
              >
                {/* TODO: Replace with actual man icon */}
                <View className="w-8 h-8 mr-2">
                  <Text className="text-2xl">👨</Text>
                </View>
                <Text
                  className={`text-base font-semibold ${
                    selectedCategory === 'men' ? 'text-white' : 'text-[#156778]'
                  }`}
                >
                  Men
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Categories Section */}
          <View className="mb-5">
            <View className="px-4 flex-row items-center justify-between mb-3">
              <Text className="text-base font-semibold text-gray-800">
                What do you want to get?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AllCategoriesScreen')}
              >
                <Text className="text-sm text-[#14b8a6] font-medium">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            {/* Categories Horizontal Scroll */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              {serviceCategories.map((category, index) => (
                <TouchableOpacity
                  key={category.id}
                  className="items-center mr-6"
                  onPress={() =>
                    navigation.navigate('CategoryServicesScreen', {
                      categoryId: category.id,
                      categoryName: category.name,
                    })
                  }
                >
                  {/* TODO: Replace with actual category icons/images */}
                  <View className="w-16 h-16 bg-[#E8F6F8] rounded-full items-center justify-center mb-2">
                    <Text className="text-3xl">
                      {index === 0
                        ? '💇'
                        : index === 1
                        ? '🧖'
                        : index === 2
                        ? '💅'
                        : index === 3
                        ? '🎨'
                        : index === 4
                        ? '🕯️'
                        : index === 5
                        ? '💄'
                        : index === 6
                        ? '✨'
                        : '⭐'}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-700 text-center">
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Salon Cards Section - WOMEN */}
          {salonList.length > 0 && (
            <View className="mb-5">
              <View className="px-4 flex-row items-center justify-between mb-3">
                <Text className="text-base font-semibold text-gray-800">
                  {selectedCategory.toUpperCase()}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AllSalonListScreen', {
                      category: selectedCategory,
                      lat: location?.latitude,
                      lng: location?.longitude,
                    })
                  }
                >
                  <Text className="text-sm text-[#14b8a6] font-medium">
                    View all
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-4"
              >
                {salonList.map((salon, index) => (
                  <TouchableOpacity
                    key={salon._id}
                    className="mr-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                    style={{ width: width * 0.6 }}
                    onPress={() =>
                      navigation.navigate('SalonDetailScreen', {
                        salonId: salon._id,
                      })
                    }
                  >
                    {/* TODO: Replace with actual salon image - dynamic data from API */}
                    <View className="relative">
                      <View className="w-full h-40 bg-gray-200 items-center justify-center">
                        <Text className="text-gray-400 text-xs">
                          Salon Image
                        </Text>
                      </View>
                      {/* Favorite Icon */}
                      <TouchableOpacity className="absolute top-2 right-2 w-9 h-9 bg-white rounded-full items-center justify-center">
                        <Text className="text-red-400 text-lg">🤍</Text>
                      </TouchableOpacity>
                      {/* Category Badge */}
                      <View className="absolute top-2 left-2 bg-[#156778] px-3 py-1 rounded-full">
                        <Text className="text-white text-xs font-medium">
                          {selectedCategory.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View className="p-3">
                      <Text
                        className="text-sm font-semibold text-gray-800 mb-1"
                        numberOfLines={1}
                      >
                        {salon.name || 'Evita beauty Parlour'}
                      </Text>
                      <Text
                        className="text-xs text-gray-500 mb-2"
                        numberOfLines={1}
                      >
                        {salon.category || 'No categories available'}
                      </Text>
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <Text className="text-xs text-gray-600 mr-1">📍</Text>
                          <Text className="text-xs text-gray-600">
                            {salon.distance
                              ? `${salon.distance} km`
                              : '321.7 km'}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Text className="text-xs text-amber-500 mr-1">
                            ⭐
                          </Text>
                          <Text className="text-xs font-medium text-gray-700">
                            {salon.rating || '4.8'} ({salon.reviews || '200'})
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Service At Home Section */}
          {independentProsList.length > 0 && (
            <View className="mb-5">
              <View className="px-4 flex-row items-center justify-between mb-3">
                <Text className="text-base font-semibold text-gray-800">
                  Service At Home
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfessionalsListScreen')}
                >
                  <Text className="text-sm text-[#14b8a6] font-medium">
                    View all
                  </Text>
                </TouchableOpacity>
              </View>

              {independentProsList.slice(0, 3).map(pro => (
                <TouchableOpacity
                  key={pro._id}
                  className="mx-4 mb-3 bg-white rounded-2xl p-4 flex-row items-center border border-gray-100 shadow-sm"
                  onPress={() =>
                    navigation.navigate('ProfessionalDetailScreen', {
                      id: pro._id,
                    })
                  }
                >
                  {/* TODO: Replace with actual professional image - dynamic data from API */}
                  <View className="w-16 h-16 bg-[#E8F6F8] rounded-full items-center justify-center mr-4">
                    <Text className="text-3xl">👤</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800 mb-1">
                      {pro.name || 'Abhishek'}
                    </Text>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-xs text-gray-500 mr-3">
                        📍 {pro.availability || 'Not available'}
                      </Text>
                    </View>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-xs text-gray-500 mr-3">
                        💼 {pro.experience || '4 yrs Exp'}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-xs text-gray-500 mr-3">
                        ✂️ {pro.services || 'Hairs'}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        👤 {pro.gender || 'MALE'}
                      </Text>
                    </View>
                  </View>

                  {/* Rating Badge */}
                  <View className="bg-[#10b981] px-2.5 py-1.5 rounded-lg absolute top-4 right-4">
                    <View className="flex-row items-center">
                      <Text className="text-white text-xs font-bold mr-0.5">
                        {pro.rating || '4.5'}
                      </Text>
                      <Text className="text-white text-xs">⭐</Text>
                    </View>
                  </View>

                  {/* Arrow */}
                  <Text className="text-gray-400 text-lg ml-2">›</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Nearby Salons */}
          <View className="mb-5">
            <View className="px-4 flex-row items-center justify-between mb-3">
              <Text className="text-base font-semibold text-gray-800">
                Nearby Salons
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('OffersScreen')}
              >
                <Text className="text-sm text-[#14b8a6] font-medium">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="mx-4 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              onPress={() =>
                navigation.navigate('ShopDetailsFull', { salonId: 'sample-id' })
              }
            >
              <View className="relative">
                {/* TODO: Replace with actual offer image - dynamic data from API */}
                <View className="w-full h-48 bg-gray-200 items-center justify-center">
                  <Text className="text-gray-400 text-xs">
                    Salon Offer Image
                  </Text>
                </View>

                {/* Discount Badge */}
                <View className="absolute bottom-3 left-3 bg-red-500 px-3 py-1.5 rounded-lg">
                  <Text className="text-white text-xs font-bold">15% Off</Text>
                </View>

                {/* Favorite Icon */}
                <TouchableOpacity className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full items-center justify-center">
                  <Text className="text-red-400 text-lg">🤍</Text>
                </TouchableOpacity>
              </View>

              <View className="p-4">
                <View className="bg-[#E8F6F8] px-2 py-1 rounded self-start mb-2">
                  <Text className="text-[#156778] text-xs font-medium">
                    HAIR • FACIAL
                  </Text>
                </View>
                <Text className="text-base font-semibold text-gray-800 mb-1">
                  Maroon's Luxury Salon
                </Text>
                <Text className="text-xs text-gray-500 mb-2">
                  Kukatpally, Hyderabad
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center mr-3">
                    <Text className="text-xs text-amber-500 mr-1">⭐</Text>
                    <Text className="text-xs font-medium text-gray-700">
                      4.8 (3.7k)
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Nearby Offers */}
          <View className="mb-5">
            <View className="px-4 flex-row items-center justify-between mb-3">
              <Text className="text-base font-semibold text-gray-800">
                Nearby Offers
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('OffersScreen')}
              >
                <Text className="text-sm text-[#14b8a6] font-medium">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="mx-4 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              onPress={() =>
                navigation.navigate('ShopDetailsFull', { salonId: 'sample-id' })
              }
            >
              <View className="relative">
                {/* TODO: Replace with actual offer image - dynamic data from API */}
                <View className="w-full h-48 bg-gray-200 items-center justify-center">
                  <Text className="text-gray-400 text-xs">
                    Salon Offer Image
                  </Text>
                </View>

                {/* Discount Badge */}
                <View className="absolute bottom-3 left-3 bg-red-500 px-3 py-1.5 rounded-lg">
                  <Text className="text-white text-xs font-bold">15% Off</Text>
                </View>

                {/* Favorite Icon */}
                <TouchableOpacity className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full items-center justify-center">
                  <Text className="text-red-400 text-lg">🤍</Text>
                </TouchableOpacity>
              </View>

              <View className="p-4">
                <View className="bg-[#E8F6F8] px-2 py-1 rounded self-start mb-2">
                  <Text className="text-[#156778] text-xs font-medium">
                    HAIR • FACIAL
                  </Text>
                </View>
                <Text className="text-base font-semibold text-gray-800 mb-1">
                  Maroon's Luxury Salon
                </Text>
                <Text className="text-xs text-gray-500 mb-2">
                  Kukatpally, Hyderabad
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center mr-3">
                    <Text className="text-xs text-amber-500 mr-1">⭐</Text>
                    <Text className="text-xs font-medium text-gray-700">
                      4.8 (3.7k)
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Nearby Offers */}
          <View className="mb-5">
            <View className="px-4 flex-row items-center justify-between mb-3">
              <Text className="text-base font-semibold text-gray-800">
                Nearby Offers
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('OffersScreen')}
              >
                <Text className="text-sm text-[#14b8a6] font-medium">
                  View all
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="mx-4 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              onPress={() =>
                navigation.navigate('ShopDetailsFull', { salonId: 'sample-id' })
              }
            >
              <View className="relative">
                {/* TODO: Replace with actual offer image - dynamic data from API */}
                <View className="w-full h-48 bg-gray-200 items-center justify-center">
                  <Text className="text-gray-400 text-xs">
                    Salon Offer Image
                  </Text>
                </View>

                {/* Discount Badge */}
                <View className="absolute bottom-3 left-3 bg-red-500 px-3 py-1.5 rounded-lg">
                  <Text className="text-white text-xs font-bold">15% Off</Text>
                </View>

                {/* Favorite Icon */}
                <TouchableOpacity className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full items-center justify-center">
                  <Text className="text-red-400 text-lg">🤍</Text>
                </TouchableOpacity>
              </View>

              <View className="p-4">
                <View className="bg-[#E8F6F8] px-2 py-1 rounded self-start mb-2">
                  <Text className="text-[#156778] text-xs font-medium">
                    HAIR • FACIAL
                  </Text>
                </View>
                <Text className="text-base font-semibold text-gray-800 mb-1">
                  Maroon's Luxury Salon
                </Text>
                <Text className="text-xs text-gray-500 mb-2">
                  Kukatpally, Hyderabad
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-row items-center mr-3">
                    <Text className="text-xs text-amber-500 mr-1">⭐</Text>
                    <Text className="text-xs font-medium text-gray-700">
                      4.8 (3.7k)
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Glownify Logo Footer */}
          <View className="items-center opacity-50 pb-5 pt-5">
            {/* TODO: Replace with actual Glownify logo */}
            <View className="h-20 w-24 bg-gray-200 rounded items-center justify-center">
              <Text className="text-gray-400 text-xs">Glownify Logo</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
