import { View, Text, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../redux/slices/authSlice';

export default function IndependentProProfile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <Text>IndependentProProfile</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}