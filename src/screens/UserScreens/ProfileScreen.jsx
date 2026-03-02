import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
import { logoutAndGoToSalonRegistration } from '../../utils/NavigationHelper';
import AppHeader, { HeaderIconButton } from '../../components/common/Header'; // TODO: adjust path

// ─── Menu config ─────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: 1,  title: 'My Profile',               subtitle: 'View and edit profile',      icon: 'person-outline',           section: 'account'    },
  { id: 2,  title: 'Bookings',                  subtitle: 'View your bookings',          icon: 'calendar-outline',         section: 'account'    },
  { id: 3,  title: 'Saved Salons',              subtitle: 'Your favorite salons',        icon: 'heart-outline',            section: 'account'    },
  { id: 4,  title: 'Refer & Earn',              subtitle: 'Earn rewards with referral',  icon: 'gift-outline',             section: 'rewards',   badge: 'New' },
  { id: 5,  title: 'Promotions',                subtitle: 'Active deals & offers',       icon: 'pricetag-outline',         section: 'rewards'    },
  { id: 6,  title: 'Wallet',                    subtitle: 'Check your balance',          icon: 'wallet-outline',           section: 'rewards'    },
  { id: 7,  title: 'About Us',                  subtitle: 'Learn more about us',         icon: 'information-circle-outline', section: 'other'  },
  { id: 8,  title: 'Privacy Policy',            subtitle: 'Terms & conditions',          icon: 'lock-closed-outline',      section: 'other'      },
  { id: 9,  title: 'Notification Preferences',  subtitle: 'Manage notifications',        icon: 'notifications-outline',    section: 'other'      },
  { id: 10, title: 'Contact Us',                subtitle: 'Get in touch',                icon: 'call-outline',             section: 'other'      },
  { id: 11, title: 'Earn With Us',              subtitle: 'Become a partner',            icon: 'briefcase-outline',        section: 'earnwithus' },
];

// Icon bg tints per section
const ICON_TINT = {
  account:    { bg: 'bg-primary-50',  color: '#f43f5e' },
  rewards:    { bg: 'bg-yellow-50',   color: '#f59e0b' },
  other:      { bg: 'bg-neutral-100', color: '#6b7280' },
  earnwithus: { bg: 'bg-teal-50',     color: '#14b8a6' },
};

const SECTION_LABELS = {
  account:    null,
  earnwithus: 'Earn With Us',
  rewards:    'Rewards',
  other:      'Other Information',
};
// ─────────────────────────────────────────────────────────────────────────────

