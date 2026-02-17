import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import ShopDetailsSkeleton from './ShopDetailsSkeleton';
import { fetchSalonById, fetchServiceItemsByCategory } from '../../../redux/slices/userSlice';
import { addToCart } from '../../../utils/cartStorage';

const { width } = Dimensions.get('window');

// ============================================================
// DUMMY DATA - Replace with API response
// ============================================================
const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
  'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800',
];

const DUMMY_SERVICE_CATEGORIES = [
  { 
    id: '1', 
    name: 'Hair', 
    icon: 'cut-outline',
    // TODO: Replace with category.image from API
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200'
  },
  { 
    id: '2', 
    name: 'Facial', 
    icon: 'flower-outline',
    // TODO: Replace with category.image from API
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200'
  },
  { 
    id: '3', 
    name: 'Wax', 
    icon: 'water-outline',
    // TODO: Replace with category.image from API
    image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=200'
  },
  { 
    id: '4', 
    name: 'Makeup', 
    icon: 'brush-outline',
    // TODO: Replace with category.image from API
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=200'
  },
];

const DUMMY_REVIEWS = [
  {
    id: '1',
    userName: 'Pooja S',
    // TODO: Replace with review.userAvatar from API
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment: 'Great service and very clean!',
  },
  {
    id: '2',
    userName: 'Amit K',
    // TODO: Replace with review.userAvatar from API
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    comment: 'Loved the facial, will book again!',
  },
];

