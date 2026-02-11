import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import { store } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import LocationProvider from './src/components/LocationProvider';
import GlobalSnackbar from './src/components/GlobalSnackbar';
import './global.css';

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <LocationProvider>
        {/* <StatusBar barStyle="dark-content" /> */}
        {/* <StatusBar barStyle="light-content" backgroundColor="#156778" /> */}
        <RootNavigator />
      </LocationProvider>
      <GlobalSnackbar />
    </SafeAreaProvider>
    </Provider>
  );
}
