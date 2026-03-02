import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ServicesList from '../../../components/shopfulldetail/Serviceslist';
import CartBar from '../../../components/shopfulldetail/Cartbar';
import SubServiceBottomSheet from '../../../components/shopfulldetail/Subservicebottomsheet';
import AppHeader, { HeaderIconButton } from '../../../components/common/Header'; // TODO: adjust path

// ─── Dummy / static data (replace with API response) ────────────────────────
const PROFESSIONAL = {
  name: 'Priya Sharma',
  avatar: 'https://i.pravatar.cc/150?img=47',
  rating: 4.9,
  reviewCount: 234,
  experience: '6 yrs exp',
  speciality: 'Hair & Skin Expert',
  homeVisitFee: 99,
  distanceKm: 2.5,
  tags: [
    { label: 'Top Rated', icon: 'ribbon-outline', color: '#fff' },
    { label: 'Female',    icon: 'woman-outline',  color: '#fff' },
    { label: 'Verified',  icon: 'checkmark-circle-outline', color: '#fff' },
  ],
};

const TAG_COLORS = ['bg-warning', 'bg-secondary-pink', 'bg-info'];

const originalServices = [
  { id: 1, title: 'Haircut & Styling',  duration: '30 min',  certification: "L'Oréal Certified", price: '₹149'  },
  { id: 2, title: 'Full Body Spa',      duration: '90 min',  certification: 'Ayurveda Certified', price: '₹149'  },
  { id: 3, title: 'Facial Treatment',   duration: '45 min',  certification: 'Derma Certified',    price: '₹599'  },
  { id: 4, title: 'Manicure & Pedicure',duration: '60 min',  certification: 'OPI Certified',      price: '₹799'  },
  { id: 5, title: 'Threading',          duration: '15 min',  certification: 'Certified',          price: '₹99'   },
  { id: 6, title: 'Waxing (Full Arms)', duration: '30 min',  certification: 'Certified',          price: '₹299'  },
  { id: 7, title: 'Bridal Makeup',      duration: '120 min', certification: 'MAC Certified',      price: '₹2499' },
];

const PRO_SERVICES = originalServices.map(s => ({
  _id: `pro_s_${s.id}`,
  name: s.title,
  duration: s.duration,
  salonPrice: null,
  homePrice: parseInt(s.price.replace('₹', ''), 10),
  serviceMode: 'home',
  badge: s.certification,
  image: null,
}));
// ─────────────────────────────────────────────────────────────────────────────

const ProfessionalDetailsScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subSheetVisible, setSubSheetVisible] = useState(false);
  const [serviceForSub, setServiceForSub] = useState(null);
  const [isFav, setIsFav] = useState(false);

  const handleAddService = service => {
    const alreadyIn = cartItems.find(c => c._id === service._id);
    if (alreadyIn) {
      setCartItems(prev => prev.filter(c =>
        c._id !== service._id &&
        !c._id.startsWith(service._id + '-sub') &&
        c.parentId !== service._id,
      ));
      return;
    }
    setServiceForSub(service);
    setSubSheetVisible(true);
  };

  const confirmSubServices = selectedSubs => {
    setSubSheetVisible(false);
    const service = serviceForSub;
    const subItems = selectedSubs.map(s => ({
      ...s, parentId: service._id, parentName: service.name, chosenMode: 'home',
    }));
    setCartItems(prev => [...prev, { ...service, chosenMode: 'home' }, ...subItems]);
    setServiceForSub(null);
  };

  const dismissSubSheet = () => { setSubSheetVisible(false); setServiceForSub(null); };

  return (
    <SafeAreaView className="flex-1 bg-primary" edges={['top']}>
      <AppHeader
        title="Professional Profile"
        onBack={() => navigation.goBack()}
        variant="primary"
        rightElement={
          <HeaderIconButton
            name={isFav ? 'heart' : 'heart-outline'}
            onPress={() => setIsFav(f => !f)}
            color="#fff"
          />
        }
      />

      <ScrollView
        className="flex-1 bg-neutral-100 rounded-t-3xl"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 20 }}
      >
        {/* ── Floating Profile Card ── */}
        <View
          className="mx-md mb-lg bg-neutral-white rounded-3xl overflow-hidden"
          style={{ elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } }}
        >
          {/* Primary colour banner strip at top of card */}
          <View className="bg-white h-16 w-full" />

          {/* Avatar — overlaps the banner */}
          <View className="px-md pb-md" style={{ marginTop: -36 }}>
            <View className="flex-row items-end justify-between mb-md">
              <View className="relative">
                <Image
                  source={{ uri: PROFESSIONAL.avatar }}
                  className="w-20 h-20 rounded-2xl border-4 border-neutral-white"
                  // TODO: replace with API → professional.avatarUrl
                />
                <View
                  className="absolute -bottom-1.5 -right-1.5 bg-neutral-white rounded-full p-0.5"
                  style={{ elevation: 2 }}
                >
                  <Ionicons name="shield-checkmark" size={16} color="#3b82f6" />
                </View>
              </View>

              {/* Rating pill — top-right of card body */}
              <View className="flex-row items-center bg-warning px-2.5 py-1 rounded-full mb-1">
                <Ionicons name="star" size={12} color="#fff" />
                <Text className="text-white text-xs font-bold ml-1">
                  {PROFESSIONAL.rating}
                </Text>
                <Text className="text-white text-xs ml-1 opacity-80">
                  ({PROFESSIONAL.reviewCount})
                </Text>
              </View>
            </View>

            {/* Name + speciality */}
            <Text className="text-xl font-bold text-neutral-900">
              {PROFESSIONAL.name}
              {/* TODO: replace with API → professional.name */}
            </Text>
            <View className="flex-row items-center mt-0.5 mb-md">
              <Text className="text-sm text-neutral-500">{PROFESSIONAL.speciality}</Text>
              <View className="mx-2 w-px h-3 bg-neutral-200" />
              <Text className="text-xs text-neutral-400">{PROFESSIONAL.experience}</Text>
            </View>

            {/* Tags */}
            <View className="flex-row flex-wrap gap-2 mb-md">
              {PROFESSIONAL.tags.map((tag, i) => (
                <View key={tag.label} className={`flex-row items-center py-1 px-sm rounded-full ${TAG_COLORS[i]}`}>
                  <Ionicons name={tag.icon} size={12} color="#fff" />
                  <Text className="text-xs font-semibold text-white ml-1">{tag.label}</Text>
                </View>
              ))}
            </View>

            {/* Divider */}
            <View className="h-px bg-neutral-100 mb-md" />

            {/* Stats Row */}
            <View className="flex-row justify-around">
              <View className="items-center">
                <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center mb-1.5">
                  <Ionicons name="home-outline" size={20} color="#f43f5e" />
                </View>
                <Text className="text-sm font-bold text-neutral-900">₹{PROFESSIONAL.homeVisitFee}</Text>
                <Text className="text-xs text-neutral-400 mt-0.5">Home Visit</Text>
              </View>
              <View className="w-px bg-neutral-100" />
              <View className="items-center">
                <View className="w-10 h-10 rounded-xl bg-teal-50 items-center justify-center mb-1.5">
                  <Ionicons name="location-outline" size={20} color="#14b8a6" />
                </View>
                <Text className="text-sm font-bold text-neutral-900">{PROFESSIONAL.distanceKm} km</Text>
                <Text className="text-xs text-neutral-400 mt-0.5">Distance</Text>
              </View>
              <View className="w-px bg-neutral-100" />
              <View className="items-center">
                <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mb-1.5">
                  <Ionicons name="calendar-outline" size={20} color="#3b82f6" />
                </View>
                <Text className="text-sm font-bold text-neutral-900">Mon–Sat</Text>
                <Text className="text-xs text-neutral-400 mt-0.5">Availability</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Services heading */}
        <View className="px-md mb-sm">
          <Text className="text-base font-bold text-neutral-900">Services Offered</Text>
          <Text className="text-xs text-neutral-400 mt-0.5">Select services to add to your booking</Text>
        </View>

        <ServicesList
          services={PRO_SERVICES}
          selectedMode="home"
          cartItems={cartItems}
          onAdd={handleAddService}
        />
      </ScrollView>

      <CartBar
        cartItems={cartItems}
        bookingMode="home"
        onContinue={() => navigation.navigate('Booking', { cartItems, bookingMode: 'home' })}
      />

      <SubServiceBottomSheet
        visible={subSheetVisible}
        service={serviceForSub}
        onDismiss={dismissSubSheet}
        onConfirm={confirmSubServices}
      />
    </SafeAreaView>
  );
};

export default ProfessionalDetailsScreen;