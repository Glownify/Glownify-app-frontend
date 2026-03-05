import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Mock Data ---
const recentSearches = [
  { id: '1', term: 'Hair service' },
  { id: '2', term: 'Nail' },
  { id: '3', term: 'Wax' },
];

const popularSearches = ['Hair', 'Nails', 'Coloring', 'Message', 'Facials'];

const suggestionData = [
  {
    id: '1',
    name: 'Lakme Salon',
    location: 'Banjara hills, Hyderabad..',
    categories: 'Hair . Facial',
    rating: 4.7,
    reviews: '2.7k',
    discount: '-58%',
    image: require('../../assets/image.png'),
  },
  {
    id: '2',
    name: 'Lovely Lather',
    location: 'Hitech city road, Madhapur..',
    categories: 'Hair . Facial',
    rating: 4.5,
    reviews: '2.8k',
    discount: '-58%',
    image: require('../../assets/image.png'),
  },
];

// --- Reusable Salon Card ---
const SalonCard = ({ item }) => (
  <TouchableOpacity className="flex-row bg-white rounded-xl mb-4 h-36 border border-neutral-100 shadow-sm">
    {/* Image */}
    <View className="w-32 h-full relative">
      <Image source={item.image} className="w-full h-full rounded-xl" />
      <View className="absolute top-2 left-2 bg-white/90 p-1.5 rounded-full">
        <Icon name="heart" size={18} color="#f43f5e" />
      </View>
    </View>

    {/* Content */}
    <View className="flex-1 p-3 justify-between">
      <View>
        <Text className="text-xs text-primary">{item.categories}</Text>
        <Text className="text-lg font-bold text-neutral-800 my-0.5">
          {item.name}
        </Text>
        <Text className="text-xs text-neutral-500">{item.location}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-1">
        <View className="flex-row items-center">
          <Icon name="star" size={16} color="#f59e0b" />
          <Text className="ml-1 text-xs text-neutral-800">
            {item.rating} ({item.reviews})
          </Text>
        </View>
        <View className="flex-row items-center">
          <Icon name="pricetag-outline" size={16} color="#3b82f6" />
          <Text className="ml-1 text-xs font-semibold text-neutral-900">
            {item.discount}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

// --- Main Screen ---
export default function SearchScreen({ navigation }) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#156778" />

      {/* Header */}
      <View className="flex-row justify-between items-center px-5 py-4 bg-primary">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white/10 p-2 rounded-full"
        >
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">Search</Text>
        <TouchableOpacity className="bg-white/10 p-2 rounded-full">
          <Icon name="options-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-neutral-50 rounded-t-3xl overflow-hidden mt-1 shadow-sm">
        {/* Search Bar - Lifted Look */}
        <View
          className="bg-white mx-5 mt-6 mb-4 rounded-2xl shadow-sm border border-neutral-100 flex-row items-center px-4 h-14"
          style={{ elevation: 3 }}
        >
          <Icon name="search-outline" size={22} color="#156778" />
          <TextInput
            className="flex-1 text-base text-neutral-800 ml-3 font-medium"
            placeholder="Search salon, service or stylist..."
            placeholderTextColor="#9ca3af"
            autoFocus={true}
          />
          <TouchableOpacity>
            <Icon name="mic-outline" size={22} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Recents */}
          <View className="px-5 mt-2">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-neutral-800">
                Recent Searches
              </Text>
              <TouchableOpacity>
                <Text className="text-sm font-semibold text-primary">
                  Clear all
                </Text>
              </TouchableOpacity>
            </View>
            <View className="bg-white rounded-2xl p-2 shadow-sm border border-neutral-50">
              {recentSearches.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  className={`flex-row justify-between items-center py-3.5 px-3 ${
                    index !== recentSearches.length - 1
                      ? 'border-b border-neutral-100'
                      : ''
                  }`}
                >
                  <View className="flex-row items-center">
                    <Icon name="time-outline" size={18} color="#9ca3af" />
                    <Text className="text-base text-neutral-700 ml-3 font-medium">
                      {item.term}
                    </Text>
                  </View>
                  <Icon name="close" size={18} color="#cbd5e1" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Popular Searches */}
          <View className="px-5 mt-6">
            <Text className="text-lg font-bold text-neutral-800 mb-4">
              Popular Searches
            </Text>
            <View className="flex-row flex-wrap">
              {popularSearches.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  className="bg-primaryLight py-2.5 px-5 rounded-full mr-3 mb-3 border border-primary/20"
                >
                  <Text className="text-primary text-sm font-semibold">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Suggestions */}
          <View className="px-5 mt-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-neutral-800">
                Suggestions for you
              </Text>
            </View>
            {suggestionData.map(item => (
              <SalonCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
