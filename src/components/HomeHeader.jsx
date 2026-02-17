import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LocationContext } from '../components/LocationProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAddressFromCoords } from '../utils/geocoding';

export default function HomeHeader({ user, navigation }) {
  const { location, loading } = useContext(LocationContext);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (location) {
      getAddressFromCoords(location.latitude, location.longitude).then(
        setAddress,
      );
    }
  }, [location]);

  const renderLocation = () => {
    if (loading) {
      return (
        <View className="flex-row items-center bg-white/20 px-3 py-2 rounded-lg self-start">
          <ActivityIndicator size="small" color="#fff" />
          <Text className="text-white text-xs font-medium ml-2">
            Fetching location...
          </Text>
        </View>
      );
    }

    if (location) {
      return (
        <View className="flex-1 flex-row items-center bg-white/20 px-3 py-2 rounded-2xl self-start">
          <View className="mr-1.5">
            <Ionicons name="location-sharp" size={14} color="#fff" />
          </View>
          <Text className="text-white text-xs font-medium flex-1" numberOfLines={1}>
            {address ||
              `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(
                4,
              )}`}
          </Text>
          <TouchableOpacity>
            <Ionicons name="chevron-down" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="flex-row items-center bg-white/20 px-3 py-2 rounded-lg self-start">
        <Ionicons name="location-outline" size={14} color="#E1F5FA" />
        <Text className="text-white text-xs font-medium ml-2">
          Location unavailable
        </Text>
      </View>
    );
  };

  return (
    <View className="bg-[#156778] px-5 pt-2.5 pb-5">
      {/* Top Row: Greeting + Search */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-white text-2xl font-bold mb-1">
            Glownify
          </Text>
          <Text className="text-[#E1F5FA] text-xs opacity-90">
            Find the service you want, and book now!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          className="bg-white p-2.5 rounded-full justify-center items-center"
        >
          <Ionicons name="search-outline" size={20} color="#156778" />
        </TouchableOpacity>
      </View>

      {/* Location Row */}
      <View className="flex-row items-center">{renderLocation()}</View>
    </View>
  );
}