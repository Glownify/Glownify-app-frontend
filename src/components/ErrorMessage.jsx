import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ErrorMessage({ message }) {
  return (
    <View style={styles.container}>
       <Icon name="alert-circle-outline" size={50} color="#f44336" />
      <Text style={styles.text}>{message || message?.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                     // take full space
    justifyContent: "center",     // center vertically
    alignItems: "center",         // center horizontally
    padding: 12,
    borderRadius: 8,
    margin: 16,
    gap: 10,                 
  },
  text: {
    color: "#ff3333",
    fontSize: 16,
    textAlign: "center",
  },
});
