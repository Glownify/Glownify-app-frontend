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

/* Small confetti square */
const Confetti = ({ style }) => (
  <View
    style={[
      {
        position: 'absolute',
        width: 7,
        height: 7,
        borderRadius: 2,
        opacity: 0.85,
      },
      style,
    ]}
  />
);

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
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (providerId) {
      dispatch(fetchSalonById(providerId));
    }
  }, [providerId, dispatch]);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
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
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Illustration Area ── */}
        <View
          className="items-center mt-6 mb-2"
          style={{ height: 260, width: width }}
        >
          {/* Scattered confetti */}
          <Confetti
            style={{ top: 40, left: width * 0.12, backgroundColor: '#F472B6' }}
          />
          <Confetti
            style={{
              top: 20,
              left: width * 0.28,
              backgroundColor: '#FCD34D',
              transform: [{ rotate: '30deg' }],
            }}
          />
          <Confetti
            style={{ top: 55, left: width * 0.72, backgroundColor: '#FB923C' }}
          />
          <Confetti
            style={{
              top: 15,
              left: width * 0.63,
              backgroundColor: '#A78BFA',
              transform: [{ rotate: '45deg' }],
            }}
          />
          <Confetti
            style={{ top: 80, left: width * 0.82, backgroundColor: '#34D399' }}
          />
          <Confetti
            style={{
              top: 90,
              left: width * 0.1,
              backgroundColor: '#60A5FA',
              transform: [{ rotate: '20deg' }],
            }}
          />
          <Confetti
            style={{ top: 130, left: width * 0.08, backgroundColor: '#FCD34D' }}
          />
          <Confetti
            style={{
              top: 120,
              left: width * 0.85,
              backgroundColor: '#F472B6',
              transform: [{ rotate: '60deg' }],
            }}
          />

          {/* Decorative ribbon-like arcs */}
          <View
            style={{
              position: 'absolute',
              top: 30,
              left: width * 0.18,
              width: 40,
              height: 3,
              borderRadius: 4,
              backgroundColor: '#F9A8D4',
              transform: [{ rotate: '-30deg' }],
              opacity: 0.7,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 60,
              right: width * 0.18,
              width: 30,
              height: 3,
              borderRadius: 4,
              backgroundColor: '#FCD34D',
              transform: [{ rotate: '20deg' }],
              opacity: 0.7,
            }}
          />

          {/* Gift Box */}
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
              transform: [{ scale: scaleAnim }],
            }}
          >
            {/* Box lid */}
            <View
              style={{
                width: 110,
                height: 28,
                backgroundColor: '#F9A8D4',
                borderRadius: 6,
                alignSelf: 'center',
                marginBottom: -4,
                zIndex: 2,
                shadowColor: '#f43f5e',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              }}
            >
              {/* Ribbon on lid */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  marginLeft: -5,
                  width: 10,
                  backgroundColor: '#E11D48',
                  borderRadius: 3,
                }}
              />
            </View>

            {/* Box body */}
            <View
              style={{
                width: 100,
                height: 80,
                backgroundColor: '#FEE2E2',
                borderRadius: 10,
                alignSelf: 'center',
                overflow: 'hidden',
                shadowColor: '#f43f5e',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {/* Vertical ribbon strip */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  marginLeft: -5,
                  width: 10,
                  backgroundColor: '#FDA4AF',
                }}
              />
              {/* Horizontal ribbon strip */}
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '50%',
                  marginTop: -4,
                  height: 8,
                  backgroundColor: '#FDA4AF',
                }}
              />
            </View>

            {/* Stars/sparkles around box */}
            <View style={{ position: 'absolute', top: -10, left: -15 }}>
              <Icon name="star" size={16} color="#FBBF24" />
            </View>
            <View style={{ position: 'absolute', top: 20, right: -18 }}>
              <Icon name="star" size={12} color="#FCD34D" />
            </View>
            <View style={{ position: 'absolute', bottom: 10, left: -20 }}>
              <Icon name="star-outline" size={10} color="#F9A8D4" />
            </View>
          </Animated.View>

          {/* Checkmark circle — floating above the box */}
          <Animated.View
            style={{
              position: 'absolute',
              top: 10,
              alignSelf: 'center',
              transform: [{ scale: scaleAnim }],
            }}
          >
            {/* Outer glow ring */}
            <View
              style={{
                width: 92,
                height: 92,
                borderRadius: 46,
                backgroundColor: 'rgba(244,63,94,0.08)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* White circle */}
              <View
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 38,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#f43f5e',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 6,
                }}
              >
                <Icon name="checkmark" size={44} color="#F43F5E" />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* ── Heading ── */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
            paddingHorizontal: 24,
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
