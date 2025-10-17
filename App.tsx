import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" />
        {/* <StatusBar style="light" backgroundColor="#121212" /> */}
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