export default function UserProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleMenuPress = item => {
    switch (item.title) {
      case 'Bookings':
        navigation.navigate('HomeTab', { screen: 'UserBookingsScreen' });
        break;
      case 'My Profile':
        navigation.navigate('HomeTab', { screen: 'ProfileEditScreen' });
        break;
      case 'Earn With Us':
        logoutAndGoToSalonRegistration(navigation, dispatch);
        break;
      default:
        Alert.alert(item.title, `${item.subtitle} — Coming soon!`);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => dispatch(logoutUser()) },
    ]);
  };

  const renderMenuSection = sectionKey => {
    const items = MENU_ITEMS.filter(i => i.section === sectionKey);
    if (!items.length) return null;
    const label = SECTION_LABELS[sectionKey];
    const tint  = ICON_TINT[sectionKey] ?? ICON_TINT.other;

    return (
      <View key={sectionKey} className="mx-md mb-sm">
        {label && (
          <Text className="text-xs font-semibold text-neutral-400 mb-2 ml-1 uppercase tracking-wider">
            {label}
          </Text>
        )}
        <View
          className="bg-neutral-white rounded-2xl overflow-hidden"
          style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } }}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-md py-sm ${index !== items.length - 1 ? 'border-b border-neutral-100' : ''}`}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              {/* Icon */}
              <View className={`w-9 h-9 rounded-xl items-center justify-center mr-sm ${tint.bg}`}>
                <Ionicons name={item.icon} size={18} color={tint.color} />
              </View>

              {/* Text */}
              <View className="flex-1">
                <Text className="text-sm font-semibold text-neutral-800">{item.title}</Text>
                <Text className="text-xs text-neutral-400 mt-0.5">{item.subtitle}</Text>
              </View>

              {/* Badge + chevron */}
              <View className="flex-row items-center gap-2">
                {item.badge && (
                  <View className="bg-success px-2 py-0.5 rounded-full">
                    <Text className="text-xs font-bold text-white">{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <SafeAreaView edges={['top']} className="flex-1 bg-primary">
        <AppHeader title="Your Profile" variant="primary" />
        <View className="flex-1 bg-neutral-100 rounded-t-3xl justify-center items-center px-xl">
          <View
            className="w-24 h-24 rounded-3xl bg-neutral-white items-center justify-center mb-lg"
            style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
          >
            <Ionicons name="person-circle-outline" size={52} color="#d1d5db" />
          </View>
          <Text className="text-xl font-bold text-neutral-800">Sign In Required</Text>
          <Text className="text-sm text-neutral-400 text-center mt-2 mb-lg leading-5">
            Please login to access your profile and bookings
          </Text>
          <TouchableOpacity
            className="bg-primary px-xl py-sm rounded-2xl"
            onPress={() => navigation?.navigate('Auth')}
          >
            <Text className="text-sm font-bold text-neutral-white">Sign In Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Logged in ──────────────────────────────────────────────────────────────
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary">
      <AppHeader
        title="Your Profile"
        variant="primary"
        rightElement={
          <HeaderIconButton
            name="settings-outline"
            onPress={() => Alert.alert('Settings', 'Coming soon!')}
            color="#fff"
          />
        }
      />

      <ScrollView
        className="flex-1 bg-neutral-100 rounded-t-3xl"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
      >
        {/* ── User Info Card ── */}
        <View
          className="mx-md mb-lg bg-neutral-white rounded-3xl overflow-hidden"
          style={{ elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } }}
        >
          {/* Primary banner */}
          <View className="bg-white h-14 w-full" />

          <View className="px-md pb-md" style={{ marginTop: -32 }}>
            {/* Avatar row */}
            <View className="flex-row items-end justify-between mb-sm">
              <Image
                source={{ uri: user?.image || 'https://i.pravatar.cc/150?img=12' }}
                className="w-16 h-16 rounded-2xl border-4 border-neutral-white"
                // TODO: replace with user.image from API
              />
              <TouchableOpacity
                className="flex-row items-center bg-primary-50 border border-primary-200 px-sm py-1.5 rounded-xl mb-1"
                onPress={() => navigation.navigate('HomeTab', { screen: 'ProfileEditScreen' })}
              >
                <Ionicons name="pencil-outline" size={13} color="#f43f5e" />
                <Text className="text-xs font-semibold text-primary ml-1">Edit Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Name / email / phone */}
            <Text className="text-lg font-bold text-neutral-900">
              {user?.name || 'User'}
              {/* TODO: user.name from auth slice */}
            </Text>
            <Text className="text-xs text-neutral-500 mt-0.5">
              {user?.email || 'email@example.com'}
            </Text>
            <Text className="text-xs text-neutral-400 mt-0.5">
              {user?.phone || '+91 XXXXX XXXXX'}
            </Text>

            {/* Quick stats strip */}
            <View className="flex-row mt-md pt-md border-t border-neutral-100">
              {[
                { label: 'Bookings',  value: '12',   icon: 'calendar-outline'  },
                { label: 'Saved',     value: '5',    icon: 'heart-outline'     },
                { label: 'Wallet',    value: '₹299', icon: 'wallet-outline'    },
              ].map((stat, i) => (
                <View key={stat.label} className={`flex-1 items-center ${i !== 2 ? 'border-r border-neutral-100' : ''}`}>
                  <Ionicons name={stat.icon} size={16} color="#f43f5e" />
                  <Text className="text-sm font-bold text-neutral-900 mt-1">{stat.value}</Text>
                  <Text className="text-xs text-neutral-400">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Menu Sections ── */}
        {renderMenuSection('account')}
        {renderMenuSection('earnwithus')}
        {renderMenuSection('rewards')}
        {renderMenuSection('other')}

        {/* ── Logout ── */}
        <View className="mx-md mt-sm mb-xl">
          <TouchableOpacity
            className="flex-row justify-center items-center border-2 border-error rounded-2xl py-sm gap-1.5"
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            <Text className="text-sm font-semibold text-error">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App version */}
        <Text className="text-xs text-neutral-300 text-center">Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}