export default function ShopDetailsScreen({ navigation, route }) {
  const { salonId } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedServiceMode, setSelectedServiceMode] = useState('salon');
  const [modeModalVisible, setModeModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const dispatch = useDispatch();
  const { salonDetails: salonData, serviceItemsByCategory, loading } = useSelector((state) => state.user);
  const { user } = useSelector(state => state.auth);
  const userId = user?._id || 'guest';

  useEffect(() => {
    dispatch(fetchSalonById(salonId));
  }, [dispatch, salonId]);

  const handleAddService = async (service) => {
    if (service.serviceMode === 'both') {
      setSelectedService(service);
      setModeModalVisible(true);
      return;
    }
    await addToCart(dispatch, userId, { _id: salonData._id, name: salonData.shopName }, service, service.serviceMode);
  };

  const confirmModeSelection = async () => {
    if (!selectedMode || !selectedService) return;
    await addToCart(dispatch, userId, { _id: salonData._id, name: salonData.shopName }, selectedService, selectedMode);
    setModeModalVisible(false);
    setSelectedMode(null);
    setSelectedService(null);
  };

  if (!salonData && loading) return <ShopDetailsSkeleton />;

  // ============================================================
  // API DATA MAPPING - Replace dummy data with real API response
  // ============================================================
  const salonImages = salonData?.galleryImages || DUMMY_IMAGES; // TODO: Use salonData.galleryImages from API
  const salonName = salonData?.shopName || 'Glamour Salon & Spa'; // TODO: Use salonData.shopName from API
  const salonRating = salonData?.rating || 4.5; // TODO: Use salonData.rating from API
  const reviewCount = salonData?.reviewCount || 120; // TODO: Use salonData.reviewCount from API
  const distance = salonData?.distance || '2.3 km away'; // TODO: Use salonData.distance from API
  const salonAddress = salonData?.location?.address || 'Gomti Nagar, Lucknow'; // TODO: Use salonData.location.address from API
  const aboutText = salonData?.about || '5+ Years Experience • Premium Products • Hygienic Environment'; // TODO: Use salonData.about from API
  const serviceCategories = salonData?.serviceCategories || DUMMY_SERVICE_CATEGORIES; // TODO: Use salonData.serviceCategories from API
  const reviews = salonData?.reviews || DUMMY_REVIEWS; // TODO: Use salonData.reviews from API

  return (
    <SafeAreaView className="flex-1 bg-primary-50" edges={['top']}>
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        
        {/* ============================================================
            HEADER IMAGE WITH OVERLAY
            ============================================================ */}
        <View className="relative">
          <View className="h-64 rounded-card overflow-hidden mx-md mt-md">
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => setCurrentImageIndex(Math.round(e.nativeEvent.contentOffset.x / (width - 32)))}
              scrollEventThrottle={16}
            >
              {/* TODO: Map through salonData.galleryImages from API */}
              {salonImages.map((image, index) => (
                <Image 
                  key={index} 
                  source={{ uri: image }} 
                  style={{ width: width - 32, height: 256 }} 
                  resizeMode="cover" 
                />
              ))}
            </ScrollView>

            {/* Top Buttons */}
            <View className="absolute top-md left-md right-md flex-row justify-between">
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                className="w-40px h-40px rounded-avatar bg-neutral-white/90 items-center justify-center"
              >
                <Icon name="chevron-back" size={24} color="#1F2937" />
              </TouchableOpacity>
              <TouchableOpacity className="w-40px h-40px rounded-avatar bg-neutral-white/90 items-center justify-center">
                <Icon name="heart" size={22} color="#F472B6" />
              </TouchableOpacity>
            </View>

            {/* Bottom Info Overlay */}
            <View className="absolute bottom-md left-md right-md">
              <View className="flex-row items-center justify-between flex-wrap gap-2">
                {/* Rating Badge - TODO: Use salonData.rating and reviewCount from API */}
                <View className="flex-row items-center bg-neutral-black/40 rounded-button px-3 py-1.5">
                  <Icon name="star" size={16} color="#FBBF24" />
                  <Text className="text-neutral-white font-semibold ml-1 text-sm">
                    {salonRating} ({reviewCount} Reviews)
                  </Text>
                </View>
                
                <View className="flex-row gap-2">
                  {/* Distance Badge - TODO: Use salonData.distance from API */}
                  <View className="flex-row items-center bg-neutral-black/40 rounded-button px-3 py-1.5">
                    <Icon name="location" size={16} color="#fff" />
                    <Text className="text-neutral-white ml-1 text-sm">{distance}</Text>
                  </View>
                  
                  {/* Map Button */}
                  <TouchableOpacity className="flex-row items-center bg-neutral-black/40 rounded-button px-3 py-1.5">
                    <Icon name="map" size={16} color="#fff" />
                    <Text className="text-neutral-white ml-1 text-sm">View on Map</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Image Indicators */}
            <View className="absolute bottom-20 left-0 right-0 flex-row justify-center">
              {salonImages.map((_, index) => (
                <View
                  key={index}
                  className={`h-1.5 rounded-button mx-1 ${
                    currentImageIndex === index ? 'w-6 bg-neutral-white' : 'w-1.5 bg-neutral-white/50'
                  }`}
                />
              ))}
            </View>
          </View>

          {/* Salon Name - TODO: Use salonData.shopName from API */}
          <Text className="text-2xl font-bold text-neutral-900 text-center mt-md px-md">
            {salonName}
          </Text>
        </View>

        {/* ============================================================
            LOCATION CARD
            ============================================================ */}
        {/* TODO: Use salonData.location.address from API */}
        <View className="mx-md mt-md bg-primary-100 rounded-card p-md">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Icon name="location" size={20} color="#EC4899" />
              <View className="ml-2 flex-1">
                <Text className="text-neutral-900 font-medium">
                  You are booking from: {salonAddress}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-secondary-pink font-semibold ml-2">Edit</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-neutral-500 text-sm mt-2">
            For home service, professional will visit this address.
          </Text>
        </View>

        {/* ============================================================
            ABOUT SECTION
            ============================================================ */}
        {/* TODO: Use salonData.about from API */}
        <View className="mx-md mt-md bg-neutral-white rounded-card p-md">
          <TouchableOpacity 
            className="flex-row justify-between items-center" 
            onPress={() => setShowAbout(!showAbout)}
          >
            <Text className="text-lg font-bold text-neutral-900">About Us</Text>
            <Icon name={showAbout ? "chevron-up" : "chevron-down"} size={20} color="#6B7280" />
          </TouchableOpacity>
          {showAbout && (
            <View className="mt-3">
              <Text className="text-neutral-500 leading-md">
                {aboutText}
              </Text>
            </View>
          )}
        </View>

        {/* ============================================================
            SERVICE MODE SELECTION
            ============================================================ */}
        <View className="mx-md mt-md flex-row gap-3">
          <TouchableOpacity 
            className={`flex-1 py-md rounded-button ${
              selectedServiceMode === 'salon' ? 'bg-primary-400' : 'bg-neutral-white border border-neutral-200'
            }`}
            onPress={() => setSelectedServiceMode('salon')}
          >
            <Text className={`text-center font-semibold text-base ${
              selectedServiceMode === 'salon' ? 'text-neutral-white' : 'text-neutral-700'
            }`}>
              Visit Salon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-md rounded-button ${
              selectedServiceMode === 'home' ? 'bg-primary-400' : 'bg-neutral-white border border-neutral-200'
            }`}
            onPress={() => setSelectedServiceMode('home')}
          >
            <Text className={`text-center font-semibold text-base ${
              selectedServiceMode === 'home' ? 'text-neutral-white' : 'text-neutral-700'
            }`}>
              Service at Home
            </Text>
          </TouchableOpacity>
        </View>

        {/* ============================================================
            OUR SERVICES SECTION
            ============================================================ */}
        <View className="mx-md mt-xl">
          <Text className="text-lg font-bold text-neutral-900 mb-md">Our Services</Text>
          
          {/* Service Category Icons */}
          {/* TODO: Map through salonData.serviceCategories from API */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-md">
            {serviceCategories.map((category, index) => (
              <TouchableOpacity key={category.id || index} className="items-center mr-md">
                {/* TODO: Replace with actual category image from API */}
                <View className="w-20 h-20 rounded-avatar bg-neutral-200 items-center justify-center mb-2 overflow-hidden">
                  {category.image ? (
                    <Image 
                      source={{ uri: category.image }} 
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Icon name={category.icon || 'cut-outline'} size={32} color="#6B7280" />
                  )}
                </View>
                <Text className="text-sm font-medium text-neutral-700">{category.name}</Text>
              </TouchableOpacity>
            ))}
            
            {/* More Option */}
            <TouchableOpacity className="items-center">
              <View className="w-20 h-20 rounded-avatar bg-neutral-200 items-center justify-center mb-2">
                <Icon name="ellipsis-horizontal" size={32} color="#6B7280" />
              </View>
              <Text className="text-sm font-medium text-neutral-700">More</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Promotional Banner */}
          {/* TODO: Make this dynamic based on salonData.promotions from API */}
          <View className="bg-primary-300 rounded-card p-md mb-md">
            <View className="flex-row items-center mb-2">
              <Icon name="sparkles" size={20} color="#fff" />
              <Text className="text-neutral-white font-bold text-lg ml-2">
                Services starting from ₹199
              </Text>
            </View>
            <Text className="text-neutral-white/90 text-sm mb-3">
              Hair • Facial • Makeup • Waxing
            </Text>
            {/* Progress bar */}
            <View className="h-2 bg-neutral-white/30 rounded-button overflow-hidden">
              <View className="h-full w-2/3 bg-primary-400 rounded-button" />
            </View>
          </View>
        </View>

        {/* ============================================================
            CUSTOMER REVIEWS SECTION
            ============================================================ */}
        {/* TODO: Use salonData.reviews from API */}
        <View className="mx-md mt-xl bg-neutral-white rounded-card p-md mb-md">
          <Text className="text-lg font-bold text-neutral-900 mb-md">Customer Reviews</Text>
          
          {/* Rating Summary */}
          {/* TODO: Use salonData.rating from API */}
          <View className="flex-row items-center mb-md">
            <Icon name="star" size={24} color="#FBBF24" />
            <Text className="text-2xl font-bold text-neutral-900 ml-2">{salonRating}</Text>
            <View className="flex-row ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon 
                  key={star} 
                  name={star <= Math.floor(salonRating) ? "star" : "star-outline"} 
                  size={16} 
                  color="#FBBF24" 
                />
              ))}
            </View>
          </View>
          
          {/* Individual Reviews */}
          {/* TODO: Map through salonData.reviews from API */}
          {reviews.slice(0, 2).map((review) => (
            <TouchableOpacity 
              key={review.id} 
              className="flex-row items-center py-3 border-b border-neutral-100"
            >
              {/* User Avatar - TODO: Use review.userAvatar from API */}
              <View className="w-10 h-10 rounded-avatar bg-neutral-200 mr-3 overflow-hidden">
                {review.userAvatar ? (
                  <Image 
                    source={{ uri: review.userAvatar }} 
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center">
                    <Icon name="person" size={20} color="#9CA3AF" />
                  </View>
                )}
              </View>
              
              <View className="flex-1">
                <Text className="font-semibold text-neutral-900">{review.userName}:</Text>
                <Text className="text-neutral-500 text-sm" numberOfLines={1}>
                  "{review.comment}"
                </Text>
              </View>

              <Icon name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* ============================================================
          FIXED BOTTOM BUTTON
          ============================================================ */}
      <View className="absolute bottom-0 left-0 right-0 bg-neutral-white px-md py-3 border-t border-neutral-100">
        <TouchableOpacity 
          className="bg-neutral-300 py-md rounded-button items-center"
          onPress={() => navigation.navigate('Booking')}
        >
          <Text className="text-neutral-700 font-semibold text-base">
            Select Service to Continue
          </Text>
        </TouchableOpacity>
      </View>

      {/* ============================================================
          SERVICE MODE SELECTION MODAL
          ============================================================ */}
      {modeModalVisible && (
        <TouchableWithoutFeedback 
          onPress={() => { 
            setModeModalVisible(false); 
            setSelectedMode(null); 
            setSelectedService(null); 
          }}
        >
          <View className="absolute inset-0 bg-neutral-black/40 justify-center items-center">
            <TouchableWithoutFeedback>
              <View className="w-11/12 max-w-md bg-neutral-white rounded-card p-xl">
                <TouchableOpacity
                  className="absolute top-3 right-3 z-10"
                  onPress={() => { 
                    setModeModalVisible(false); 
                    setSelectedMode(null); 
                    setSelectedService(null); 
                  }}
                >
                  <Icon name="close" size={22} color="#6B7280" />
                </TouchableOpacity>

                <Text className="text-xl font-bold text-center mb-xl">
                  Select Service Mode
                </Text>

                <TouchableOpacity
                  className={`flex-row items-center p-md rounded-input border mb-3 ${
                    selectedMode === 'salon' 
                      ? 'bg-teal-50 border-teal-600' 
                      : 'border-neutral-200'
                  }`}
                  onPress={() => setSelectedMode('salon')}
                >
                  <Icon name="cut-outline" size={20} color="#0d9488" />
                  <Text className="ml-3 text-base text-neutral-900">At Salon</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-row items-center p-md rounded-input border mb-md ${
                    selectedMode === 'home' 
                      ? 'bg-teal-50 border-teal-600' 
                      : 'border-neutral-200'
                  }`}
                  onPress={() => setSelectedMode('home')}
                >
                  <Icon name="home-outline" size={20} color="#0d9488" />
                  <Text className="ml-3 text-base text-neutral-900">At Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`bg-teal-700 py-md rounded-button items-center ${
                    !selectedMode && 'opacity-50'
                  }`}
                  disabled={!selectedMode}
                  onPress={confirmModeSelection}
                >
                  <Text className="text-neutral-white font-semibold text-base">Confirm</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}