import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message || message?.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#ffe5e5",
    borderRadius: 8,
  },
  text: {
    color: "#ff3333",
  },
});
