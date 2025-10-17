import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // For menu icon

export default function Header() {
  return (
    <View style={styles.container}>
      {/* Left Section: Logo + Text */}
      <View style={styles.leftSection}>
        <Image
          source={require("../assets/logo.png")} // your logo image path
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>FRESHFOLD</Text>
      </View>

      {/* Right Section: Menu + Profile */}
      <View style={styles.rightSection}>
        <Icon name="menu" size={24} color="#000" style={styles.menuIcon} />

        <TouchableOpacity>
          <Image
            source={require("../assets/image.png")} // your profile image
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 4, // for shadow on Android
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#1F3C5F",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 15,
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
