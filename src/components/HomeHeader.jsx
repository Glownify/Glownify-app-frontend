import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { LocationContext } from "../components/LocationProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAddressFromCoords } from "../utils/geocoding";

export default function HomeHeader({ user, navigation }) {
  const { location, loading } = useContext(LocationContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (location) {
      getAddressFromCoords(location.latitude, location.longitude).then(setAddress);
    }
  }, [location]);

  const renderLocation = () => {
    if (loading) {
      return (
        <View style={styles.locationContainer}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.locationText}>Fetching location...</Text>
        </View>
      );
    }

    if (location) {
      return (
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color="#fff" />
          <Text style={styles.locationText} numberOfLines={1}>
            {address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={16} color="#E1F5FA" />
        <Text style={styles.locationText}>Location unavailable</Text>
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Text style={styles.headerTitle}>Hello, {user?.name}</Text>
        <Text style={styles.headerSubtitle}>Find the service you want, and book now!</Text>
        {renderLocation()}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("SearchScreen")}
        style={styles.searchButton}
      >
        <Ionicons name="search-outline" size={22} color="#156778" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: "#156778",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  leftContainer: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 6 },
  headerSubtitle: { fontSize: 13, color: "#E1F5FA", marginBottom: 8 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    top:10,
    borderRadius: 12,
    maxWidth: "90%",
  },
  locationText: { color: "#fff", marginLeft: 4, fontSize: 12 },
  searchButton: { backgroundColor: "#fff", padding: 10, borderRadius: 50, justifyContent: "center", alignItems: "center" },
});


// import React, { useContext, useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// import { LocationContext } from '../components/LocationProvider';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { getAddressFromCoords } from '../utils/geocoding';

// export default function HomeHeader({ user, navigation }) {
//   const { location, loading } = useContext(LocationContext);
//   const [address, setAddress] = useState('');

//   const colors = {
//     primary: '#156778',
//     white: '#FFFFFF',
//     textSecondary: '#E1F5FA',
//   };

//   useEffect(() => {
//     if (location) {
//       getAddressFromCoords(location.latitude, location.longitude).then(addr => {
//         setAddress(addr);
//       });
//     }
//   }, [location]);

//   const renderLocation = () => {
//     if (loading) {
//       return (
//         <View style={styles.locationContainer}>
//           <ActivityIndicator size="small" color={colors.white} />
//           <Text style={styles.locationText}>Fetching location...</Text>
//         </View>
//       );
//     }

//     if (location) {
//       return (
//         <View style={styles.locationContainer}>
//           <Ionicons name="location-sharp" size={16} color={colors.white} />
//           <Text style={styles.locationText} numberOfLines={1}>
//             {address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
//           </Text>
//         </View>
//       );
//     }

//     return (
//       <View style={styles.locationContainer}>
//         <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
//         <Text style={styles.locationText}>Location unavailable</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.header}>
//       <View style={styles.leftContainer}>
//         <Text style={styles.headerTitle}>Hello, {user?.name}</Text>
//         <Text style={styles.headerSubtitle}>Find the service you want, and book now!</Text>
//         {renderLocation()}
//       </View>

//       <TouchableOpacity
//         onPress={() => navigation.navigate('SearchScreen')}
//         style={styles.searchButton}
//       >
//         <Ionicons name="search-outline" size={22} color={colors.primary} />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 18,
//     backgroundColor: '#156778',
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//   },
//   leftContainer: {
//     flex: 1,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 13,
//     color: '#E1F5FA',
//     marginBottom: 8,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     maxWidth: '90%',
//   },
//   locationText: {
//     color: '#fff',
//     marginLeft: 4,
//     fontSize: 12,
//   },
//   searchButton: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

