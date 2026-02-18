import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import ShopDetailsSkeleton from './ShopDetailsSkeleton';
import {
  fetchSalonById,
  fetchServiceItemsByCategory,
} from '../../../redux/slices/userSlice';
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

// TODO: Replace with salonData.serviceCategories from API
const DUMMY_SERVICE_CATEGORIES = [
  { id: '1', name: 'Hair', icon: 'cut-outline' },
  { id: '2', name: 'Facial', icon: 'flower-outline' },
  { id: '3', name: 'Waxing', icon: 'water-outline' },
  { id: '4', name: 'Makeup', icon: 'brush-outline' },
];

// TODO: Replace with serviceItemsByCategory from API (keyed by category id)
const DUMMY_SERVICES = {
  '1': [
    {
      _id: 's1',
      name: 'Haircut & Styling',
      duration: '30 mins',
      salonPrice: 500,
      homePrice: 600,
      serviceMode: 'both',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200',
      badge: null,
    },
    {
      _id: 's2',
      name: 'Hair Spa',
      duration: '40 mins',
      salonPrice: 700,
      homePrice: 850,
      serviceMode: 'both',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200',
      badge: null,
    },
    {
      _id: 's3',
      name: 'Hair Coloring',
      duration: '1 hour',
      salonPrice: 1200,
      homePrice: null,
      serviceMode: 'salon',
      image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=200',
      badge: 'Opt.',
    },
  ],
  '2': [
    {
      _id: 's4',
      name: 'Facial Treatment',
      duration: '45 mins',
      salonPrice: 800,
      homePrice: 950,
      serviceMode: 'both',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200',
      badge: null,
    },
    {
      _id: 's5',
      name: 'Clean Up',
      duration: '30 mins',
      salonPrice: 500,
      homePrice: 600,
      serviceMode: 'both',
      image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=200',
      badge: '*STEALDEAL',
    },
  ],
  '3': [
    {
      _id: 's6',
      name: 'Full Arms Waxing',
      duration: '20 mins',
      salonPrice: 300,
      homePrice: 400,
      serviceMode: 'both',
      image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=200',
      badge: null,
    },
  ],
  '4': [
    {
      _id: 's7',
      name: 'Bridal Makeup',
      duration: '2 hours',
      salonPrice: 3500,
      homePrice: 4000,
      serviceMode: 'both',
      image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=200',
      badge: null,
    },
  ],
};

const DUMMY_REVIEWS = [
  {
    id: '1',
    userName: 'Pooja S',
    userAvatar: 'https://i.pravatar.cc/150?img=1', // TODO: Replace with review.userAvatar from API
    rating: 5,
    comment: 'Great service and very clean!',
  },
  {
    id: '2',
    userName: 'Amit K',
    userAvatar: 'https://i.pravatar.cc/150?img=2', // TODO: Replace with review.userAvatar from API
    rating: 5,
    comment: 'Loved the facial, will book again!',
  },
];

// ============================================================
// SUB-COMPONENTS
// ============================================================

