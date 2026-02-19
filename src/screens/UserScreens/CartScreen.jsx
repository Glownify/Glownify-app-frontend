import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  getCart,
  removeFromCart,
  removeServiceFromCart,
  clearCart,
} from '../../utils/cartStorage';
import {
  hideCartPopup,
  setCart,
  setCartScreenFocused,
} from '../../redux/slices/cartSlice';
import { createBooking } from '../../redux/slices/bookingSlice';

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 DUMMY DATA CONFIG — flip USE_DUMMY_DATA = false to use real API
// ─────────────────────────────────────────────────────────────────────────────
const USE_DUMMY_DATA = true;

const HOME_FEE = 149;
const OFFER_THRESHOLD = 999;
const OFFER_DISCOUNT = 99;
const OFFER_FREE_SERVICE = 'Nail Polish';

const DUMMY_CART = [
  {
    providerId: 'provider_001',
    providerName: 'Glamour Salon & Spa',
    providerLocation: 'Gomti Nagar, Lucknow',
    providerPhone: '+91 987654210',
    homeAddress: 'Alambagh, Lucknow',
    selectedDateSalon: 'Mon, 24 Feb 2025',
    selectedTimeSalon: '11:00 AM',
    selectedDateHome: 'Tue, 25 Feb 2025',
    selectedTimeHome: '2:00 PM',
    services: [
      {
        _id: 's1',
        name: 'Haircut & Styling',
        duration: '45 min',
        price: 299,
        selectedMode: 'salon',
        // Replace with real URI from API: image: 'https://...'
        image: null,
        imageBg: '#fda4af',
      },
      {
        _id: 's2',
        name: 'Facial',
        duration: '60 min',
        price: 499,
        selectedMode: 'salon',
        image: null,
        imageBg: '#fbcfe8',
        // API will return freeServiceUnlocked when the threshold is met for this item
        freeServiceUnlocked: true,
      },
      {
        _id: 's3',
        name: 'Waxing',
        duration: '1 hr',
        price: 299,
        selectedMode: 'home',
        image: null,
        imageBg: '#fde68a',
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// ── Service thumbnail: real URI when available, coloured placeholder otherwise
const ServiceThumb = ({ image, imageBg }) =>
  image ? (
    <Image
      source={{ uri: image }}
      className="w-16 h-16 rounded-xl"
      resizeMode="cover"
    />
  ) : (
    <View
      className="w-16 h-16 rounded-xl"
      style={{ backgroundColor: imageBg || '#fda4af' }}
    />
  );

// ── Visit Salon collapsible card
const SalonSection = ({ item, onRemoveService, navigation }) => {
  const [expanded, setExpanded] = useState(true);

  const salonServices = item.services.filter(s => s.selectedMode === 'salon');
  const salonSubtotal = salonServices.reduce(
    (sum, s) => sum + (Number(s.price) || 0),
    0,
  );

  if (salonServices.length === 0) return null;

  return (
    <View className="bg-white rounded-3xl mb-3 overflow-hidden shadow-sm">
      {/* Section header – tap to collapse */}
      <TouchableOpacity
        className="flex-row items-center px-4 py-4"
        onPress={() => setExpanded(v => !v)}
        activeOpacity={0.7}
      >
        <View className="w-7 h-7 rounded-full bg-primary-500 items-center justify-center mr-3">
          <Icon name="checkmark" size={14} color="#fff" />
        </View>
        <Text className="flex-1 text-lg font-bold text-neutral-800">
          Visit Salon
        </Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#9ca3af"
        />
      </TouchableOpacity>

      {expanded && (
        <>
          <View className="h-px bg-neutral-100 mx-4" />

          {/* Salon info row */}
          <View className="flex-row items-center px-4 py-3">
            <View
              className="w-10 h-10 rounded-full mr-3 items-center justify-center"
              style={{ backgroundColor: '#fbcfe8' }}
            >
              <MaterialCommunityIcons name="store" size={18} color="#e11d48" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-neutral-800">
                {item.providerName}
              </Text>
              <View className="flex-row items-center mt-0.5 flex-wrap">
                <Text className="text-xs text-neutral-400">
                  {item.providerLocation}
                </Text>
                {item.providerPhone && (
                  <>
                    <Icon
                      name="call-outline"
                      size={11}
                      color="#f43f5e"
                      style={{ marginHorizontal: 4 }}
                    />
                    <Text className="text-xs text-neutral-400">
                      {item.providerPhone}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>

          <View className="h-px bg-neutral-100 mx-4" />

          {/* Date/time badge — shown when slot is booked; button when not */}
          <View className="mx-4 mt-3">
            {item.selectedDateSalon && item.selectedTimeSalon ? (
              <View className="flex-row items-center self-start px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={12}
                  color="#e11d48"
                />
                <Text className="text-xs text-primary-600 font-medium ml-1">
                  {item.selectedDateSalon}, {item.selectedTimeSalon}
                </Text>
                <TouchableOpacity
                  className="ml-2"
                  onPress={() =>
                    navigation.navigate('SelectDateAndTime', {
                      providerId: item.providerId,
                      mode: 'salon',
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="reload"
                    size={11}
                    color="#e11d48"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="flex-row items-center px-3 py-2 rounded-xl border border-primary-400 bg-primary-50"
                onPress={() =>
                  navigation.navigate('SelectDateAndTime', {
                    providerId: item.providerId,
                    mode: 'salon',
                  })
                }
              >
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={14}
                  color="#e11d48"
                />
                <Text className="text-xs font-semibold text-primary-600 ml-2">
                  Select Date &amp; Time for Salon Services
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Service rows */}
          <View className="px-4 pt-4 pb-2">
            {salonServices.map((s, idx) => (
              <View key={s._id}>
                <View className="flex-row items-start mb-3">
                  <ServiceThumb image={s.image} imageBg={s.imageBg} />

                  <View className="flex-1 ml-3">
                    {/* Name + price */}
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1 pr-2">
                        <Text className="text-sm font-bold text-neutral-800">
                          {s.name}
                        </Text>
                        <Text className="text-xs text-neutral-400 mt-0.5">
                          {s.duration}
                        </Text>
                      </View>
                      <Text className="text-sm font-bold text-neutral-800">
                        ₹{s.price}
                      </Text>
                    </View>

                    {/* Free service unlock badge — shown when API/logic flags it */}
                    {s.freeServiceUnlocked && (
                      <View
                        className="mt-2 rounded-xl px-3 py-1.5"
                        style={{ backgroundColor: '#fef3c7' }}
                      >
                        <View className="flex-row items-center">
                          <Text style={{ fontSize: 13 }}>🎁</Text>
                          <Text className="text-xs font-bold text-yellow-700 ml-1">
                            FREE {OFFER_FREE_SERVICE} Service{' '}
                          </Text>
                          <Text className="text-xs text-green-600 font-semibold">
                            Unlocked!
                          </Text>
                          <Text className="text-xs font-bold text-neutral-700 ml-auto">
                            ₹0
                          </Text>
                        </View>
                        <Text className="text-xs text-neutral-500 mt-0.5">
                          Discount Applied: ₹0
                        </Text>
                      </View>
                    )}

                    {/* + Add more services button */}
                    <TouchableOpacity
                      className="self-end mt-2 bg-primary-500 px-4 py-1.5 rounded-full flex-row items-center"
                      onPress={() => {
                        /* TODO: navigate to service picker for this salon */
                      }}
                    >
                      <Icon name="add" size={13} color="#fff" />
                      <Text className="text-xs font-bold text-white ml-1">
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Remove service */}
                  <TouchableOpacity
                    className="p-1 ml-1"
                    onPress={() =>
                      onRemoveService(item.providerId, s._id, s.selectedMode)
                    }
                  >
                    <Icon
                      name="close-circle-outline"
                      size={18}
                      color="#d1d5db"
                    />
                  </TouchableOpacity>
                </View>

                {idx < salonServices.length - 1 && (
                  <View className="h-px bg-neutral-100 mb-3" />
                )}
              </View>
            ))}
          </View>

          {/* Subtotal */}
          <View className="h-px bg-neutral-100 mx-4" />
          <View className="flex-row justify-between items-center px-4 py-3">
            <Text className="text-sm font-bold text-neutral-700">Subtotal</Text>
            <Text className="text-sm font-bold text-neutral-800">
              ₹{salonSubtotal}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

// ── Service at Home card
const HomeSection = ({ item, onRemoveService, navigation }) => {
  const [expanded, setExpanded] = useState(true);

  const homeServices = item.services.filter(s => s.selectedMode === 'home');
  const homeSubtotal = homeServices.reduce(
    (sum, s) => sum + (Number(s.price) || 0) + HOME_FEE,
    0,
  );

  if (homeServices.length === 0) return null;

  return (
    <View className="bg-white rounded-3xl mb-3 overflow-hidden shadow-sm">
      {/* Section header – tap to collapse */}
      <TouchableOpacity
        className="flex-row items-center px-4 py-4"
        onPress={() => setExpanded(v => !v)}
        activeOpacity={0.7}
      >
        <View
          className="w-7 h-7 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: '#fbcfe8' }}
        >
          <MaterialCommunityIcons name="home-heart" size={14} color="#e11d48" />
        </View>
        <Text className="flex-1 text-lg font-bold text-neutral-800">
          Service at Home
        </Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#9ca3af"
        />
      </TouchableOpacity>

      {expanded && (
        <>
          <View className="h-px bg-neutral-100 mx-4" />

          {/* Address row */}
          {item.homeAddress && (
            <View className="flex-row items-center px-4 py-3">
              <View
                className="w-10 h-10 rounded-full mr-3 items-center justify-center"
                style={{ backgroundColor: '#fbcfe8' }}
              >
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={18}
                  color="#e11d48"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-neutral-800">
                  Home Address
                </Text>
                <Text className="text-xs text-neutral-400 mt-0.5">
                  {item.homeAddress}
                </Text>
              </View>
            </View>
          )}

          <View className="h-px bg-neutral-100 mx-4" />

          {/* Date/time badge */}
          <View className="mx-4 mt-3">
            {item.selectedDateHome && item.selectedTimeHome ? (
              <View className="flex-row items-center self-start px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={12}
                  color="#e11d48"
                />
                <Text className="text-xs text-primary-600 font-medium ml-1">
                  {item.selectedDateHome}, {item.selectedTimeHome}
                </Text>
                <TouchableOpacity
                  className="ml-2"
                  onPress={() =>
                    navigation.navigate('SelectDateAndTime', {
                      providerId: item.providerId,
                      mode: 'home',
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="reload"
                    size={11}
                    color="#e11d48"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="flex-row items-center px-3 py-2 rounded-xl border border-primary-400 bg-primary-50"
                onPress={() =>
                  navigation.navigate('SelectDateAndTime', {
                    providerId: item.providerId,
                    mode: 'home',
                  })
                }
              >
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={14}
                  color="#e11d48"
                />
                <Text className="text-xs font-semibold text-primary-600 ml-2">
                  Select Date &amp; Time for Home Services
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Service rows */}
          <View className="px-4 pt-4 pb-2">
            {homeServices.map((s, idx) => (
              <View key={s._id}>
                <View className="flex-row items-start mb-3">
                  <ServiceThumb image={s.image} imageBg={s.imageBg} />

                  <View className="flex-1 ml-3">
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1 pr-2">
                        <Text className="text-sm font-bold text-neutral-800">
                          {s.name}
                        </Text>
                        <Text className="text-xs text-neutral-400 mt-0.5">
                          {s.duration}
                        </Text>
                        <Text className="text-xs text-neutral-400 mt-0.5">
                          + ₹{HOME_FEE} home charge
                        </Text>
                      </View>
                      <Text className="text-sm font-bold text-neutral-800">
                        ₹{s.price}
                      </Text>
                    </View>

                    {/* Add-on counter */}
                    <View className="flex-row items-center self-end mt-2">
                      <TouchableOpacity
                        className="px-2.5 py-1 rounded-l-full border border-primary-300 bg-primary-50"
                        onPress={() => {
                          /* TODO: decrement add-on */
                        }}
                      >
                        <Text className="text-xs text-primary-500 font-bold">
                          −
                        </Text>
                      </TouchableOpacity>
                      <View className="px-3 py-1 border-t border-b border-primary-300 bg-primary-50">
                        <Text className="text-xs text-primary-500 font-semibold">
                          + ₹9
                        </Text>
                      </View>
                      <TouchableOpacity
                        className="px-2.5 py-1 rounded-r-full border border-primary-300 bg-primary-50"
                        onPress={() => {
                          /* TODO: increment add-on */
                        }}
                      >
                        <Text className="text-xs text-primary-500 font-bold">
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Remove service */}
                  <TouchableOpacity
                    className="p-1 ml-1"
                    onPress={() =>
                      onRemoveService(item.providerId, s._id, s.selectedMode)
                    }
                  >
                    <Icon
                      name="close-circle-outline"
                      size={18}
                      color="#d1d5db"
                    />
                  </TouchableOpacity>
                </View>

                {idx < homeServices.length - 1 && (
                  <View className="h-px bg-neutral-100 mb-3" />
                )}
              </View>
            ))}
          </View>

          {/* Subtotal */}
          <View className="h-px bg-neutral-100 mx-4" />
          <View className="flex-row justify-between items-center px-4 py-3">
            <Text className="text-sm font-bold text-neutral-700">Subtotal</Text>
            <Text className="text-sm font-bold text-neutral-800">
              ₹{homeSubtotal}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

// ── Promotional offer banner
const OfferBanner = ({ serviceTotal, discount }) => {
  const unlocked = serviceTotal >= OFFER_THRESHOLD;

  return (
    <View className="rounded-3xl mb-3 overflow-hidden shadow-sm">
      {/* Banner strip — simulated gradient using two layered Views */}
      <View
        className="relative items-center justify-center py-3.5 px-4"
        style={{ backgroundColor: '#d97b7b' }}
      >
        <View
          className="absolute inset-0 opacity-20 rounded-t-3xl"
          style={{ backgroundColor: '#ffcdd2' }}
          pointerEvents="none"
        />
        <View className="flex-row items-center">
          <Text style={{ fontSize: 15 }}>✨</Text>
          <Text className="text-white font-bold text-sm mx-2 text-center">
            Spend ₹{OFFER_THRESHOLD} &amp; Get {OFFER_FREE_SERVICE} FREE
          </Text>
          <Text style={{ fontSize: 15 }}>✨</Text>
        </View>
      </View>

      {/* Status row */}
      <View className="flex-row items-center justify-between bg-white px-4 py-3">
        {unlocked ? (
          <>
            <View className="flex-row items-center">
              <Icon name="checkmark-circle" size={16} color="#10b981" />
              <Text className="text-sm font-bold text-neutral-700 ml-1">
                Offer Unlocked
              </Text>
              <Text className="text-xs text-neutral-400 ml-2">
                You saved ₹{discount}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon name="checkmark-circle" size={14} color="#10b981" />
              <Text className="text-xs font-semibold text-neutral-600 ml-1">
                FREE {OFFER_FREE_SERVICE}
              </Text>
            </View>
          </>
        ) : (
          <View className="flex-row items-center">
            <Icon name="lock-closed-outline" size={14} color="#9ca3af" />
            <Text className="text-xs text-neutral-400 ml-2">
              Add ₹{Math.max(0, OFFER_THRESHOLD - serviceTotal)} more to unlock
              free {OFFER_FREE_SERVICE}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

// ── Order summary card
const SummarySection = ({ serviceTotal, discount, finalPayable }) => (
  <View className="bg-white rounded-3xl mb-3 px-5 py-5 shadow-sm">
    <View className="flex-row justify-between items-center mb-3">
      <Text className="text-base font-bold text-neutral-800">Summary</Text>
      <Text className="text-base font-bold text-neutral-800">
        ₹{serviceTotal}
      </Text>
    </View>

    <View className="flex-row justify-between items-center mb-1.5">
      <Text className="text-sm text-neutral-500">Service Total</Text>
      <Text className="text-sm text-neutral-500">₹{serviceTotal}</Text>
    </View>

    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-sm text-neutral-500">Discount</Text>
      <Text className="text-sm" style={{ color: '#10b981' }}>
        - ₹{discount}
      </Text>
    </View>

    <View className="h-px bg-neutral-200 mb-4" />

    <View className="flex-row justify-between items-center">
      <Text className="text-base font-bold text-neutral-800">
        Final Payable
      </Text>
      <Text className="text-2xl font-bold text-primary-500">
        ₹{finalPayable}
      </Text>
    </View>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// Main CartScreen
// ─────────────────────────────────────────────────────────────────────────────
export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const userId = user?._id || 'guest';

  const [localCart, setLocalCart] = useState(USE_DUMMY_DATA ? DUMMY_CART : []);
  const { loading } = useSelector(state => state.booking);

  useFocusEffect(
    useCallback(() => {
      dispatch(setCartScreenFocused(true));
      dispatch(hideCartPopup());
      // Only call the real API when dummy mode is off
      if (!USE_DUMMY_DATA) loadCart();
      return () => dispatch(setCartScreenFocused(false));
    }, [dispatch]),
  );

  // ── Real API loader — used when USE_DUMMY_DATA = false
  const loadCart = async () => {
    const data = await getCart(userId);
    setLocalCart(data);
    dispatch(setCart(data));
  };

  // ── Gate: require date/time for every service-mode that has items
  const isBookingDisabled = localCart.some(item => {
    const hasSalon = item.services.some(s => s.selectedMode === 'salon');
    const hasHome = item.services.some(s => s.selectedMode === 'home');
    if (hasSalon && (!item.selectedDateSalon || !item.selectedTimeSalon))
      return true;
    if (hasHome && (!item.selectedDateHome || !item.selectedTimeHome))
      return true;
    return false;
  });

  // ── Remove handlers (local in dummy mode, API in live mode)
  const handleRemoveService = async (providerId, serviceId, selectedMode) => {
    if (USE_DUMMY_DATA) {
      setLocalCart(prev =>
        prev
          .map(item =>
            item.providerId !== providerId
              ? item
              : {
                  ...item,
                  services: item.services.filter(
                    s =>
                      !(s._id === serviceId && s.selectedMode === selectedMode),
                  ),
                },
          )
          .filter(item => item.services.length > 0),
      );
      return;
    }
    const updated = await removeServiceFromCart(
      userId,
      providerId,
      serviceId,
      selectedMode,
    );
    setLocalCart(updated);
    dispatch(setCart(updated));
  };

  // ── Totals + offer logic
  const calculateTotals = () => {
    let serviceTotal = 0;
    localCart.forEach(group =>
      group.services.forEach(s => {
        serviceTotal +=
          s.selectedMode === 'home'
            ? (Number(s.price) || 0) + HOME_FEE
            : Number(s.price) || 0;
      }),
    );
    const discount = serviceTotal >= OFFER_THRESHOLD ? OFFER_DISCOUNT : 0;
    return { serviceTotal, discount, finalPayable: serviceTotal - discount };
  };

  const { serviceTotal, discount, finalPayable } = calculateTotals();

  // ── Booking payload — shared between dummy log and real dispatch
  const buildBookingPayload = () => {
    const bookings = [];
    localCart.forEach(item => {
      const salonSvcs = item.services.filter(s => s.selectedMode === 'salon');
      const homeSvcs = item.services.filter(s => s.selectedMode === 'home');

      if (
        salonSvcs.length &&
        item.selectedDateSalon &&
        item.selectedTimeSalon
      ) {
        bookings.push({
          providerId: item.providerId,
          bookingDate: item.selectedDateSalon,
          timeSlot: {
            start: item.selectedTimeSalon,
            end: item.selectedTimeSalon,
          },
          services: salonSvcs.map(s => ({
            serviceId: s._id,
            serviceMode: 'salon',
          })),
          bookingType: 'salon',
        });
      }
      if (homeSvcs.length && item.selectedDateHome && item.selectedTimeHome) {
        bookings.push({
          providerId: item.providerId,
          bookingDate: item.selectedDateHome,
          timeSlot: {
            start: item.selectedTimeHome,
            end: item.selectedTimeHome,
          },
          services: homeSvcs.map(s => ({
            serviceId: s._id,
            serviceMode: 'home',
          })),
          bookingType: 'home',
        });
      }
    });
    return bookings;
  };

  const handleBooking = () => {
    // if (USE_DUMMY_DATA) {
    //   console.log('[DUMMY] Booking payload:', buildBookingPayload());
    //   navigation.navigate('HomeTab', { screen: 'Bookings' });
    //   return;
    // }
    // dispatch(createBooking({ bookings: buildBookingPayload() }))
    //   .unwrap()
    //   .then(async () => {
    //     await clearCart(userId);
    //     setLocalCart([]);
    //     dispatch(setCart([]));
    //     dispatch(hideCartPopup());
    //     navigation.navigate('HomeTab', { screen: 'Bookings' });
    //   });
    navigation.navigate('BookingComplete')
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffe4e6" />

      {/* ── Header */}
      <View className="flex-row items-center bg-white px-4 py-4 border-b border-neutral-100">
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#f43f5e" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-neutral-800">
          Review Booking
        </Text>
        {/* Spacer to keep title centered */}
        <View className="w-8" />
      </View>

      {/* ── Dev banner — remove before going to production */}
      {/* {USE_DUMMY_DATA && (
        <View className="bg-yellow-100 border-b border-yellow-200 px-3 py-1.5">
          <Text className="text-xs text-center text-yellow-700 font-medium">
            🛠 Dummy Data — set USE_DUMMY_DATA = false for live API
          </Text>
        </View>
      )} */}

      {/* ── Empty state */}
      {localCart.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <MaterialCommunityIcons
            name="cart-outline"
            size={80}
            color="#fda4af"
          />
          <Text className="text-lg font-semibold text-neutral-400 mt-4">
            Your cart is empty
          </Text>
          <Text className="text-sm text-neutral-300 mt-1">
            Add some services to get started
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {localCart.map(item => (
            <React.Fragment key={item.providerId}>
              <SalonSection
                item={item}
                onRemoveService={handleRemoveService}
                navigation={navigation}
              />
              <HomeSection
                item={item}
                onRemoveService={handleRemoveService}
                navigation={navigation}
              />
            </React.Fragment>
          ))}

          <OfferBanner serviceTotal={serviceTotal} discount={discount} />

          <SummarySection
            serviceTotal={serviceTotal}
            discount={discount}
            finalPayable={finalPayable}
          />
        </ScrollView>
      )}

      {/* ── Sticky confirm footer */}
      {localCart.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-6 border-t border-neutral-100">
          <TouchableOpacity
            className={`rounded-full py-4 items-center ${
              loading || isBookingDisabled ? 'opacity-50' : ''
            }`}
            style={{ backgroundColor: '#c27b82' }}
            onPress={handleBooking}
            disabled={loading || isBookingDisabled}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white font-bold text-base tracking-wide">
                Confirm Booking
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
