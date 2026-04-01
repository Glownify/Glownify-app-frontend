// screens/ShopDetailsScreen.jsx
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import ShopDetailsSkeleton from './ShopDetailsSkeleton';
import { fetchSalonById } from '../../../redux/slices/userSlice';

import SalonImageCarousel from '../../../components/shopfulldetail/Salonimagecarousel';
import SalonInfo from '../../../components/shopfulldetail/Saloninfo';
import SalonAddressCard from '../../../components/shopfulldetail/Salonaddresscard';
import AboutUsCard from '../../../components/shopfulldetail/Aboutuscard';
import OurServicesCarousel from '../../../components/shopfulldetail/Ourservicescarousel';
import BookingModeToggle from '../../../components/shopfulldetail/Bookingmodetoggle';
import ServicesList from '../../../components/shopfulldetail/Serviceslist';
import CustomerReviews from '../../../components/shopfulldetail/Customerreviews';
import CartBar from '../../../components/shopfulldetail/Cartbar';
import ServiceModeModal from '../../../components/shopfulldetail/Servicemodemodal';
import {S} from '../../../theme';
import SubServiceBottomSheet from '../../../components/shopfulldetail/Subservicebottomsheet'; // ← NEW
import SalonGallery from '../../../components/shopfulldetail/Salongallery'; // ← NEW

// ── Dummy data (replace with API) ──────────────────────────────
const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
  'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
  'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800',
  'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800',
];

const DUMMY_OUR_SERVICES = [
  {
    id: '1',
    name: 'Hair',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200',
  },
  {
    id: '2',
    name: 'Facial',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200',
  },
  {
    id: '3',
    name: 'Wax',
    image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=200',
  },
  { id: '4', name: 'Makeup', image: null },
  { id: '5', name: 'More', image: null },
];

const DUMMY_SERVICES = {
  1: [
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
      image:
        'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=200',
      badge: 'Opt.',
    },
  ],
  2: [
    {
      _id: 's4',
      name: 'Facial Treatment',
      duration: '45 mins',
      salonPrice: 800,
      homePrice: 950,
      serviceMode: 'both',
      image:
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200',
      badge: null,
    },
    {
      _id: 's5',
      name: 'Clean Up',
      duration: '30 mins',
      salonPrice: 500,
      homePrice: 600,
      serviceMode: 'both',
      image:
        'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=200',
      badge: '*STEALDEAL',
    },
  ],
  3: [
    {
      _id: 's6',
      name: 'Full Arms Waxing',
      duration: '20 mins',
      salonPrice: 300,
      homePrice: 400,
      serviceMode: 'both',
      image:
        'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=200',
      badge: null,
    },
  ],
  4: [
    {
      _id: 's7',
      name: 'Bridal Makeup',
      duration: '2 hours',
      salonPrice: 3500,
      homePrice: 4000,
      serviceMode: 'both',
      image:
        'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=200',
      badge: null,
    },
  ],
};

const DUMMY_REVIEWS = [
  {
    id: '1',
    userName: 'Pooja S',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment: 'Great service and very clean!',
  },
  {
    id: '2',
    userName: 'Amit K',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    rating: 5,
    comment: 'Loved the facial, will book again!',
  },
];

