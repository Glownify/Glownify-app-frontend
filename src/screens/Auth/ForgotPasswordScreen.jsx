import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text>ForgotPasswordScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff', // Lighter background color
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
});