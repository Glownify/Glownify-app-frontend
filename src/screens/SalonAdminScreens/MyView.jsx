import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

// ─── MOCK / FALLBACK DATA ─────────────────────────────────────────────────────
// 🔁 Replace with Redux selectors:
// const userDetails = useSelector(state => state.auth.user)
// const salonData   = useSelector(state => state.user.salonDetails)

const MOCK_IMAGES = [
  { uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800' },
  { uri: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800' },
  { uri: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800' },
  { uri: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800' },
];

const MOCK_SERVICES = [
  { id: '1', name: 'Women Haircut',    price: 550,  durationMins: 60,  description: 'Precision cut with modern finishing.',    discountPercent: 20  },
  { id: '2', name: 'Balayage Color',   price: 2500, durationMins: 120, description: 'Hand-painted sun-kissed highlights.',     discountPercent: 0   },
  { id: '3', name: 'Deep Facial',      price: 1200, durationMins: 60,  description: 'Deep cleansing & moisturizing facial.',   discountPercent: 15  },
  { id: '4', name: 'Bridal Makeup',    price: 5000, durationMins: 150, description: 'Full bridal look by expert artists.',     discountPercent: 0   },
];

const MOCK_SPECIALISTS = [
  { _id: 'sp1', name: 'Riya Sharma',   role: 'Hair Specialist',   image: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 4.9 },
  { _id: 'sp2', name: 'Kavya Nair',    role: 'Skin & Makeup',     image: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 4.8 },
  { _id: 'sp3', name: 'Rohan Mehta',   role: 'Beard & Grooming',  image: 'https://randomuser.me/api/portraits/men/32.jpg',   rating: 4.7 },
];

const MOCK_REVIEWS = [
  { id: 'r1', userName: 'Jennie Whang',  rating: 4, date: '2 days ago',  comment: 'The place was clean, great service, staff are friendly. Will certainly recommend!', ownerReply: null },
  { id: 'r2', userName: 'Nathalie K.',   rating: 5, date: '1 week ago',  comment: 'Very nice service from the specialist. I always come here for my treatment.',        ownerReply: 'Thank you Nathalie! We look forward to seeing you again 💛' },
  { id: 'r3', userName: 'Julia Martha',  rating: 4, date: '2 weeks ago', comment: "This is my favourite place to treat my hair :)",                                       ownerReply: null },
];

const DEFAULT_HOURS = [
  { day: 'Monday',    start: '09:00 AM', end: '09:00 PM' },
  { day: 'Tuesday',   start: '09:00 AM', end: '09:00 PM' },
  { day: 'Wednesday', start: '09:00 AM', end: '09:00 PM' },
  { day: 'Thursday',  start: '09:00 AM', end: '09:00 PM' },
  { day: 'Friday',    start: '09:00 AM', end: '09:00 PM' },
  { day: 'Saturday',  start: '10:00 AM', end: '07:00 PM' },
  { day: 'Sunday',    start: null,       end: null        },
];

const AMENITIES_LIST = [
  { key: 'ac',          label: 'AC',           icon: 'snow-outline'            },
  { key: 'parking',     label: 'Parking',      icon: 'car-outline'             },
  { key: 'wifi',        label: 'WiFi',         icon: 'wifi-outline'            },
  { key: 'card',        label: 'Card Payment', icon: 'card-outline'            },
  { key: 'pets',        label: 'Pet Friendly', icon: 'paw-outline'             },
  { key: 'waiting',     label: 'Waiting Area', icon: 'cafe-outline'            },
  { key: 'kids',        label: 'Kids Area',    icon: 'happy-outline'           },
  { key: 'accessible',  label: 'Accessible',   icon: 'accessibility-outline'   },
];

const QUICK_ACTIONS = [
  { icon: 'cut-outline',      label: 'Services',    color: '#f43f5e', bg: '#fff1f2', nav: 'Services'         }, // Tab: ManageServicesScreen
  { icon: 'people-outline',   label: 'Staff',       color: '#f97316', bg: '#fff7ed', nav: 'Specialist'       }, // Tab: ManageSpecialistScreen
  { icon: 'list-outline',     label: 'Categories',  color: '#8b5cf6', bg: '#f5f3ff', nav: 'ManageCategories' }, // Stack: ManageCategoriesScreen
  { icon: 'layers-outline',   label: 'Add-ons',     color: '#10b981', bg: '#ecfdf5', nav: 'ServiceAddOns'    }, // Stack: ServiceAddOnsScreen
  { icon: 'gift-outline',     label: 'Combos',      color: '#3b82f6', bg: '#eff6ff', nav: 'ComboPackages'    }, // Stack: ComboPackagesScreen
  { icon: 'calendar-outline', label: 'Bookings',    color: '#ec4899', bg: '#fdf2f8', nav: 'Bookings'         }, // Tab: SalonBookingsScreen
];

// ─── PROFILE COMPLETION ───────────────────────────────────────────────────────
const getProfileCompletion = ({ shopName, about, contact, amenities, services, specialists }) => {
  const checks = [
    { label: 'Salon name',       done: !!shopName                          },
    { label: 'About section',    done: about?.length > 20                  },
    { label: 'Contact info',     done: !!contact?.phone                    },
    { label: 'Amenities',        done: Object.values(amenities || {}).some(Boolean) },
    { label: 'Services added',   done: services?.length > 0                },
    { label: 'Staff added',      done: specialists?.length > 0             },
    { label: 'Gallery photos',   done: true                                 }, // mock true
  ];
  const done = checks.filter(c => c.done).length;
  return { pct: Math.round((done / checks.length) * 100), checks };
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const StarRow = ({ rating, size = 13 }) => (
  <View className="flex-row gap-x-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Icon key={i} name={i <= rating ? 'star' : 'star-outline'} size={size} color={i <= rating ? '#f59e0b' : '#d1d5db'} />
    ))}
  </View>
);

// Edit-mode inline text field
const EditableText = ({ value, onChange, multiline, placeholder, done, style }) => (
  <View className="flex-row items-start gap-x-2">
    <TextInput
      value={value}
      onChangeText={onChange}
      autoFocus
      multiline={multiline}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      className="flex-1 text-sm text-neutral-700 border border-primary-200 rounded-input p-sm bg-primary-50"
      style={[multiline && { minHeight: 80, textAlignVertical: 'top' }, style]}
    />
    <TouchableOpacity onPress={done} className="mt-1 p-1">
      <Icon name="checkmark-circle" size={28} color="#10b981" />
    </TouchableOpacity>
  </View>
);

// Section wrapper card
const SCard = ({ children, className: cn = '' }) => (
  <View className={`bg-neutral-white mx-md mt-sm rounded-3xl p-md shadow-card border border-neutral-100 ${cn}`}>
    {children}
  </View>
);

// Section header with optional edit / view-all buttons
const SHeader = ({ title, subtitle, onEdit, onViewAll, editMode }) => (
  <View className="mb-sm">
    <View className="flex-row justify-between items-center">
      <Text className="text-lg font-bold text-neutral-800">{title}</Text>
      <View className="flex-row gap-x-2">
        {editMode && onEdit && (
          <TouchableOpacity
            onPress={onEdit} activeOpacity={0.8}
            className="flex-row items-center gap-x-1 bg-primary-50 rounded-button px-sm py-1"
          >
            <Icon name="pencil-outline" size={12} color="#f43f5e" />
            <Text className="text-xs font-bold text-primary-500">Edit</Text>
          </TouchableOpacity>
        )}
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll} className="flex-row items-center gap-x-1">
            <Text className="text-xs font-bold text-primary-500">View all</Text>
            <Icon name="chevron-forward" size={13} color="#f43f5e" />
          </TouchableOpacity>
        )}
      </View>
    </View>
    {subtitle ? <Text className="text-xs text-neutral-400 mt-0.5">{subtitle}</Text> : null}
  </View>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MyView({ navigation }) {
  const insets = useSafeAreaInsets();

  // 🔁 Replace these with real Redux selectors
  // const userDetails = useSelector(state => state.auth.user);
  // const salonData   = useSelector(state => state.user.salonDetails);
  const specialists    = MOCK_SPECIALISTS;
  const openingHours   = DEFAULT_HOURS;
  const rating         = '4.7';
  const today          = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayHours     = openingHours.find(h => h.day === today);
  const tileW          = (width - 32 - 32 - 10 * 2) / 3;

  // ── Core UI state ──────────────────────────────────────────────────────────
  const [editMode,         setEditMode]         = useState(false);
  const [currentImg,       setCurrentImg]        = useState(0);
  const [showHours,        setShowHours]         = useState(false);
  const [isOpen,           setIsOpen]            = useState(true);
  const [activeCategory,   setActiveCategory]    = useState(null);

  // ── Editable fields ────────────────────────────────────────────────────────
  const [shopName,   setShopName]   = useState('Glamour Salon');
  const [tagline,    setTagline]    = useState('Premium Hair & Beauty Studio');
  const [about,      setAbout]      = useState('We specialize in professional beauty & grooming. Our skilled team ensures you leave looking and feeling your absolute best.');
  const [contact,    setContact]    = useState({ phone: '+91 98765 43210', whatsapp: '+91 98765 43210', email: 'hello@glamoursalon.in', website: 'www.glamoursalon.in', instagram: '@glamoursalon' });
  const [location,   setLocation]   = useState({ address: '42, Rose Garden Road', city: 'Mumbai', landmark: 'Near Inorbit Mall', parking: 'Street parking available' });
  const [homeService, setHomeService] = useState({ enabled: true, radius: '10', extraCharge: '100' });
  const [amenities,  setAmenities]  = useState({ ac: true, parking: true, wifi: true, card: true, pets: false, waiting: true, kids: false, accessible: false });
  const [policies,   setPolicies]   = useState({ cancellation: 'Free cancellation up to 2 hours before appointment.', late: 'A grace period of 10 minutes is allowed.', payment: 'Cash, card, and UPI accepted.', children: 'Children under 5 are welcome with a guardian.' });
  const [reviews,    setReviews]    = useState(MOCK_REVIEWS);

  // ── Inline editing toggles ─────────────────────────────────────────────────
  const [editingSection, setEditingSection] = useState(null); // 'name'|'about'|'contact'|'location'|'home'|'hours'|'policies'

  const stopEditing = () => setEditingSection(null);

  // Profile completion
  const completion = getProfileCompletion({ shopName, about, contact, amenities, services: MOCK_SERVICES, specialists });

  // ─── Review reply ────────────────────────────────────────────────────────
  const [replyingTo,   setReplyingTo]   = useState(null);
  const [replyDraft,   setReplyDraft]   = useState('');

  const submitReply = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, ownerReply: replyDraft } : r));
    setReplyingTo(null);
    setReplyDraft('');
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <SafeAreaView className="flex-1 bg-primary-50" edges={[]}>

      {/* ── Floating Header ── */}
      <View
        style={{ position: 'absolute', top: insets.top + 6, left: 0, right: 0, zIndex: 20 }}
        className="flex-row justify-between items-center px-md"
      >
        <TouchableOpacity
          onPress={() => navigation?.goBack?.()}
          className="w-10 h-10 rounded-full bg-neutral-white items-center justify-center shadow-sm"
        >
          <Icon name="chevron-back" size={22} color="#1f2937" />
        </TouchableOpacity>

        <View className="flex-row gap-x-2 items-center">
          {/* Edit Mode Toggle — primary CTA */}
          <TouchableOpacity
            onPress={() => { setEditMode(v => !v); setEditingSection(null); }}
            activeOpacity={0.85}
            className={`flex-row items-center gap-x-1.5 px-sm py-1.5 rounded-button shadow-sm ${editMode ? 'bg-success' : 'bg-neutral-white'}`}
          >
            <Icon name={editMode ? 'checkmark-done-outline' : 'create-outline'} size={15} color={editMode ? '#fff' : '#f43f5e'} />
            <Text className={`text-xs font-bold ${editMode ? 'text-neutral-white' : 'text-primary-500'}`}>
              {editMode ? 'Done Editing' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation?.navigate?.('SalonNotifications')}
            className="w-10 h-10 rounded-full bg-neutral-white items-center justify-center shadow-sm"
          >
            <Icon name="notifications-outline" size={18} color="#2d3a5a" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-neutral-white items-center justify-center shadow-sm">
            <Icon name="share-outline" size={18} color="#2d3a5a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* ══ Hero Gallery ═════════════════════════════════════════════════════ */}
        <View style={{ height: 280, backgroundColor: '#111' }}>
          <ScrollView
            horizontal pagingEnabled showsHorizontalScrollIndicator={false}
            onScroll={e => setCurrentImg(Math.round(e.nativeEvent.contentOffset.x / width))}
            scrollEventThrottle={16}
          >
            {MOCK_IMAGES.map((img, i) => (
              <Image key={i} source={img} style={{ width, height: 280 }} resizeMode="cover" />
            ))}
          </ScrollView>

          {/* Dark gradient overlay */}
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 110, backgroundColor: 'rgba(0,0,0,0.3)' }} pointerEvents="none" />

          {/* Photo count */}
          <View style={{ position: 'absolute', top: insets.top + 56, right: 16 }}
            className="flex-row items-center gap-x-1 bg-black/50 rounded-xl px-xs py-0.5"
          >
            <Icon name="images-outline" size={11} color="#fff" />
            <Text className="text-neutral-white text-xs font-semibold">{currentImg + 1} / {MOCK_IMAGES.length}</Text>
          </View>

          {/* Edit photos button — only in edit mode */}
          {editMode && (
            <TouchableOpacity
              style={{ position: 'absolute', bottom: 50, right: 16 }}
              className="flex-row items-center gap-x-1.5 bg-black/55 px-sm py-xs rounded-button"
            >
              <Icon name="camera-outline" size={14} color="#fff" />
              <Text className="text-neutral-white text-xs font-semibold">Edit Photos</Text>
            </TouchableOpacity>
          )}

          {/* Pill indicators */}
          <View style={{ position: 'absolute', bottom: 18, alignSelf: 'center' }} className="flex-row gap-x-1.5">
            {MOCK_IMAGES.map((_, i) => (
              <View
                key={i}
                style={{ height: 5, width: i === currentImg ? 22 : 5, borderRadius: 3, backgroundColor: i === currentImg ? '#fff' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </View>
        </View>

        {/* ══ Profile Completion Banner ════════════════════════════════════════ */}
        {completion.pct < 100 && (
          <View className="mx-md mt-sm bg-neutral-white rounded-card p-sm shadow-card border border-primary-100">
            <View className="flex-row justify-between items-center mb-xs">
              <View className="flex-row items-center gap-x-2">
                <Icon name="rocket-outline" size={16} color="#f43f5e" />
                <Text className="text-sm font-bold text-neutral-800">Profile {completion.pct}% complete</Text>
              </View>
              <Text className="text-xs text-primary-500 font-bold">{completion.pct}%</Text>
            </View>
            {/* Progress bar */}
            <View className="h-1.5 bg-primary-100 rounded-button overflow-hidden mb-xs">
              <View style={{ width: `${completion.pct}%` }} className="h-full bg-primary-500 rounded-button" />
            </View>
            {/* Missing items */}
            <View className="flex-row flex-wrap gap-1.5">
              {completion.checks.filter(c => !c.done).slice(0, 3).map(c => (
                <View key={c.label} className="flex-row items-center gap-x-1 bg-primary-50 border border-primary-100 px-xs py-0.5 rounded-button">
                  <Icon name="add-circle-outline" size={11} color="#f43f5e" />
                  <Text className="text-xs text-primary-500 font-semibold">{c.label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ══ Shop Identity Card ═══════════════════════════════════════════════ */}
        <View className="bg-neutral-white mx-md mt-sm rounded-3xl p-md shadow-card border border-neutral-100" style={{ marginTop: completion.pct < 100 ? 8 : -24 }}>

          {/* Name + tagline */}
          {editMode && editingSection === 'name' ? (
            <View className="mb-sm gap-y-2">
              <EditableText value={shopName} onChange={setShopName} placeholder="Salon name" done={stopEditing} />
              <TextInput
                value={tagline} onChangeText={setTagline} placeholder="Tagline"
                placeholderTextColor="#9ca3af"
                className="text-xs text-neutral-500 border border-primary-100 rounded-input px-sm py-1 bg-primary-50"
              />
            </View>
          ) : (
            <View className="flex-row items-start justify-between mb-xs">
              <View className="flex-1 mr-sm">
                <Text className="text-xl font-bold text-neutral-900">{shopName}</Text>
                <Text className="text-xs text-neutral-400 mt-0.5">{tagline}</Text>
              </View>
              {editMode && (
                <TouchableOpacity onPress={() => setEditingSection('name')} className="bg-primary-50 rounded-xl p-1.5">
                  <Icon name="pencil-outline" size={14} color="#f43f5e" />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Location row */}
          <View className="flex-row items-center gap-x-1 mb-sm">
            <Icon name="location-outline" size={13} color="#9ca3af" />
            <Text className="text-xs text-neutral-500 flex-1" numberOfLines={1}>
              {location.address}{location.city ? `, ${location.city}` : ''}
              {location.landmark ? ` · ${location.landmark}` : ''}
            </Text>
            {editMode && (
              <TouchableOpacity onPress={() => setEditingSection('location')} className="ml-1">
                <Icon name="pencil-outline" size={12} color="#f43f5e" />
              </TouchableOpacity>
            )}
          </View>

          {/* Status pills */}
          <View className="flex-row flex-wrap gap-x-2 gap-y-1.5 mb-sm">
            <View className="flex-row items-center gap-x-1 bg-yellow-50 rounded-button px-xs py-1">
              <Icon name="star" size={12} color="#f59e0b" />
              <Text className="text-xs font-bold text-yellow-800">{rating}</Text>
              <Text className="text-xs text-yellow-600">({MOCK_REVIEWS.length} reviews)</Text>
            </View>

            <TouchableOpacity
              onPress={() => editMode && setIsOpen(v => !v)} activeOpacity={editMode ? 0.8 : 1}
              className={`flex-row items-center gap-x-1 rounded-button px-xs py-1 ${isOpen ? 'bg-emerald-50' : 'bg-red-50'}`}
            >
              <View className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-success' : 'bg-error'}`} />
              <Text className={`text-xs font-bold ${isOpen ? 'text-success' : 'text-error'}`}>
                {isOpen ? 'Open Now' : 'Closed'}
                {editMode && ' (tap)'}
              </Text>
            </TouchableOpacity>

            <View className={`flex-row items-center gap-x-1 rounded-button px-xs py-1 ${homeService.enabled ? 'bg-purple-50' : 'bg-neutral-100'}`}>
              <Icon name="home-outline" size={11} color={homeService.enabled ? '#7c3aed' : '#9ca3af'} />
              <Text className={`text-xs font-semibold ${homeService.enabled ? 'text-purple-700' : 'text-neutral-400'}`}>
                Home Service
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-neutral-100 mb-sm" />

          {/* Stats strip */}
          <View className="flex-row justify-around mb-sm">
            {[
              { icon: 'calendar-outline',  value: '1.2K',  label: 'Bookings',  color: '#f43f5e' },
              { icon: 'people-outline',     value: '863',   label: 'Customers', color: '#3b82f6' },
              { icon: 'navigate-outline',   value: '18 km', label: 'Distance',  color: '#10b981' },
              { icon: 'star-outline',       value: rating,  label: 'Rating',    color: '#f59e0b' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <View className="items-center flex-1">
                  <View className="w-9 h-9 rounded-xl items-center justify-center mb-1" style={{ backgroundColor: s.color + '18' }}>
                    <Icon name={s.icon} size={17} color={s.color} />
                  </View>
                  <Text className="text-sm font-bold text-neutral-800">{s.value}</Text>
                  <Text className="text-xs text-neutral-400 mt-0.5">{s.label}</Text>
                </View>
                {i < arr.length - 1 && <View className="w-px h-9 bg-neutral-100 self-center" />}
              </React.Fragment>
            ))}
          </View>

          {/* CTA buttons */}
          {/* <View className="flex-row gap-x-2">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-x-1.5 bg-primary-50 rounded-input py-sm">
              <Icon name="navigate-outline" size={15} color="#f43f5e" />
              <Text className="text-sm font-bold text-primary-500">Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-x-1.5 bg-neutral-800 rounded-input py-sm">
              <Icon name="call-outline" size={15} color="#fff" />
              <Text className="text-sm font-bold text-neutral-white">Call Now</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        {/* ══ Quick Actions ════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader title="Quick Actions" subtitle="Manage your salon" />
          <View className="flex-row flex-wrap gap-x-2 gap-y-2">
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity
                key={action.label}
                onPress={() => navigation?.navigate?.(action.nav)}
                activeOpacity={0.75}
                style={{ width: tileW, borderRadius: 16, paddingVertical: 14, alignItems: 'center', gap: 6, backgroundColor: action.bg }}
              >
                <View style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: action.color + '22', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={action.icon} size={20} color={action.color} />
                </View>
                <Text className="text-xs font-bold text-neutral-700 text-center">{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SCard>

        {/* ══ About ════════════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader title="About" onEdit={() => setEditingSection('about')} editMode={editMode} />
          {editMode && editingSection === 'about' ? (
            <EditableText value={about} onChange={setAbout} multiline placeholder="Describe your salon..." done={stopEditing} />
          ) : (
            <Text className="text-sm text-neutral-600 leading-relaxed">{about}</Text>
          )}
        </SCard>

        {/* ══ Contact Info ═════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader title="Contact Info" onEdit={() => setEditingSection('contact')} editMode={editMode} />

          {editMode && editingSection === 'contact' ? (
            <View className="gap-y-2">
              {[
                { key: 'phone',     label: 'Phone',     icon: 'call-outline',     kb: 'phone-pad'     },
                { key: 'whatsapp',  label: 'WhatsApp',  icon: 'logo-whatsapp',    kb: 'phone-pad'     },
                { key: 'email',     label: 'Email',     icon: 'mail-outline',     kb: 'email-address' },
                { key: 'website',   label: 'Website',   icon: 'globe-outline',    kb: 'url'           },
                { key: 'instagram', label: 'Instagram', icon: 'logo-instagram',   kb: 'default'       },
              ].map(f => (
                <View key={f.key} className="flex-row items-center gap-x-2 border border-neutral-200 rounded-input px-sm py-xs bg-neutral-50">
                  <Icon name={f.icon} size={16} color="#156778" />
                  <TextInput
                    value={contact[f.key]}
                    onChangeText={v => setContact(prev => ({ ...prev, [f.key]: v }))}
                    placeholder={f.label}
                    placeholderTextColor="#9ca3af"
                    keyboardType={f.kb}
                    className="flex-1 text-sm text-neutral-800"
                  />
                </View>
              ))}
              <TouchableOpacity onPress={stopEditing} className="bg-success rounded-input py-xs items-center mt-xs">
                <Text className="text-neutral-white font-bold text-sm">Save Contact Info</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="gap-y-sm">
              {[
                { key: 'phone',     icon: 'call-outline',    color: '#10b981' },
                { key: 'whatsapp',  icon: 'logo-whatsapp',   color: '#25D366' },
                { key: 'email',     icon: 'mail-outline',    color: '#3b82f6' },
                { key: 'website',   icon: 'globe-outline',   color: '#6b7280' },
                { key: 'instagram', icon: 'logo-instagram',  color: '#e1306c' },
              ].filter(f => contact[f.key]).map(f => (
                <View key={f.key} className="flex-row items-center gap-x-sm">
                  <View className="w-8 h-8 rounded-xl items-center justify-center" style={{ backgroundColor: f.color + '18' }}>
                    <Icon name={f.icon} size={15} color={f.color} />
                  </View>
                  <Text className="text-sm text-neutral-700 font-medium">{contact[f.key]}</Text>
                </View>
              ))}
            </View>
          )}
        </SCard>

        {/* ══ Location ═════════════════════════════════════════════════════════ */}
        {editMode && editingSection === 'location' && (
          <SCard>
            <SHeader title="Edit Location" />
            <View className="gap-y-2">
              {[
                { key: 'address',  placeholder: 'Street address' },
                { key: 'city',     placeholder: 'City'           },
                { key: 'landmark', placeholder: 'Landmark'       },
                { key: 'parking',  placeholder: 'Parking info'   },
              ].map(f => (
                <TextInput
                  key={f.key}
                  value={location[f.key]}
                  onChangeText={v => setLocation(prev => ({ ...prev, [f.key]: v }))}
                  placeholder={f.placeholder}
                  placeholderTextColor="#9ca3af"
                  className="border border-neutral-200 rounded-input px-sm py-xs text-sm text-neutral-800 bg-neutral-50"
                />
              ))}
              <TouchableOpacity onPress={stopEditing} className="bg-success rounded-input py-xs items-center">
                <Text className="text-neutral-white font-bold text-sm">Save Location</Text>
              </TouchableOpacity>
            </View>
          </SCard>
        )}

        {/* ══ Opening Hours ════════════════════════════════════════════════════ */}
        <SCard>
          <TouchableOpacity onPress={() => setShowHours(v => !v)} activeOpacity={0.8}>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-bold text-neutral-800">Opening Hours</Text>
                {todayHours && (
                  <Text className="text-xs text-neutral-400 mt-0.5">
                    Today: {todayHours.start && todayHours.end ? `${todayHours.start} – ${todayHours.end}` : 'Closed'}
                  </Text>
                )}
              </View>
              <View className="flex-row items-center gap-x-2">
                <View className={`rounded-button px-xs py-1 ${isOpen ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <Text className={`text-xs font-bold ${isOpen ? 'text-success' : 'text-error'}`}>
                    {isOpen ? 'Open' : 'Closed'}
                  </Text>
                </View>
                {editMode && (
                  <TouchableOpacity onPress={(e) => { e.stopPropagation?.(); setEditingSection('hours'); }} className="bg-primary-50 rounded-xl p-1">
                    <Icon name="pencil-outline" size={12} color="#f43f5e" />
                  </TouchableOpacity>
                )}
                <Icon name={showHours ? 'chevron-up' : 'chevron-down'} size={18} color="#9ca3af" />
              </View>
            </View>
          </TouchableOpacity>

          {showHours && (
            <View className="mt-md">
              {openingHours.map((hour, i, arr) => {
                const isToday = hour.day === today;
                return (
                  <View
                    key={hour.day}
                    className={`flex-row justify-between items-center py-sm ${isToday ? 'bg-primary-50 rounded-input px-xs' : ''} ${!isToday && i < arr.length - 1 ? 'border-b border-neutral-100' : ''}`}
                    style={{ marginBottom: isToday ? 2 : 0 }}
                  >
                    <View className="flex-row items-center gap-x-2">
                      {isToday && <View className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
                      <Text className={`text-sm ${isToday ? 'font-bold text-primary-500' : 'font-medium text-neutral-700'}`}>
                        {hour.day}
                      </Text>
                    </View>
                    {hour.start && hour.end ? (
                      <Text className={`text-sm font-semibold ${isToday ? 'text-primary-500' : 'text-success'}`}>
                        {hour.start} – {hour.end}
                      </Text>
                    ) : (
                      <View className="bg-red-50 rounded-button px-xs py-0.5">
                        <Text className="text-xs font-bold text-error">Closed</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </SCard>

        {/* ══ Services ═════════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader
            title="Our Services"
            subtitle={`${MOCK_SERVICES.length} services available`}
            onEdit={() => navigation?.navigate?.('AddService')}
            onViewAll={() => navigation?.navigate?.('Services')}
            editMode={editMode}
          />
          <View className="gap-y-sm">
            {MOCK_SERVICES.map(service => (
              <View key={service.id} className="flex-row items-center justify-between bg-neutral-50 rounded-2xl px-sm py-xs border border-neutral-100">
                <View className="flex-1 mr-sm">
                  <Text className="text-sm font-bold text-neutral-800">{service.name}</Text>
                  <Text className="text-xs text-neutral-500 mt-0.5" numberOfLines={1}>{service.description}</Text>
                  <View className="flex-row items-center gap-x-2 mt-1">
                    <Text className="text-xs text-neutral-400">⏱ {service.durationMins} min</Text>
                    {service.discountPercent > 0 && (
                      <View className="bg-success/10 px-1.5 py-0.5 rounded-button">
                        <Text className="text-xs font-bold text-success">{service.discountPercent}% off</Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text className="text-base font-bold text-primary-500">₹{service.price}</Text>
              </View>
            ))}
          </View>
          {/* ── Service Management Shortcuts ── */}
          {editMode && (
            <View className="flex-row gap-x-2 mt-sm">
              {[
                { label: 'Categories', icon: 'list-outline',   nav: 'ManageCategories', color: '#8b5cf6', bg: '#f5f3ff' },
                { label: 'Add-ons',    icon: 'layers-outline', nav: 'ServiceAddOns',    color: '#10b981', bg: '#ecfdf5' },
                { label: 'Combos',     icon: 'gift-outline',   nav: 'ComboPackages',    color: '#3b82f6', bg: '#eff6ff' },
              ].map(s => (
                <TouchableOpacity
                  key={s.label}
                  onPress={() => navigation?.navigate?.(s.nav)}
                  className="flex-1 flex-row items-center justify-center gap-x-1 py-xs rounded-input border"
                  style={{ backgroundColor: s.bg, borderColor: s.color + '40' }}
                  activeOpacity={0.8}
                >
                  <Icon name={s.icon} size={13} color={s.color} />
                  <Text className="text-xs font-bold" style={{ color: s.color }}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </SCard>

        {/* ══ Amenities ════════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader title="Amenities" onEdit={() => setEditingSection('amenities')} editMode={editMode} />

          {editMode && editingSection === 'amenities' ? (
            <View>
              <View className="flex-row flex-wrap gap-2 mb-sm">
                {AMENITIES_LIST.map(a => {
                  const on = amenities[a.key];
                  return (
                    <TouchableOpacity
                      key={a.key}
                      onPress={() => setAmenities(prev => ({ ...prev, [a.key]: !prev[a.key] }))}
                      className={`flex-row items-center gap-x-1.5 px-sm py-1.5 rounded-button border ${on ? 'bg-teal-600 border-teal-600' : 'bg-neutral-white border-neutral-200'}`}
                    >
                      <Icon name={a.icon} size={13} color={on ? '#fff' : '#6b7280'} />
                      <Text className={`text-xs font-semibold ${on ? 'text-neutral-white' : 'text-neutral-600'}`}>{a.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity onPress={stopEditing} className="bg-success rounded-input py-xs items-center">
                <Text className="text-neutral-white font-bold text-sm">Save Amenities</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-2">
              {AMENITIES_LIST.filter(a => amenities[a.key]).map(a => (
                <View key={a.key} className="flex-row items-center gap-x-1.5 bg-teal-50 border border-teal-100 px-sm py-1 rounded-button">
                  <Icon name={a.icon} size={12} color="#156778" />
                  <Text className="text-xs font-semibold text-teal-600">{a.label}</Text>
                </View>
              ))}
              {!Object.values(amenities).some(Boolean) && (
                <Text className="text-xs text-neutral-400 italic">No amenities added yet</Text>
              )}
            </View>
          )}
        </SCard>

        {/* ══ Home Service Settings ════════════════════════════════════════════ */}
        <SCard>
          <SHeader title="Home Service" onEdit={() => setEditingSection('home')} editMode={editMode} />

          {editMode && editingSection === 'home' ? (
            <View className="gap-y-2">
              <TouchableOpacity
                onPress={() => setHomeService(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`flex-row items-center justify-between px-sm py-xs rounded-input border ${homeService.enabled ? 'bg-teal-50 border-teal-200' : 'bg-neutral-50 border-neutral-200'}`}
              >
                <View className="flex-row items-center gap-x-2">
                  <Icon name="home-outline" size={16} color={homeService.enabled ? '#156778' : '#9ca3af'} />
                  <Text className={`text-sm font-bold ${homeService.enabled ? 'text-teal-600' : 'text-neutral-400'}`}>
                    {homeService.enabled ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
                <View className={`w-11 h-6 rounded-button ${homeService.enabled ? 'bg-teal-600' : 'bg-neutral-300'} items-end justify-center px-0.5`}>
                  <View className={`w-5 h-5 rounded-full bg-neutral-white shadow-sm`} style={{ transform: [{ translateX: homeService.enabled ? 0 : 0 }] }} />
                </View>
              </TouchableOpacity>

              {homeService.enabled && (
                <>
                  <View className="flex-row gap-x-2">
                    <View className="flex-1">
                      <Text className="text-xs text-neutral-500 font-semibold mb-1">Service Radius (km)</Text>
                      <TextInput
                        value={homeService.radius}
                        onChangeText={v => setHomeService(p => ({ ...p, radius: v }))}
                        keyboardType="numeric"
                        className="border border-neutral-200 rounded-input px-sm py-xs text-sm text-neutral-800 bg-neutral-50"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs text-neutral-500 font-semibold mb-1">Extra Charge (₹)</Text>
                      <TextInput
                        value={homeService.extraCharge}
                        onChangeText={v => setHomeService(p => ({ ...p, extraCharge: v }))}
                        keyboardType="numeric"
                        className="border border-neutral-200 rounded-input px-sm py-xs text-sm text-neutral-800 bg-neutral-50"
                      />
                    </View>
                  </View>
                </>
              )}
              <TouchableOpacity onPress={stopEditing} className="bg-success rounded-input py-xs items-center">
                <Text className="text-neutral-white font-bold text-sm">Save Settings</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="gap-y-sm">
              <View className="flex-row items-center gap-x-2">
                <View className={`w-8 h-8 rounded-xl items-center justify-center ${homeService.enabled ? 'bg-teal-50' : 'bg-neutral-100'}`}>
                  <Icon name="home-outline" size={16} color={homeService.enabled ? '#156778' : '#9ca3af'} />
                </View>
                <Text className={`text-sm font-bold ${homeService.enabled ? 'text-teal-600' : 'text-neutral-400'}`}>
                  {homeService.enabled ? 'Home service enabled' : 'Home service disabled'}
                </Text>
              </View>
              {homeService.enabled && (
                <View className="flex-row gap-x-sm">
                  <View className="flex-row items-center gap-x-1 bg-teal-50 border border-teal-100 px-sm py-1 rounded-button">
                    <Icon name="navigate-outline" size={12} color="#156778" />
                    <Text className="text-xs font-semibold text-teal-600">{homeService.radius} km radius</Text>
                  </View>
                  <View className="flex-row items-center gap-x-1 bg-teal-50 border border-teal-100 px-sm py-1 rounded-button">
                    <Icon name="add-circle-outline" size={12} color="#156778" />
                    <Text className="text-xs font-semibold text-teal-600">+₹{homeService.extraCharge} charge</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </SCard>

        {/* ══ Gallery ══════════════════════════════════════════════════════════ */}
        <View className="bg-neutral-white mx-md mt-sm rounded-3xl shadow-card border border-neutral-100 overflow-hidden">
          <View className="px-md pt-md">
            <SHeader title="Gallery" onViewAll={() => {}} />
          </View>
          <View className="flex-row px-md gap-x-2 pb-md">
            <View className="flex-1 gap-y-2">
              {MOCK_IMAGES.slice(0, 2).map((img, i) => (
                <Image key={i} source={img} style={{ width: '100%', height: i === 0 ? 140 : 100, borderRadius: 14 }} resizeMode="cover" />
              ))}
            </View>
            <View className="flex-1 gap-y-2">
              {MOCK_IMAGES.slice(2, 4).map((img, i) => (
                <View key={i} style={{ position: 'relative' }}>
                  <Image source={img} style={{ width: '100%', height: i === 0 ? 100 : 140, borderRadius: 14 }} resizeMode="cover" />
                  {i === 1 && (
                    <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                      <Text className="text-neutral-white text-xl font-black">+12</Text>
                      <Text className="text-neutral-white/80 text-xs mt-0.5">More photos</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ══ Specialists ══════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader
            title="Our Specialists"
            subtitle="Meet the team"
            onEdit={() => navigation?.navigate?.('Specialist')}
            onViewAll={() => navigation?.navigate?.('Specialist')}
            editMode={editMode}
          />
          {specialists.length === 0 ? (
            <View className="items-center py-xl gap-y-2">
              <View className="w-14 h-14 rounded-full bg-primary-50 items-center justify-center">
                <Icon name="people-outline" size={26} color="#fda4af" />
              </View>
              <Text className="text-sm font-bold text-neutral-700">No specialists yet</Text>
              <Text className="text-xs text-neutral-400">Add your team to attract more customers</Text>
              <TouchableOpacity onPress={() => navigation?.navigate?.('Specialist')} className="mt-xs bg-primary-500 rounded-button px-md py-xs">
                <Text className="text-neutral-white font-bold text-xs">+ Add Specialist</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
              {specialists.map(s => (
                <View key={s._id} className="items-center w-20 gap-y-1">
                  <Image source={{ uri: s.image }} className="w-16 h-16 rounded-full bg-neutral-200" style={{ borderWidth: 2, borderColor: '#fecdd3' }} />
                  <Text className="text-xs font-bold text-neutral-800 text-center" numberOfLines={1}>{s.name}</Text>
                  <Text className="text-xs text-neutral-400 text-center" numberOfLines={1}>{s.role}</Text>
                  <View className="flex-row items-center gap-x-0.5">
                    <Icon name="star" size={10} color="#f59e0b" />
                    <Text className="text-xs font-bold text-yellow-700">{s.rating}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </SCard>

        {/* ══ Policies ═════════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader title="Salon Policies" onEdit={() => setEditingSection('policies')} editMode={editMode} />

          {editMode && editingSection === 'policies' ? (
            <View className="gap-y-2">
              {[
                { key: 'cancellation', label: 'Cancellation Policy' },
                { key: 'late',         label: 'Late Arrival Policy' },
                { key: 'payment',      label: 'Payment Policy'      },
                { key: 'children',     label: 'Children Policy'     },
              ].map(f => (
                <View key={f.key}>
                  <Text className="text-xs font-semibold text-neutral-500 mb-1">{f.label}</Text>
                  <TextInput
                    value={policies[f.key]}
                    onChangeText={v => setPolicies(prev => ({ ...prev, [f.key]: v }))}
                    multiline
                    placeholder={f.label}
                    placeholderTextColor="#9ca3af"
                    className="border border-neutral-200 rounded-input px-sm py-xs text-sm text-neutral-700 bg-neutral-50"
                    style={{ minHeight: 52, textAlignVertical: 'top' }}
                  />
                </View>
              ))}
              <TouchableOpacity onPress={stopEditing} className="bg-success rounded-input py-xs items-center mt-xs">
                <Text className="text-neutral-white font-bold text-sm">Save Policies</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="gap-y-sm">
              {[
                { key: 'cancellation', icon: 'close-circle-outline',  color: '#ef4444', label: 'Cancellation' },
                { key: 'late',         icon: 'time-outline',           color: '#f59e0b', label: 'Late Arrival' },
                { key: 'payment',      icon: 'card-outline',           color: '#3b82f6', label: 'Payment'      },
                { key: 'children',     icon: 'happy-outline',          color: '#8b5cf6', label: 'Children'     },
              ].map(f => (
                <View key={f.key} className="flex-row items-start gap-x-sm">
                  <View className="w-8 h-8 rounded-xl items-center justify-center mt-0.5" style={{ backgroundColor: f.color + '18' }}>
                    <Icon name={f.icon} size={15} color={f.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs font-bold text-neutral-500 mb-0.5">{f.label}</Text>
                    <Text className="text-sm text-neutral-700 leading-relaxed">{policies[f.key]}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </SCard>

        {/* ══ Reviews ══════════════════════════════════════════════════════════ */}
        <SCard>
          <SHeader title="Reviews" onViewAll={() => {}} />

          {/* Rating summary */}
          <View className="flex-row items-center gap-x-md bg-primary-50 rounded-2xl p-sm mb-sm">
            <View className="items-center">
              <Text className="text-4xl font-black text-primary-500" style={{ lineHeight: 44 }}>{rating}</Text>
              <StarRow rating={Math.round(parseFloat(rating))} size={14} />
              <Text className="text-xs text-neutral-400 mt-1">{MOCK_REVIEWS.length} reviews</Text>
            </View>
            <View className="flex-1 gap-y-1">
              {[{ s: 5, p: 70 }, { s: 4, p: 20 }, { s: 3, p: 6 }, { s: 2, p: 3 }, { s: 1, p: 1 }].map(({ s, p }) => (
                <View key={s} className="flex-row items-center gap-x-1.5">
                  <Text className="text-xs text-neutral-500 w-2">{s}</Text>
                  <View className="flex-1 h-1.5 bg-primary-100 rounded-button overflow-hidden">
                    <View style={{ width: `${p}%` }} className="h-full bg-primary-500 rounded-button" />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Review cards — read only, owner can reply */}
          <View className="gap-y-sm">
            {reviews.map(review => (
              <View key={review.id} className="bg-neutral-50 rounded-2xl p-sm border border-neutral-100">
                <View className="flex-row items-start gap-x-sm mb-xs">
                  <View className="w-9 h-9 rounded-full bg-primary-100 items-center justify-center">
                    <Text className="text-sm font-bold text-primary-500">{review.userName[0]}</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-sm font-bold text-neutral-800">{review.userName}</Text>
                      <Text className="text-xs text-neutral-400">{review.date}</Text>
                    </View>
                    <StarRow rating={review.rating} size={11} />
                  </View>
                </View>
                <Text className="text-sm text-neutral-600 leading-relaxed">{review.comment}</Text>

                {/* Owner reply */}
                {review.ownerReply && (
                  <View className="mt-xs bg-teal-50 border border-teal-100 rounded-input p-xs">
                    <View className="flex-row items-center gap-x-1 mb-0.5">
                      <Icon name="storefront-outline" size={12} color="#156778" />
                      <Text className="text-xs font-bold text-teal-600">Owner Reply</Text>
                    </View>
                    <Text className="text-xs text-teal-700 leading-relaxed">{review.ownerReply}</Text>
                  </View>
                )}

                {/* Reply input */}
                {replyingTo === review.id ? (
                  <View className="mt-xs flex-row items-center gap-x-2">
                    <TextInput
                      value={replyDraft}
                      onChangeText={setReplyDraft}
                      placeholder="Write a reply…"
                      placeholderTextColor="#9ca3af"
                      className="flex-1 border border-neutral-200 rounded-input px-sm py-xs text-xs text-neutral-800 bg-neutral-white"
                    />
                    <TouchableOpacity onPress={() => submitReply(review.id)} className="bg-teal-600 px-sm py-xs rounded-input">
                      <Text className="text-neutral-white text-xs font-bold">Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setReplyingTo(null); setReplyDraft(''); }}>
                      <Icon name="close" size={16} color="#9ca3af" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  !review.ownerReply && (
                    <TouchableOpacity
                      onPress={() => setReplyingTo(review.id)}
                      className="mt-xs flex-row items-center gap-x-1 self-start"
                    >
                      <Icon name="chatbubble-outline" size={13} color="#156778" />
                      <Text className="text-xs font-semibold text-teal-600">Reply</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            ))}
          </View>
        </SCard>

      </ScrollView>
    </SafeAreaView>
  );
}