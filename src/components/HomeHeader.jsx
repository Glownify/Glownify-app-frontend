import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LocationContext} from './LocationProvider';
import {getAddressFromCoords} from '../utils/geocoding';
import {S, getThemeColors} from '../theme';
import {moderateScale} from '../utils/responsive';

export default function HomeHeader() {
  const navigation = useNavigation();
  const {location, loading} = useContext(LocationContext);
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [address, setAddress] = useState('');

  useEffect(() => {
    let isActive = true;

    if (location) {
      getAddressFromCoords(location.latitude, location.longitude)
        .then(value => {
          if (isActive) {
            setAddress(value);
          }
        })
        .catch(() => {
          if (isActive) {
            setAddress('');
          }
        });
    }

    return () => {
      isActive = false;
    };
  }, [location]);

  const locationPillStyle = {
    maxWidth: '100%',
    paddingHorizontal: S.space.md,
    paddingVertical: S.space.sm,
    gap: S.space.xs,
  };

  const renderLocation = () => {
    if (loading) {
      return (
        <View
          className="self-start flex-row items-center rounded-2xl bg-white/15"
          style={locationPillStyle}>
          <ActivityIndicator size="small" color={colors.white} />
          <Text
            className="text-white"
            style={{fontSize: S.fs.xs, fontWeight: '500'}}>
            Fetching location...
          </Text>
        </View>
      );
    }

    if (location) {
      return (
        <View
          className="self-start flex-row items-center rounded-2xl bg-white/15"
          style={locationPillStyle}>
          <Ionicons
            name="location-sharp"
            size={S.icon.xs + 2}
            color={colors.white}
          />
          <Text
            className="flex-1 text-white"
            style={{fontSize: S.fs.xs, fontWeight: '500'}}
            numberOfLines={1}>
            {address ||
              `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
          </Text>
          <Ionicons
            name="chevron-down"
            size={S.icon.xs + 2}
            color={colors.white}
          />
        </View>
      );
    }

    return (
      <View
        className="self-start flex-row items-center rounded-2xl bg-white/15"
        style={locationPillStyle}>
        <Ionicons
          name="location-outline"
          size={S.icon.xs + 2}
          color={colors.white}
        />
        <Text
          className="text-white"
          style={{fontSize: S.fs.xs, fontWeight: '500'}}>
          Location unavailable
        </Text>
      </View>
    );
  };

  return (
    <View className="bg-primary-600" style={{padding: S.space.lg, gap: S.space.lg}}>
      <View className="flex-row items-start justify-between" style={{gap: S.space.md}}>
        <View className="flex-1" style={{gap: S.space.xs}}>
          <Text
            className="text-white"
            style={{fontSize: S.fs.xxl, fontWeight: '700'}}>
            Glownify
          </Text>
          <Text
            className="text-white/80"
            style={{fontSize: S.fs.xs, lineHeight: S.fs.sm + 2}}>
            Find the service you want, and book now!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          className="items-center justify-center rounded-full bg-white"
          style={{width: moderateScale(44), height: moderateScale(44)}}
          activeOpacity={0.85}>
          <Ionicons
            name="search-outline"
            size={S.icon.md}
            color={colors.primary[600]}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center">{renderLocation()}</View>
    </View>
  );
}
