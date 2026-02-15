import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { logoutUser } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAndGoToSalonRegistration } from '../../utils/NavigationHelper';

// Menu Items
const MENU_ITEMS = [
  {
    id: 1,
    title: 'My Profile',
    subtitle: 'View and edit profile',
    icon: 'person',
    section: 'account',
  },
  {
    id: 2,
    title: 'Bookings',
    subtitle: 'View your bookings',
    icon: 'calendar',
    section: 'account',
  },
  {
    id: 3,
    title: 'Saved Salons',
    subtitle: 'Your favorite salons',
    icon: 'heart',
    section: 'account',
  },
  {
    id: 4,
    title: 'Refer & Earn',
    subtitle: 'Earn rewards with referral',
    icon: 'gift',
    section: 'rewards',
    badge: 'New',
  },
  {
    id: 5,
    title: 'Promotions',
    subtitle: 'Active deals & offers',
    icon: 'pricetag',
    section: 'rewards',
  },
  {
    id: 6,
    title: 'Wallet',
    subtitle: 'Check your balance',
    icon: 'wallet',
    section: 'rewards',
  },
  {
    id: 7,
    title: 'About Us',
    subtitle: 'Learn more about us',
    icon: 'information-circle',
    section: 'other',
  },
  {
    id: 8,
    title: 'Privacy Policy',
    subtitle: 'Terms & conditions',
    icon: 'lock-closed',
    section: 'other',
  },
  {
    id: 9,
    title: 'Notification Preferences',
    subtitle: 'Manage notifications',
    icon: 'notifications',
    section: 'other',
  },
  {
    id: 10,
    title: 'Contact Us',
    subtitle: 'Get in touch',
    icon: 'call',
    section: 'other',
  },
  {
    id: 11,
    title: 'Earn With Us',
    subtitle: 'Become a partner',
    icon: 'briefcase',
    section: 'earnwithus',
  },
];

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
        Alert.alert(item.title, `${item.subtitle} - Coming soon!`);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  const renderMenuSection = (sectionTitle, sectionKey) => {
    const items = MENU_ITEMS.filter(item => item.section === sectionKey);

    if (items.length === 0) return null;

    return (
      <View key={sectionKey} className="mx-4 my-3">
        {sectionTitle && (
          <Text className="text-xs font-semibold text-[#999] mb-2 ml-1 uppercase">
            {sectionTitle}
          </Text>
        )}
        <View
          className="bg-white rounded-xl overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row justify-between items-center px-4 py-3.5 ${
                index !== items.length - 1 ? 'border-b border-[#f0f0f0]' : ''
              }`}
              onPress={() => handleMenuPress(item)}
            >
              <View className="flex-1 flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-[#f0f0f0] justify-center items-center mr-3">
                  <Icon name={item.icon} size={22} color="#156778" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-[#333]">
                    {item.title}
                  </Text>
                  <Text className="text-[11px] text-[#999] mt-0.5">
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                {item.badge && (
                  <View className="bg-[#4CAF50] px-2 py-0.5 rounded">
                    <Text className="text-[10px] font-semibold text-white">
                      {item.badge}
                    </Text>
                  </View>
                )}
                <Icon name="chevron-forward" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // If not logged in, show login prompt
  if (!user) {
    return (
      <View className="flex-1 bg-[#f5f5f5]">
        <View className="bg-[#156778] px-4 py-4 flex-row items-center justify-between">
          <TouchableOpacity className="p-2">
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-white">Your Profile</Text>
          <View className="w-10" />
        </View>

        <View className="flex-1 justify-center items-center px-7">
          <Icon name="person-circle" size={80} color="#ddd" />
          <Text className="text-xl font-bold text-[#333] mt-5">
            Sign In Required
          </Text>
          <Text className="text-sm text-[#666] text-center mt-2.5 mb-7">
            Please login to access your profile
          </Text>
          <TouchableOpacity
            className="bg-[#7C5FED] px-7 py-3 rounded-lg"
            onPress={() => navigation?.navigate('Auth')}
          >
            <Text className="text-sm font-semibold text-white">
              Sign In Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#156778]">
      <StatusBar barStyle="light-content" backgroundColor="#156778" />
      <View className="flex-1 bg-[#f5f5f5]">
        <ScrollView className="pb-7">
          {/* Header */}
          <View className="bg-[#156778] px-4 py-4 flex-row items-center justify-between">
            <TouchableOpacity className="p-2">
              <Icon name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">Your Profile</Text>
            <View className="w-10" />
          </View>

          {/* User Info Card */}
          <View
            className="bg-white mx-4 my-4 rounded-xl p-4 flex-row items-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <Image
              source={{
                uri: user?.image || 'https://via.placeholder.com/80?text=User',
              }}
              className="w-[60px] h-[60px] rounded-full bg-[#e0e0e0]"
            />
            <View className="flex-1 ml-3">
              <Text className="text-base font-bold text-[#333]">
                {user?.name || 'User'}
              </Text>
              <Text className="text-xs text-[#666] mt-1">
                {user?.email || 'email@example.com'}
              </Text>
              <Text className="text-xs text-[#999] mt-0.5">
                {user?.phone || '+91 XXXXX XXXXX'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HomeTab', { screen: 'ProfileEditScreen' })
              }
              className="p-2"
            >
              <Icon name="pencil" size={18} color="#156778" />
            </TouchableOpacity>
          </View>

          {/* Menu Sections */}
          {renderMenuSection(null, 'account')}
          {renderMenuSection('Earn With Us', 'earnwithus')}
          {renderMenuSection('Rewards', 'rewards')}
          {renderMenuSection('Other Information', 'other')}

          {/* Logout Button */}
          <View className="mx-4 my-6">
            <TouchableOpacity
              className="flex-row justify-center items-center border-2 border-[#f44336] rounded-[10px] py-3 gap-1.5"
              onPress={handleLogout}
            >
              <Icon name="log-out" size={18} color="#f44336" />
              <Text className="text-sm font-semibold text-[#f44336]">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
