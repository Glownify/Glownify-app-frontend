import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'react-native-linear-gradient';
import { fetchAllSalonsByCategory } from '../../redux/slices/userSlice';
import AppHeader, { HeaderIconButton } from '../../components/common/Header'; // TODO: adjust path

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns, 16px side padding + 16px gap

const FILTERS = ['All', 'Hairs', 'Spa', 'Nails', 'Coloring', 'Wax', 'Makeup', 'Facial', 'Manicure'];

// ── Salon Card ───────────────────────────────────────────────────────────────
const SalonCard = ({ item, onPress }) => (
  <TouchableOpacity
    className="bg-neutral-white rounded-2xl overflow-hidden mb-md"
    style={{
      width: CARD_WIDTH,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
    }}
    onPress={onPress}
    activeOpacity={0.85}
  >
    {/* Image */}
    <View className="w-full relative" style={{ height: 130 }}>
      <Image
        source={require('../../assets/salonInterior.jpg')}
        className="w-full h-full"
        resizeMode="cover"
        // TODO: replace with item.images?.[0] from API
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.65)']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60 }}
      />

      {/* Rating — top left */}
      <View className="absolute top-2 left-2 flex-row items-center bg-success px-1.5 py-0.5 rounded-lg">
        <Icon name="star" size={10} color="#fff" />
        <Text className="text-white text-xs font-bold ml-0.5">
          {item.rating ?? '4.8'}
          {/* TODO: item.rating from API */}
        </Text>
      </View>

      {/* Heart — top right */}
      <TouchableOpacity
        className="absolute top-2 right-2 w-7 h-7 rounded-full items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
        onPress={() => { /* TODO: toggle favourite */ }}
      >
        <Icon name="heart-outline" size={14} color="#fff" />
      </TouchableOpacity>

      {/* Distance — bottom left */}
      <View
        className="absolute bottom-2 left-2 flex-row items-center px-2 py-0.5 rounded-full"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <Icon name="location" size={10} color="#fff" />
        <Text className="text-white text-xs font-semibold ml-0.5">
          {(item.distanceInMeters / 1000).toFixed(1)} km
          {/* TODO: item.distanceInMeters from API */}
        </Text>
      </View>
    </View>

    {/* Card body */}
    <View className="p-sm">
      <Text className="text-sm font-bold text-neutral-900 mb-1" numberOfLines={1}>
        {item.shopName}
        {/* TODO: item.shopName from API */}
      </Text>

      {/* Service snippets */}
      <View className="mb-sm">
        {[
          { label: 'Haircut', price: '299' },
          { label: 'Wax',     price: '459' },
          { label: 'Facial',  price: '99'  },
          // TODO: replace with item.topServices from API
        ].map(s => (
          <View key={s.label} className="flex-row items-center mb-0.5">
            <Icon name="cut-outline" size={10} color="#f43f5e" />
            <Text className="text-xs text-neutral-500 ml-1">{s.label} · ₹{s.price}</Text>
          </View>
        ))}
      </View>

      {/* Book button */}
      <TouchableOpacity
        className="flex-row items-center justify-center bg-primary py-1.5 rounded-xl"
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text className="text-xs font-bold text-neutral-white mr-1">Book</Text>
        <Icon name="arrow-forward" size={10} color="#fff" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
// ─────────────────────────────────────────────────────────────────────────────

export default function AllSalonListScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { allSalons, loading, error } = useSelector(state => state.user);
  const { category, subCat, lat, lng } = route.params;

  const [searchQuery,  setSearchQuery]  = useState('');
  const [activeFilter, setActiveFilter] = useState(subCat ?? 'All');

  useEffect(() => {
    if (category && lat && lng) {
      dispatch(fetchAllSalonsByCategory({ category, subCat, lat, lng }));
    }
  }, [category, subCat, lat, lng, dispatch]);

  const filteredSalons = (allSalons ?? []).filter(s =>
    s.shopName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary">
      {/* ── Header ── */}
      <AppHeader
        title="Popular Near Me"
        onBack={() => navigation.goBack()}
        variant="primary"
        noBorder={true}
        rightElement={
          <HeaderIconButton
            name="options-outline"
            onPress={() => { /* TODO: open filter/sort sheet */ }}
            color="#fff"
          />
        }
      />

      {/* Subtitle — salon count */}
      {!loading && (
        <View className="items-center pb-sm" style={{ backgroundColor: 'transparent' }}>
          <Text className="text-xs font-medium text-neutral-white" style={{ opacity: 0.75 }}>
            {filteredSalons.length} salons found
          </Text>
        </View>
      )}

      {/* ── Content panel ── */}
      <View className="flex-1 bg-neutral-100 rounded-t-3xl overflow-hidden">

        {/* Search bar */}
        <View className="bg-neutral-white px-md pt-md pb-sm border-b border-neutral-100">
          <View className="flex-row items-center bg-neutral-100 rounded-2xl px-sm h-11">
            <Icon name="search-outline" size={18} color="#9ca3af" />
            <TextInput
              className="flex-1 text-sm text-neutral-800 ml-2"
              placeholder="Search salons..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={18} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>

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
                  <Text
                    className={`text-sm font-semibold ${
                      isActive ? 'text-neutral-white' : 'text-neutral-600'
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ── States: loading / error / empty / grid ── */}
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#f43f5e" />
            <Text className="text-sm text-neutral-400 mt-sm font-medium">Loading salons...</Text>
          </View>

        ) : error ? (
          <View className="flex-1 items-center justify-center px-xl">
            <View
              className="w-20 h-20 rounded-3xl bg-red-50 items-center justify-center mb-md"
              style={{ elevation: 2 }}
            >
              <Icon name="alert-circle-outline" size={40} color="#ef4444" />
            </View>
            <Text className="text-base font-bold text-neutral-800">Something went wrong</Text>
            <Text className="text-sm text-neutral-400 text-center mt-1 mb-lg">{error}</Text>
            <TouchableOpacity
              className="bg-primary px-xl py-sm rounded-2xl"
              onPress={() => dispatch(fetchAllSalonsByCategory({ category, lat, lng }))}
            >
              <Text className="text-sm font-bold text-neutral-white">Retry</Text>
            </TouchableOpacity>
          </View>

        ) : filteredSalons.length === 0 ? (
          <View className="flex-1 items-center justify-center px-xl">
            <View
              className="w-20 h-20 rounded-3xl bg-neutral-white items-center justify-center mb-md"
              style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
            >
              <Icon name="storefront-outline" size={40} color="#d1d5db" />
            </View>
            <Text className="text-base font-bold text-neutral-700">No salons found</Text>
            <Text className="text-sm text-neutral-400 text-center mt-1">
              Try adjusting your search or filters
            </Text>
          </View>

        ) : (
          <FlatList
            data={filteredSalons}
            keyExtractor={item => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <SalonCard
                item={item}
                onPress={() => navigation.navigate('ShopDetailsFull', { salonId: item._id })}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}