// ── Screen ─────────────────────────────────────────────────────
export default function ShopDetailsScreen({ navigation, route }) {
  const { salonId } = route.params;

  const [showAbout, setShowAbout] = useState(false);
  const [bookingMode, setBookingMode] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Mode modal state
  const [modeModalVisible, setModeModalVisible] = useState(false);
  const [pendingService, setPendingService] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);

  // Sub-service bottom sheet state
  const [subSheetVisible, setSubSheetVisible] = useState(false);
  const [serviceForSub, setServiceForSub] = useState(null);

  const dispatch = useDispatch();
  const { salonDetails: salonData, loading } = useSelector(s => s.user);

  useEffect(() => {
    dispatch(fetchSalonById(salonId));
  }, [dispatch, salonId]);

  // API data with fallbacks
  const salonImages = salonData?.galleryImages || DUMMY_IMAGES;
  const salonName = salonData?.shopName || 'Glamour Beauty Salon';
  const salonTagline =
    salonData?.tagline || 'Elegant & Luxurious Beauty Services';
  const salonRating = salonData?.rating || 4.8;
  const reviewCount = salonData?.reviewCount || 120;
  const distance = salonData?.distance || '2.5 km away';
  const salonAddress = salonData?.location?.address || 'Anand Nagar, Pune';
  const openHours = salonData?.openHours || '10:00 AM - 8:00 PM';
  const aboutText =
    salonData?.about ||
    'Elegance, hygiene, professionalism & premium quality. Welcome to Glamour Beauty Salon.';
  const aboutBadges = salonData?.aboutBadges || [
    '100% Hygienic & Safe',
    'Experienced Beauty Experts Est. 2015',
  ];
  const ourServices = salonData?.ourServices || DUMMY_OUR_SERVICES;
  const servicesMap = DUMMY_SERVICES; // TODO: serviceItemsByCategory from API
  const reviews = salonData?.reviews || DUMMY_REVIEWS;

  useEffect(() => {
    if (ourServices.length > 0 && !activeCategory) {
      setActiveCategory(ourServices[0].id);
    }
  }, [ourServices]);

  const currentServices = servicesMap[activeCategory] || [];

  // ── Handlers ──────────────────────────────────────────────────

  /**
   * Called when user taps Add on a service card.
   * If item is already in cart → remove it and its subs.
   * Otherwise → open the sub-service bottom sheet.
   */
  const handleAddService = service => {
    const alreadyIn = cartItems.find(c => c._id === service._id);
    if (alreadyIn) {
      setCartItems(prev =>
        prev.filter(
          c =>
            c._id !== service._id &&
            !c._id.startsWith(service._id + '-sub') &&
            c.parentId !== service._id,
        ),
      );
      return;
    }
    // Open sub-service sheet
    setServiceForSub(service);
    setSubSheetVisible(true);
  };

  /**
   * Called when user confirms from the bottom sheet.
   * selectedSubs may be empty — sub-services are optional.
   * An empty array means "add the main service only".
   */
  const confirmSubServices = selectedSubs => {
    setSubSheetVisible(false);
    const service = serviceForSub;

    // Determine mode
    if (service.serviceMode === 'both' && bookingMode === null) {
      // Need to ask for mode
      setPendingService({ ...service, _selectedSubs: selectedSubs });
      setModeModalVisible(true);
      return;
    }

    const mode =
      service.serviceMode === 'salon'
        ? 'salon'
        : service.serviceMode === 'home'
        ? 'home'
        : bookingMode;

    _commitToCart(service, selectedSubs, mode);
    setServiceForSub(null);
  };

  const _commitToCart = (service, selectedSubs, mode) => {
    const subItems = selectedSubs.map(s => ({
      ...s,
      parentId: service._id,
      parentName: service.name,
      chosenMode: mode,
    }));

    setCartItems(prev => [
      ...prev,
      { ...service, chosenMode: mode },
      ...subItems,
    ]);
  };

  const confirmModeSelection = () => {
    if (!pendingMode || !pendingService) return;

    const { _selectedSubs, ...service } = pendingService;
    _commitToCart(service, _selectedSubs || [], pendingMode);

    setModeModalVisible(false);
    setPendingMode(null);
    setPendingService(null);
    setServiceForSub(null);
  };

  const dismissModeModal = () => {
    setModeModalVisible(false);
    setPendingMode(null);
    setPendingService(null);
  };

  const dismissSubSheet = () => {
    setSubSheetVisible(false);
    setServiceForSub(null);
  };

  if (!salonData && loading) return <ShopDetailsSkeleton />;

  return (
    <SafeAreaView className="flex-1 bg-base" edges={['top']}>
      <ScrollView
        className="flex-1 bg-base"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: S.space.lg,
          paddingBottom: S.space['8xl'] + S.space['4xl'],
          gap: S.space.lg,
        }}
      >
        {/* 1. Image carousel */}
        <SalonImageCarousel
          title={salonName}
          images={salonImages}
          rating={salonRating}
          reviewCount={reviewCount}
          distance={distance}
          onBack={() => navigation.goBack()}
          onFavourite={() => {}}
          onViewMap={() => {}}
        />

        {/* 2. Salon name / tagline / hours */}
        {/* <SalonInfo
          name={salonName}
          tagline={salonTagline}
          openHours={openHours}
        /> */}

        {/* 3. Address card */}
        <SalonAddressCard address={salonAddress} onEdit={() => {}} />

        {/* 4. About us (collapsible) */}
        <AboutUsCard
          aboutText={aboutText}
          badges={aboutBadges}
          expanded={showAbout}
          onToggle={() => setShowAbout(prev => !prev)}
        />

        {/* ── NEW: 5. Gallery section ── */}
        {/* <SalonGallery images={salonImages} /> */}

        {/* 6. Circular category shortcuts */}
        <OurServicesCarousel
          services={ourServices}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* 7. Home / Salon toggle */}
        <BookingModeToggle mode={bookingMode} onChange={setBookingMode} />

        {/* 8. Services list */}
        <ServicesList
          services={currentServices}
          selectedMode={bookingMode}
          cartItems={cartItems}
          onAdd={handleAddService}
        />

        {/* 9. Customer reviews */}
        <CustomerReviews
          rating={salonRating}
          reviews={reviews}
          onViewAll={() => navigation.navigate('Reviews', { salonId })}
        />
      </ScrollView>

      {/* 10. Fixed bottom cart bar */}
      <CartBar
        cartItems={cartItems}
        bookingMode={bookingMode}
        onContinue={() =>
          navigation.navigate('Booking', { cartItems, bookingMode })
        }
      />

      {/* 11. Mode selection modal */}
      <ServiceModeModal
        visible={modeModalVisible}
        selectedMode={pendingMode}
        onSelectMode={setPendingMode}
        onConfirm={confirmModeSelection}
        onDismiss={dismissModeModal}
      />

      {/* ── NEW: 12. Sub-service bottom sheet ── */}
      <SubServiceBottomSheet
        visible={subSheetVisible}
        service={serviceForSub}
        onDismiss={dismissSubSheet}
        onConfirm={confirmSubServices}
      />
    </SafeAreaView>
  );
}
