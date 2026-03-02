import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../../components/common/Header'; // TODO: adjust path

// ─── Mock data (replace with API response) ───────────────────────────────────
const PROFESSIONALS = [
  { id: '1', name: 'Ashok Sinha',    location: 'Banjara Hills, Hyderabad', categories: 'Hair · Facial', rating: 4.7, reviews: '2.7k', distance: '5.1km', gender: 'female', image: require('../../../assets/profileImg.jpg') },
  { id: '2', name: 'Kumar Roy',      location: 'Hitech City, Madhapur, Hyderabad', categories: 'Hair · Facial', rating: 4.5, reviews: '2.8k', distance: '3.2km', gender: 'female', image: require('../../../assets/profileImg.jpg') },
  { id: '3', name: 'Vinit Singh',    location: 'Nexus Mall, Hyderabad', categories: 'Hair · Facial', rating: 4.3, reviews: '1.7k', distance: '6.8km', gender: 'male',   image: require('../../../assets/profileImg.jpg') },
  { id: '4', name: 'Dinesh Kapoor',  location: 'Kondapur, Hyderabad', categories: 'Hair · Spa',    rating: 4.9, reviews: '3.1k', distance: '2.4km', gender: 'male',   image: require('../../../assets/profileImg.jpg') },
];

const FILTERS = ['All', 'Hair', 'Nails', 'Facial', 'Color', 'Makeup'];
// ─────────────────────────────────────────────────────────────────────────────

// ── Professional Card ─────────────────────────────────────────────────────────
const ProfessionalCard = ({ item, onPress }) => (
  <TouchableOpacity
    className="flex-row bg-neutral-white rounded-3xl p-md mb-sm items-center"
    style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 } }}
    onPress={onPress}
    activeOpacity={0.82}
  >
    {/* Avatar + rating badge */}
    <View className="relative mr-md">
      <Image
        source={item.image}
        // TODO: replace with { uri: item.avatarUrl } from API
        className="w-[72px] h-[72px] rounded-2xl border-2 border-primary-100"
      />
      {/* Rating pill */}
      <View
        className="absolute -bottom-2 -left-1 flex-row items-center bg-success px-1.5 py-0.5 rounded-full border-2 border-neutral-white"
        style={{ elevation: 2 }}
      >
        <Icon name="star" size={10} color="#fff" />
        <Text className="text-white text-xs font-bold ml-0.5">
          {item.rating}
          {/* TODO: item.rating from API */}
        </Text>
      </View>
    </View>

    {/* Info */}
    <View className="flex-1">
      {/* Name + discount */}
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-base font-bold text-primary" numberOfLines={1} style={{ flex: 1 }}>
          {item.name}
          {/* TODO: item.name from API */}
        </Text>
        {item.discount && (
          <View className="bg-primary-50 border border-primary-200 px-1.5 py-0.5 rounded-lg ml-2">
            <Text className="text-xs font-bold text-primary">{item.discount}</Text>
          </View>
        )}
      </View>

      {/* Location */}
      <View className="flex-row items-center mb-1">
        <Icon name="location-outline" size={12} color="#9ca3af" />
        <Text className="text-xs text-neutral-400 ml-1 flex-1" numberOfLines={1}>
          {item.location}
          {/* TODO: item.location from API */}
        </Text>
      </View>

      {/* Categories */}
      <View className="flex-row items-center mb-1">
        <Icon name="briefcase-outline" size={12} color="#9ca3af" />
        <Text className="text-xs text-neutral-500 ml-1">{item.categories}</Text>
      </View>

      {/* Services */}
      <View className="flex-row items-center mb-sm">
        <Icon name="cut-outline" size={12} color="#9ca3af" />
        <Text className="text-xs text-neutral-500 ml-1">Makeup · Wax · Spa</Text>
        {/* TODO: item.topServices from API */}
      </View>

      {/* Footer row — gender badge + distance + chevron */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {/* Gender badge */}
          <View className="flex-row items-center bg-primary-50 px-2 py-0.5 rounded-full">
            <Icon
              name={item.gender === 'female' ? 'female-outline' : 'male-outline'}
              size={11}
              color="#f43f5e"
            />
            <Text className="text-xs font-semibold text-primary ml-0.5 uppercase">
              {item.gender}
            </Text>
          </View>

          {/* Distance */}
          <View className="flex-row items-center bg-neutral-100 px-2 py-0.5 rounded-full">
            <Icon name="navigate-outline" size={11} color="#6b7280" />
            <Text className="text-xs font-medium text-neutral-500 ml-0.5">
              {item.distance}
              {/* TODO: item.distance from API */}
            </Text>
          </View>
        </View>

        {/* Reviews */}
        <Text className="text-xs text-neutral-400">{item.reviews} reviews</Text>
      </View>
    </View>

    {/* Chevron */}
    <View className="pl-sm">
      <Icon name="chevron-forward" size={18} color="#d1d5db" />
    </View>
  </TouchableOpacity>
);
// ─────────────────────────────────────────────────────────────────────────────

export default function ProfessionalsListScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary">
      <AppHeader
        title="Nearby Specialists"
        onBack={() => navigation.goBack()}
        variant="primary"
      />

      {/* ── Content panel ── */}
      <View className="flex-1 bg-neutral-100 rounded-t-3xl overflow-hidden">

        {/* Filter chips */}
        <View className="bg-neutral-white border-b border-neutral-100">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
          >
            {FILTERS.map(filter => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  className={`px-md py-1.5 rounded-full border ${
                    isActive
                      ? 'bg-primary border-primary'
                      : 'bg-neutral-50 border-neutral-200'
                  }`}
                  onPress={() => setActiveFilter(filter)}
                  activeOpacity={0.75}
                >
                  <Text className={`text-sm font-semibold ${isActive ? 'text-neutral-white' : 'text-neutral-600'}`}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Results count */}
        <View className="px-md py-sm bg-neutral-white border-b border-neutral-100">
          <Text className="text-xs font-medium text-neutral-400">
            {PROFESSIONALS.length} specialists found
            {/* TODO: replace with filteredProfessionals.length from API */}
          </Text>
        </View>

        {/* List */}
        <FlatList
          data={PROFESSIONALS}
          // TODO: replace PROFESSIONALS with filtered API data
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <ProfessionalCard
              item={item}
              onPress={() => navigation.navigate('ProfessionalDetailScreen', { professionalId: item.id })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}