/** Booking mode toggle (Salon at Home / Visit Salon) */
function BookingModeToggle({ mode, onChange }) {
  const translateX = useRef(new Animated.Value(mode === 'home' ? 0 : 1)).current;

  const handlePress = next => {
    Animated.spring(translateX, {
      toValue: next === 'home' ? 0 : 1,
      useNativeDriver: false,
    }).start();
    onChange(next);
  };

  return (
    <View className="mx-md mt-md">
      <View className="flex-row bg-white rounded-card p-2">
        <TouchableOpacity
          className="flex-1 py-2 items-center rounded-full"
          style={mode === 'home' ? styles.activeTab : {}}
          onPress={() => handlePress('home')}
        >
          <Text
            className={`text-sm font-semibold ${
              mode === 'home' ? 'text-neutral-white' : 'text-neutral-500'
            }`}
          >
            Salon at Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 py-2 items-center rounded-full"
          style={mode === 'salon' ? styles.activeTab : {}}
          onPress={() => handlePress('salon')}
        >
          <Text
            className={`text-sm font-semibold ${
              mode === 'salon' ? 'text-neutral-white' : 'text-neutral-500'
            }`}
          >
            Visit Salon
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** Card for each booking mode */
function BookingModeCard({ mode, onBook }) {
  // TODO: Replace card content (image, title, subtitle) with salonData from API
  const isHome = mode === 'home';
  return (
    <View className="flex-1 bg-neutral-white rounded-card overflow-hidden">
      <Image
        source={{
          uri: isHome
            ? 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'
            : 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
        }}
        style={{ width: '100%', height: 110 }}
        resizeMode="cover"
      />
      {/* {!isHome && (
        <View
          className="absolute top-2 right-2 bg-primary-400 rounded-button px-2 py-0.5"
        >
          <Text className="text-neutral-white text-xs font-bold">Glamour Salon</Text>
        </View>
      )} */}
      <View className="p-3 items-center">
        <Text className="text-primary-400 font-bold text-base">
          {isHome ? 'Salon at Home' : 'Visit Salon'}
        </Text>
        <Text className="text-neutral-500 text-xs text-center mt-1">
          {isHome
            ? 'Service at your doorstep'
            : 'Get pampered at our salon'}
        </Text>
        <TouchableOpacity
          className={`mt-3 w-full py-2 rounded-button items-center ${
            isHome ? 'bg-[#EA8491]' : 'bg-[#EA8491]'
          }`}
          onPress={() => onBook(mode)}
        >
          <Text className="text-neutral-white font-semibold text-sm">
            {isHome ? 'Book at Home' : 'Book at Salon'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** Service item row with Add button */
function ServiceItem({ service, selectedMode, cartItems, onAdd }) {
  const price =
    selectedMode === 'home' && service.homePrice != null
      ? service.homePrice
      : service.salonPrice;

  const isInCart = cartItems.some(c => c._id === service._id);
  const isUnavailable =
    selectedMode === 'home' && service.serviceMode === 'salon';

  return (
    <View
      className={`flex-row items-center py-3 border-b border-neutral-100 ${
        isUnavailable ? 'opacity-40' : ''
      }`}
    >
      {/* Service Image */}
      <View className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 mr-3">
        {service.image ? (
          <Image
            source={{ uri: service.image }}
            style={{ width: 56, height: 56 }}
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Icon name="cut-outline" size={24} color="#9CA3AF" />
          </View>
        )}
      </View>

      {/* Details */}
      <View className="flex-1">
        <View className="flex-row items-center flex-wrap">
          <Text className="text-neutral-900 font-semibold text-sm mr-2">
            {service.name}
          </Text>
          {service.badge && (
            <View className="bg-primary-100 rounded px-1.5 py-0.5">
              <Text className="text-primary-600 text-xs font-medium">
                {service.badge}
              </Text>
            </View>
          )}
        </View>
        <View className="flex-row items-center mt-1">
          <Icon name="time-outline" size={12} color="#9CA3AF" />
          <Text className="text-neutral-400 text-xs ml-1">{service.duration}</Text>
        </View>
        <Text className="text-neutral-900 font-bold text-sm mt-1">
          ₹{price.toLocaleString()}
        </Text>
      </View>

      {/* Add Button */}
      {!isUnavailable && (
        <TouchableOpacity
          className={`px-4 py-1.5 rounded-button border ${
            isInCart
              ? 'bg-primary-400 border-primary-400'
              : 'bg-neutral-white border-primary-400'
          }`}
          onPress={() => onAdd(service)}
        >
          <Text
            className={`text-sm font-semibold ${
              isInCart ? 'text-neutral-white' : 'text-primary-500'
            }`}
          >
            {isInCart ? 'Added' : '+ Add'}
          </Text>
        </TouchableOpacity>
      )}
      {isUnavailable && (
        <Text className="text-neutral-400 text-xs">Salon only</Text>
      )}
    </View>
  );
}

// ============================================================
// MAIN SCREEN
// ============================================================
export default function ShopDetailsScreen({ navigation, route }) {
  const { salonId } = route.params;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const [bookingMode, setBookingMode] = useState('home'); // 'home' | 'salon'
  const [activeCategory, setActiveCategory] = useState(null); // category id
  const [cartItems, setCartItems] = useState([]); // local cart state for UI

  // Mode selection modal for "both" services
  const [modeModalVisible, setModeModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const dispatch = useDispatch();
  const {
    salonDetails: salonData,
    serviceItemsByCategory,
    loading,
  } = useSelector(state => state.user);
  const { user } = useSelector(state => state.auth);
  const userId = user?._id || 'guest';

  useEffect(() => {
    dispatch(fetchSalonById(salonId));
  }, [dispatch, salonId]);

  // ============================================================
  // API DATA MAPPING - Replace dummy data with real API response
  // ============================================================
  const salonImages = salonData?.galleryImages || DUMMY_IMAGES;
  const salonName = salonData?.shopName || 'Glamour Beauty Salon';
  const salonTagline = salonData?.tagline || 'Elegant & Luxurious Beauty Services';
  const salonRating = salonData?.rating || 4.8;
  const reviewCount = salonData?.reviewCount || 120;
  const distance = salonData?.distance || '2.5 km away';
  const salonAddress = salonData?.location?.address || 'Anand Nagar, Pune';
  const openHours = salonData?.openHours || '10:00 AM – 8:00 PM';
  const aboutText =
    salonData?.about ||
    'Elegance, hygiene, professionalism & premium quality. Welcome to Glamour Beauty Salon, where beauty and luxury meet for an unforgettable experience.';
  const aboutBadges = salonData?.aboutBadges || [
    '100% Hygienic & Safe',
    'Experienced Beauty Experts Est. 2015',
  ];
  // TODO: Replace with salonData.serviceCategories from API
  const serviceCategories =
     DUMMY_SERVICE_CATEGORIES;
  // TODO: Replace with serviceItemsByCategory from API
  const servicesMap =  DUMMY_SERVICES;
  const reviews = salonData?.reviews || DUMMY_REVIEWS;

  // Set default active category
  useEffect(() => {
    if (serviceCategories.length > 0 && !activeCategory) {
      setActiveCategory(serviceCategories[0].id);
    }
  }, [serviceCategories]);

  // Fetch services when category changes
  useEffect(() => {
    if (activeCategory && salonId) {
      // TODO: dispatch(fetchServiceItemsByCategory({ salonId, categoryId: activeCategory }));
    }
  }, [activeCategory, salonId]);

  const currentServices = servicesMap[activeCategory] || [];
  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (bookingMode === 'home' && item.homePrice != null
        ? item.homePrice
        : item.salonPrice),
    0,
  );

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleAddService = async service => {
    const alreadyIn = cartItems.find(c => c._id === service._id);
    if (alreadyIn) {
      setCartItems(prev => prev.filter(c => c._id !== service._id));
      return;
    }

    // If mode is "both" and user hasn't locked a mode through the toggle, show modal
    if (service.serviceMode === 'both' && bookingMode === null) {
      setSelectedService(service);
      setModeModalVisible(true);
      return;
    }

    const mode =
      service.serviceMode === 'salon'
        ? 'salon'
        : service.serviceMode === 'home'
        ? 'home'
        : bookingMode;

    setCartItems(prev => [...prev, { ...service, chosenMode: mode }]);

    // TODO: Also persist to redux / backend
    // await addToCart(dispatch, userId, { _id: salonData._id, name: salonData.shopName }, service, mode);
  };

  const confirmModeSelection = () => {
    if (!selectedMode || !selectedService) return;
    setCartItems(prev => [
      ...prev,
      { ...selectedService, chosenMode: selectedMode },
    ]);
    setModeModalVisible(false);
    setSelectedMode(null);
    setSelectedService(null);
  };

  const handleBookMode = mode => {
    setBookingMode(mode);
    // Optionally scroll to services
  };

  if (!salonData && loading) return <ShopDetailsSkeleton />;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <SafeAreaView className="flex-1 bg-[#F9EFEE]" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ============================================================
            HEADER IMAGE CAROUSEL
        ============================================================ */}
        <View className="relative">
          <View className="h-64 overflow-hidden mx-md mt-md rounded-card">
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={e =>
                setCurrentImageIndex(
                  Math.round(e.nativeEvent.contentOffset.x / (width - 32)),
                )
              }
              scrollEventThrottle={16}
            >
              {/* TODO: Use salonData.galleryImages from API */}
              {salonImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{ width: width - 32, height: 256 }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            {/* Back & Favourite */}
            <View className="absolute top-md left-md right-md flex-row justify-between">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="w-10 h-10 rounded-avatar bg-neutral-white/90 items-center justify-center"
              >
                <Icon name="chevron-back" size={24} color="#1F2937" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 rounded-avatar bg-neutral-white/90 items-center justify-center">
                <Icon name="heart" size={22} color="#ec4899" />
              </TouchableOpacity>
            </View>

            {/* Rating & Distance overlay */}
            <View className="absolute bottom-md left-md right-md flex-row items-center justify-between flex-wrap gap-2">
              <View className="flex-row items-center bg-neutral-black/50 rounded-button px-3 py-1.5">
                <Icon name="star" size={14} color="#FBBF24" />
                <Text className="text-neutral-white font-semibold ml-1 text-xs">
                  {/* TODO: Use salonData.rating and reviewCount from API */}
                  {salonRating} ({reviewCount} Reviews)
                </Text>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-row items-center bg-neutral-black/50 rounded-button px-3 py-1.5">
                  <Icon name="location" size={14} color="#fff" />
                  {/* TODO: Use salonData.distance from API */}
                  <Text className="text-neutral-white ml-1 text-xs">
                    {distance}
                  </Text>
                </View>
                <TouchableOpacity className="flex-row items-center bg-neutral-black/50 rounded-button px-3 py-1.5">
                  <Icon name="map" size={14} color="#fff" />
                  <Text className="text-neutral-white ml-1 text-xs">
                    View Location
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Image dots */}
            <View className="absolute bottom-12 left-0 right-0 flex-row justify-center">
              {salonImages.map((_, i) => (
                <View
                  key={i}
                  className={`h-1.5 rounded-button mx-0.5 ${
                    currentImageIndex === i
                      ? 'w-5 bg-neutral-white'
                      : 'w-1.5 bg-neutral-white/50'
                  }`}
                />
              ))}
            </View>
          </View>
        </View>

        {/* ============================================================
            SALON INFO
        ============================================================ */}
        <View className="mx-md mt-md">
          {/* TODO: Use salonData.shopName, tagline, openHours from API */}
          <Text className="text-2xl font-bold text-neutral-900">{salonName}</Text>
          <Text className="text-neutral-500 text-sm mt-0.5">{salonTagline}</Text>
          <View className="flex-row items-center mt-1">
            <Icon name="time-outline" size={14} color="#10b981" />
            <Text className="text-success text-sm ml-1">
              Open • {openHours}
            </Text>
          </View>
        </View>

                {/* ============================================================
            DATE & ADDRESS INFO (shown below cards)
        ============================================================ */}
        <View className="mx-md mt-md bg-neutral-white rounded-card p-md">
          {/* <View className="flex-row mb-3">
            <View className="flex-1 flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-primary-50 items-center justify-center mr-2">
                <Icon name="calendar-outline" size={16} color="#ec4899" />
              </View>
              <View>
                <Text className="text-neutral-400 text-xs">Date & Time</Text> */}
                {/* TODO: Use selected date/time from booking state */}
               {/* <Text className="text-neutral-900 text-sm font-medium">
                  Thu, Apr 25 · 10:00 AM
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-secondary-pink text-sm font-semibold">
                Change
              </Text>
            </TouchableOpacity>
          </View> */}

          <View className="flex-row items-center">
            <View className="flex-1 flex-row items-center">
              <View className="w-8 h-8 rounded-xl bg-primary-50 items-center justify-center mr-2">
                <Icon name="location-outline" size={16} color="#ec4899" />
              </View>
              <View className="flex-1">
                <Text className="text-neutral-400 text-xs">Address</Text>
                {/* TODO: Use user's saved address from API */}
                <Text
                  className="text-neutral-900 text-sm font-medium"
                  numberOfLines={1}
                >
                  {salonAddress}
                </Text> 
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-secondary-pink text-sm font-semibold">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ============================================================
            ABOUT US
        ============================================================ */}
        <View className="mx-md mt-md bg-neutral-white rounded-card p-md">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setShowAbout(!showAbout)}
          >
            <Icon name="information-circle-outline" size={18} color="#ec4899" />
            <Text className="text-base font-semibold text-neutral-900 ml-2 flex-1">
              About Us
            </Text>
            <Icon
              name={showAbout ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#6B7280"
            />
          </TouchableOpacity>

          {showAbout && (
            <View className="mt-3">
              {/* TODO: Use salonData.about from API */}
              <Text className="text-neutral-500 text-sm leading-md">
                {aboutText}
              </Text>
              <View className="flex-row flex-wrap mt-2 gap-2">
                {/* TODO: Use salonData.aboutBadges from API */}
                {aboutBadges.map((badge, i) => (
                  <View
                    key={i}
                    className="flex-row items-center"
                  >
                    <Icon name="checkmark-circle" size={14} color="#10b981" />
                    <Text className="text-neutral-600 text-xs ml-1">{badge}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* ============================================================
            BOOKING MODE TOGGLE
        ============================================================ */}
        <BookingModeToggle mode={bookingMode} onChange={setBookingMode} />

        {/* ============================================================
            BOOKING MODE CARDS
        ============================================================ */}
        <View className="mx-md mt-md flex-row gap-3">
          <BookingModeCard mode="home" onBook={handleBookMode} />
          <BookingModeCard mode="salon" onBook={handleBookMode} />
        </View>

        {/* ============================================================
            OUR SERVICES — CATEGORY TABS
        ============================================================ */}
        <View className="mx-md mt-xl">
          <Text className="text-lg font-bold text-neutral-900 mb-md">
            Our Services
          </Text>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-3"
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {/* TODO: Map through salonData.serviceCategories from API */}
            {serviceCategories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  className={`mr-2 px-4 py-2 rounded-button border ${
                    isActive
                      ? 'bg-primary-400 border-primary-400'
                      : 'bg-neutral-white border-neutral-200'
                  }`}
                  onPress={() => setActiveCategory(cat.id)}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      isActive ? 'text-neutral-white' : 'text-neutral-700'
                    }`}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* All Services header row */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base font-bold text-neutral-800">
              All Services
            </Text>
            <View className="flex-row items-center bg-neutral-100 rounded-button px-3 py-1">
              <Text className="text-neutral-600 text-xs">
                Cat {currentServices.length} Items
              </Text>
              <Icon name="chevron-down" size={12} color="#6B7280" className="ml-1" />
            </View>
          </View>

          {/* Service List */}
          <View className="bg-neutral-white rounded-card px-md">
            {/* TODO: Map through serviceItemsByCategory[activeCategory] from API */}
            {currentServices.length > 0 ? (
              currentServices.map(service => (
                <ServiceItem
                  key={service._id}
                  service={service}
                  selectedMode={bookingMode}
                  cartItems={cartItems}
                  onAdd={handleAddService}
                />
              ))
            ) : (
              <View className="py-8 items-center">
                <Icon name="cut-outline" size={32} color="#D1D5DB" />
                <Text className="text-neutral-400 mt-2 text-sm">
                  No services in this category
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ============================================================
            CUSTOMER REVIEWS
        ============================================================ */}
        <View className="mx-md mt-xl bg-neutral-white rounded-card p-md mb-md">
          <Text className="text-lg font-bold text-neutral-900 mb-md">
            Customer Reviews
          </Text>

          <View className="flex-row items-center mb-md">
            <Icon name="star" size={24} color="#FBBF24" />
            {/* TODO: Use salonData.rating from API */}
            <Text className="text-2xl font-bold text-neutral-900 ml-2">
              {salonRating}
            </Text>
            <View className="flex-row ml-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Icon
                  key={star}
                  name={star <= Math.floor(salonRating) ? 'star' : 'star-outline'}
                  size={14}
                  color="#FBBF24"
                />
              ))}
            </View>
          </View>

          {/* TODO: Map through salonData.reviews from API */}
          {reviews.slice(0, 2).map(review => (
            <TouchableOpacity
              key={review.id}
              className="flex-row items-center py-3 border-b border-neutral-100"
            >
              <View className="w-10 h-10 rounded-avatar bg-neutral-200 mr-3 overflow-hidden">
                {review.userAvatar ? (
                  <Image
                    source={{ uri: review.userAvatar }}
                    style={{ width: 40, height: 40 }}
                    resizeMode="cover"
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <Icon name="person" size={20} color="#9CA3AF" />
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-neutral-900 text-sm">
                  {review.userName}
                </Text>
                <Text className="text-neutral-500 text-xs" numberOfLines={1}>
                  "{review.comment}"
                </Text>
              </View>
              <Icon name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity className="mt-3 items-center">
            <Text className="text-secondary-pink font-semibold text-sm">
              View All Reviews
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ============================================================
          FIXED BOTTOM CART BAR
      ============================================================ */}
      <View className="absolute bottom-0 left-0 right-0 bg-neutral-white px-md py-3 border-t border-neutral-100">
        {cartItems.length > 0 ? (
          <TouchableOpacity
            className="bg-primary-500 py-md rounded-button flex-row items-center justify-between px-md"
            onPress={() => navigation.navigate('Booking', { cartItems, bookingMode })}
          >
            <View>
              <Text className="text-neutral-white text-md">
                ₹{cartTotal.toLocaleString()} • {cartItems.length} item
                {cartItems.length > 1 ? 's' : ''}
              </Text>
            </View>
            <Text className="text-neutral-white font-bold text-base">
              Continue →
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-neutral-200 py-md rounded-button items-center">
            <Text className="text-neutral-500 font-semibold text-base">
              Select Service to Continue
            </Text>
          </View>
        )}
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
                      ? 'bg-primary-50 border-primary-400'
                      : 'border-neutral-200'
                  }`}
                  onPress={() => setSelectedMode('salon')}
                >
                  <Icon name="cut-outline" size={20} color="#f43f5e" />
                  <Text className="ml-3 text-base text-neutral-900">
                    At Salon
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-row items-center p-md rounded-input border mb-md ${
                    selectedMode === 'home'
                      ? 'bg-primary-50 border-primary-400'
                      : 'border-neutral-200'
                  }`}
                  onPress={() => setSelectedMode('home')}
                >
                  <Icon name="home-outline" size={20} color="#f43f5e" />
                  <Text className="ml-3 text-base text-neutral-900">
                    At Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`bg-primary-500 py-md rounded-button items-center ${
                    !selectedMode ? 'opacity-50' : ''
                  }`}
                  disabled={!selectedMode}
                  onPress={confirmModeSelection}
                >
                  <Text className="text-neutral-white font-semibold text-base">
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

// ============================================================
// INLINE STYLES (for things NativeWind can't handle dynamically)
// ============================================================
const styles = {
  activeTab: {
    backgroundColor: '#EA8491', // primary-500
  },
};