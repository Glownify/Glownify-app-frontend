import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchSalonById } from '../../../redux/slices/userSlice';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// Dummy data — replace with real API response
// ─────────────────────────────────────────────
const DUMMY_SALON = {
  shopName: 'Glamour Salon & Spa',
  location: { address: 'Gomti Nagar, Lucknow' },
  rating: 4.5,
  phone: '+91 98765 43210',
  galleryImages: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
  ],
};

const DUMMY_OFFER = {
  title: 'Spend ₹999 & Get Nail Polish FREE',
  badge1: 'Offer Unlocked  You saved ₹99',
  badge2: 'FREE Nail Polish',
};
// ─────────────────────────────────────────────

/* Render star-rating row */
const StarRating = ({ rating = 4.5 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <View className="flex-row items-center">
      {Array(full)
        .fill(0)
        .map((_, i) => (
          <Icon key={`f${i}`} name="star" size={13} color="#FBBF24" />
        ))}
      {half && <Icon name="star-half" size={13} color="#FBBF24" />}
      {Array(empty)
        .fill(0)
        .map((_, i) => (
          <Icon key={`e${i}`} name="star-outline" size={13} color="#FBBF24" />
        ))}
      <Text className="text-gray-400 text-xs ml-1">{rating}</Text>
    </View>
  );
};

