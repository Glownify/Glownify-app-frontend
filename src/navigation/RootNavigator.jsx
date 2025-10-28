import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen';
import OnboardingNavigator from './OnboardingNavigator';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SalonNavigator from './SalonNavigator';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Launch check failed', error);
      } finally {
        setTimeout(() => setLoading(false), 1500); // splash 1.5s
      }
    };
    checkLaunch();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : !user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : user.role === 'superadmin' ? (
          <Stack.Screen name="SuperAdmin" component={SuperAdminNavigator} />
        ) : user.role === 'salon_owner' ? (
          <Stack.Screen name="Salon" component={SalonNavigator} />
        ) : user.role === 'independent_beautician' ? (
          <Stack.Screen name="Independent" component={IndependentNavigator} />
        ) : (
          <Stack.Screen name="App" component={AppNavigator} /> // default user
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
