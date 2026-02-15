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
import CategoriesMarquee from './CategoriesMarquee';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('women');
  const prosScrollRef = useRef(null);
  const [currentProIndex, setCurrentProIndex] = useState(0);

  const promoScrollRef = useRef(null);
  const transitionAnim = useRef(new Animated.Value(0)).current;
  const BANNER_EXIT_DURATION = 2500;
  const [activeBanner, setActiveBanner] = useState(0);
  const [nextBanner, setNextBanner] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const promoImages = [
    require('../../../assets/promos/promo1.png'),
    require('../../../assets/promos/promo2.png'),
    require('../../../assets/promos/promo3.png'),
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

  const displayDuration =
    activeBanner === 0 ? PROMO_BANNER_DURATION : PROMO_BANNER_2_DURATION;

  // Right-to-left banner transition; mounts new banner only when visible
  const startBannerTransition = useCallback(() => {
    if (isTransitioning) return;
    const upcomingBanner = activeBanner === 0 ? 1 : 0;
    setNextBanner(upcomingBanner);
    setIsTransitioning(true);
    transitionAnim.setValue(0);

    Animated.timing(transitionAnim, {
      toValue: 1,
      duration: BANNER_EXIT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setActiveBanner(upcomingBanner);
      setIsTransitioning(false);
    });
  }, [activeBanner, transitionAnim, isTransitioning]);

  // Synchronize parent slideshow cycle with child banner animations
  useEffect(() => {
    if (isTransitioning) return;
    const timer = setTimeout(startBannerTransition, displayDuration);
    return () => clearTimeout(timer);
  }, [startBannerTransition, displayDuration, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % promoImages.length;
      setCurrentSlide(nextSlide);

      if (promoScrollRef.current) {
        promoScrollRef.current.scrollTo({
          x: nextSlide * width,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide, promoImages.length]);

  useEffect(() => {
    if (!independentProsList || independentProsList.length === 0) return;

    const interval = setInterval(() => {
      let nextIndex = (currentProIndex + 1) % independentProsList.length;
      setCurrentProIndex(nextIndex);

      if (prosScrollRef.current) {
        prosScrollRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentProIndex, independentProsList]);

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

  const renderSalonSection = (title, data) => {
    const listData = Array.isArray(data?.salons)
      ? data.salons
      : Array.isArray(data)
      ? data
      : [];

    if (listData.length === 0) return null;

    const lat = location?.latitude;
    const lng = location?.longitude;

    return (
      <View className="mb-5">
        <SectionHeader
          title={title}
          showViewAll
          onPress={() =>
            navigation.navigate('AllSalonListScreen', {
              category: selectedCategory,
              lat,
              lng,
            })
          }
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-4 py-2.5"
        >
          {listData.map(salon => (
            <View key={salon._id} className="mr-4">
              <SalonCard salon={salon} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (loading && !refreshing) {
    return <SkeletonLoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#156778]" edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#156778" />
      <View className="flex-1 bg-white">
        <HomeHeader user={user} navigation={navigation} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Banner Slideshow - mounts only the active banner so animations restart */}
          <View
            className="w-full overflow-hidden relative"
            style={{ height: 'auto' }}
          >
            {isTransitioning ? (
              <>
                <Animated.View
                  className="w-full"
                  style={{
                    transform: [
                      {
                        translateX: transitionAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -width],
                        }),
                      },
                    ],
                  }}
                >
                  {activeBanner === 0 ? <PromoBanner /> : <PromoBanner2 />}
                </Animated.View>

                <Animated.View
                  className="w-full absolute top-0 left-0 right-0 bottom-0"
                  style={{
                    transform: [
                      {
                        translateX: transitionAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [width, 0],
                        }),
                      },
                    ],
                  }}
                >
                  {nextBanner === 0 ? <PromoBanner /> : <PromoBanner2 />}
                </Animated.View>
              </>
            ) : activeBanner === 0 ? (
              <PromoBanner />
            ) : (
              <PromoBanner2 />
            )}
          </View>

          {/* Gender Category Toggle */}
          <View className="flex-row mx-4 my-4 rounded-[30px] bg-[#E1F5FA] p-1 border border-[#156778]">
            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center py-3 px-5 gap-2 rounded-[30px] ${
                selectedCategory === 'women' ? 'bg-[#156778] shadow-md' : ''
              }`}
              onPress={() => handleSelectSalonCategory('women')}
              activeOpacity={0.8}
            >
              <Image
                className="w-[30px] h-[30px] mr-1.5"
                source={womenImage}
                resizeMode="contain"
              />
              <Text
                className={`text-base font-semibold ${
                  selectedCategory === 'women' ? 'text-white' : 'text-[#156778]'
                }`}
              >
                Women
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 flex-row items-center justify-center py-3 px-5 gap-2 rounded-[30px] ${
                selectedCategory === 'men' ? 'bg-[#156778] shadow-md' : ''
              }`}
              onPress={() => handleSelectSalonCategory('men')}
              activeOpacity={0.8}
            >
              <Image
                className="w-[30px] h-[30px] mr-1.5"
                source={menImage}
                resizeMode="contain"
              />
              <Text
                className={`text-base font-semibold ${
                  selectedCategory === 'men' ? 'text-white' : 'text-[#156778]'
                }`}
              >
                Men
              </Text>
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <SectionHeader title="What do you want to get?" />
          <CategoriesMarquee
            categories={categories}
            navigation={navigation}
            location={location}
            selectedCategory={selectedCategory}
          />

          {/* --- Salon Sections --- */}
          {renderSalonSection(selectedCategory.toUpperCase(), salonList)}

          {/* --- Service at Home Card --- */}
          <SectionHeader
            title="Service At Home"
            onPress={() => navigation.navigate('ProfessionalsListScreen')}
          />
          <FlatList
            ref={prosScrollRef}
            data={independentProsList}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ServiceAtHomeCard
                independentPro={item}
                onPress={() =>
                  navigation.navigate('ProfessionalDetailScreen', {
                    id: item._id,
                  })
                }
              />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={() => {}}
          />

          {/* --- Nearby Offers --- */}
          <SectionHeader title="Salon Home Services" />
          <View className="px-4">
            <NearbyOfferCard
              imageUrl={require('../../../assets/featuredSalon.png')}
              category="Hair • Facial"
              name="Maroon's Luxury Salon"
              address="Kukatpally, Hyderabad"
              rating="4.8"
              reviews="3.7k"
              discount="15% Off"
              icon="home"
              salonBadge="Home Services"
            />
          </View>

          <SectionHeader title="Unisex Salons" />
          <View className="px-4">
            {unisexSalons.length === 0 ? (
              <Text className="text-neutral-500 text-center">
                No unisex salons found nearby
              </Text>
            ) : (
              unisexSalons.map(unisexSalon => (
                <UnisexCard
                  key={unisexSalon._id}
                  unisexSalon={unisexSalon}
                  icon="male-female"
                  salonBadge="Unisex"
                  onPress={() =>
                    navigation.navigate('SalonDetailScreen', {
                      salonId: unisexSalon._id,
                    })
                  }
                />
              ))
            )}
          </View>
          <View className="items-center opacity-50 pb-5">
            <Image
              source={require('../../../assets/GlownifyLogoPng.png')}
              className="h-[100px] w-[110px]"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