const BookingComplete = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { providerId } = route.params || {};
  const { salonDetails } = useSelector(state => state.user);

  // Animation refs
  const imageAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (providerId) {
      dispatch(fetchSalonById(providerId));
    }
  }, [providerId, dispatch]);

  useEffect(() => {
    Animated.sequence([
      // Image springs in
      Animated.spring(imageAnim, {
        toValue: 1,
        tension: 55,
        friction: 7,
        useNativeDriver: true,
      }),
      // Then text/cards fade + slide up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 380,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Merge API data with dummy fallback
  const salon = salonDetails || DUMMY_SALON;
  const salonImage = salon.galleryImages?.[0] || DUMMY_SALON.galleryImages[0];
  const offer = DUMMY_OFFER; // swap with API data if available

  return (
    <SafeAreaView className="flex-1 bg-primary-50">
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Illustration Area ── */}
        <Animated.View
          style={{
            alignItems: 'center',
            marginTop: 16,
            // marginBottom: 8,
            opacity: imageAnim,
            transform: [
              {
                scale: imageAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1],
                }),
              },
            ],
          }}
        >
          <Image
            source={require('../../../assets/BookingComplete.png')}
            style={{ width: width * 0.82, height: width * 0.82 }}
            // resizeMode="cover"
          />
        </Animated.View>

        {/* ── Heading ── */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
            // paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Inter-Bold',
              color: '#1F2937',
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            Booking Request Sent
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Inter-Regular',
              color: '#9CA3AF',
              textAlign: 'center',
              lineHeight: 22,
              marginBottom: 28,
            }}
          >
            Salon will call you shortly to{'\n'}confirm your appointment.
          </Text>

          {/* ── CTA Buttons ── */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="rounded-lg"
            style={{
              width: width - 48,
              backgroundColor: '#EA8491',
              paddingVertical: 16,
              // borderRadius: 14,
              alignItems: 'center',
              marginBottom: 12,
              shadowColor: '#E11D48',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 4,
            }}
            onPress={() => navigation.navigate('UserBookingsScreen')}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}
            >
              View Booking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            className="rounded-lg"
            style={{
              width: width - 48,
              backgroundColor: '#FFFFFF',
              paddingVertical: 16,
              // borderRadius: 14,
              alignItems: 'center',
              marginBottom: 24,
              borderWidth: 1,
              borderColor: '#FEE2E2',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={() => navigation.navigate('HomeMain')}
          >
            <Text
              style={{
                color: '#EA8491',
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
              }}
            >
              Go to Home
            </Text>
          </TouchableOpacity>

          {/* ── Salon Card ── */}
          <View
            className="rounded-lg"
            style={{
              width: width - 32,
              backgroundColor: '#FFFFFF',
              // borderRadius: 16,
              padding: 12,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#FFF1F2',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.07,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {/* Salon thumbnail */}
            <Image
              source={{ uri: salonImage }}
              style={{ width: 64, height: 64, borderRadius: 12 }}
              resizeMode="cover"
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={{
                  color: '#111827',
                  fontSize: 15,
                  fontFamily: 'Inter-Bold',
                  marginBottom: 2,
                }}
                numberOfLines={1}
              >
                {/* API: salon.shopName */}
                {salon.shopName || DUMMY_SALON.shopName}
              </Text>
              <Text
                style={{
                  color: '#9CA3AF',
                  fontSize: 12,
                  fontFamily: 'Inter-Regular',
                  marginBottom: 4,
                }}
                numberOfLines={1}
              >
                {/* API: salon.location?.address */}
                {salon.location?.address || DUMMY_SALON.location.address}
              </Text>
              {/* API: salon.rating */}
              <StarRating rating={salon.rating || DUMMY_SALON.rating} />
            </View>

            {/* Call button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#FFF1F2',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                /* TODO: call salon.phone */
              }}
            >
              <Icon name="call" size={18} color="#EA8491" />
            </TouchableOpacity>
          </View>

          {/* ── Offer Banner ── */}
          <View
            className="rounded-lg"
            style={{
              width: width - 32,
              // borderRadius: 14,
              overflow: 'hidden',
              marginBottom: 8,
            }}
          >
            {/* Gradient simulation via layered Views */}
            <View
              style={{
                backgroundColor: '#FDA4AF',
                padding: 14,
              }}
            >
              {/* Right-side lighter accent overlay */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '45%',
                  // backgroundColor: '#FED7AA',
                  opacity: 0.55,
                  borderTopRightRadius: 14,
                  borderBottomRightRadius: 14,
                }}
              />

              {/* Sparkle stars decoration */}
              {/* <View style={{ position: 'absolute', top: 8, right: 12 }}>
                <Icon name="sparkles" size={14} color="rgba(255,255,255,0.9)" />
              </View>
              <View style={{ position: 'absolute', bottom: 8, right: 30 }}>
                <Icon name="star" size={10} color="rgba(255,255,255,0.6)" />
              </View> */}

              {/* Offer title row */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  zIndex: 1,
                }}
              >
                {/* <Icon name="sparkles" size={15} color="white" /> */}
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Inter-Bold',
                    fontSize: 13,
                    marginLeft: 6,
                    letterSpacing: 0.2,
                  }}
                >
                  {/* API: offer.title */}
                  {offer.title}
                </Text>
              </View>

              {/* Badges row */}
              <View className="flex-row gap-md">
                {/* Badge 1 */}
                <View
                  className="flex-1 flex-row items-center rounded-md py-1 px-2 gap-2 "
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }}
                >
                  <Icon name="checkmark-circle" size={14} color="#10B981" />
                  <Text className="text-white text-xs leading-none">
                    {/* API: offer.badge1 */}
                    {offer.badge1}
                  </Text>
                </View>

                {/* Badge 2 */}
                <View
                  className="flex-row items-center rounded-md py-1 px-2 gap-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }}
                >
                  <Icon name="checkmark-circle" size={14} color="#10B981" />
                  <Text className="text-white text-xs leading-none">
                    {/* API: offer.badge2 */}
                    {offer.badge2}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* ── Fixed Bottom Confirm Button ── */}
      {/* <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          // backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#FFF1F2',
        }}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            backgroundColor: '#EA8491',
            paddingVertical: 17,
            borderRadius: 14,
            alignItems: 'center',
            shadowColor: '#E11D48',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
          onPress={() => navigation.navigate('HomeTab')}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 17,
              fontFamily: 'Inter-Bold',
            }}>
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default BookingComplete;
