import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeHeader({ user, navigation }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Hello, {user?.name}</Text>
        <Text style={styles.headerSubtitle}>
          Find the service you want, and book now!
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('SearchScreen')}
        style={styles.searchButton}
      >
        <Ionicons name="search-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 26,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#50555C',
  },
  searchButton: {
    backgroundColor: '#156778',
    padding: 10,
    borderRadius: 50,
  },
});
