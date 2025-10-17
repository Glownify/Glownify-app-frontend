// src/navigation/RootNavigator.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import OnboardingNavigator from './OnboardingNavigator';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    const checkLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        // if (hasLaunched === null) {
        //   setIsFirstLaunch(true);
        //   await AsyncStorage.setItem('hasLaunched', 'true');
        // } else {
        //   setIsFirstLaunch(false);
        // }
        await AsyncStorage.removeItem('hasLaunched'); 
      setIsFirstLaunch(true);
      } catch (error) {
        console.error('Launch check failed', error);
      } finally {
        setTimeout(() => setLoading(false), 2000); // splash 2s
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
        ) : user ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
