import React, {createContext, useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const LocationContext = createContext(null);

export default function LocationProvider({children}) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      return true;
    }

    const requestResult = await request(permission);
    return requestResult === RESULTS.GRANTED;
  };

  const saveLocationLocally = async coords => {
    try {
      await AsyncStorage.setItem('userLocation', JSON.stringify(coords));
    } catch (error) {
      console.log('Error saving location locally', error);
    }
  };

  const loadLocation = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('userLocation');
      if (storedLocation) {
        setLocation(JSON.parse(storedLocation));
      }
    } catch (error) {
      console.log('Error loading location', error);
    }
  };

  const sendLocationToBackend = async coords => {
    console.log('Location sent to backend:', coords);
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert('Permission denied', 'Location permission is required.');
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const coords = position.coords;
        setLocation(coords);
        saveLocationLocally(coords);
        sendLocationToBackend(coords);
        setLoading(false);
      },
      error => {
        console.log('Location error:', error);
        Alert.alert('Error fetching location', error.message);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
    );
  };

  useEffect(() => {
    loadLocation();
    getCurrentLocation();
  }, []);

  return (
    <LocationContext.Provider value={{location, loading, getCurrentLocation}}>
      {children}
    </LocationContext.Provider>
  );
}
