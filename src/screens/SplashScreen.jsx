// src/screens/SplashScreen.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beauty Saloon</Text>
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#156778' },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff' },
});
