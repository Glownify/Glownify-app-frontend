import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../theme';
import {moderateScale} from '../utils/responsive';

export default function LocationPicker({navigation, route}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const [marker, setMarker] = useState(null);

  const handleConfirm = () => {
    if (!marker) {
      Alert.alert('Pick Location', 'Please tap on the map to set location.');
      return;
    }

    route.params.onLocationSelect(marker);
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-base">
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        onPress={event => setMarker(event.nativeEvent.coordinate)}
        mapType="standard">
        {marker ? <Marker coordinate={marker} /> : null}
      </MapView>

      <TouchableOpacity
        className="absolute flex-row items-center justify-center rounded-2xl bg-primary-600"
        style={{
          left: S.space.lg,
          right: S.space.lg,
          bottom: S.space.lg,
          padding: S.space.lg,
          gap: S.space.xs,
          borderRadius: S.radius.lg,
          shadowColor: colors.black,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.22,
          shadowRadius: moderateScale(8),
          elevation: 8,
        }}
        onPress={handleConfirm}
        activeOpacity={0.88}>
        <Text
          className="text-white"
          style={{fontSize: S.fs.sm, fontWeight: '700'}}>
          Confirm Location
        </Text>
        <Icon name="checkmark-circle" size={S.icon.md} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
