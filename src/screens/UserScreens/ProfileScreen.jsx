import { View, Text, Button } from 'react-native'
import React from 'react'
import {useDispatch} from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Screen } from 'react-native-screens';

export default function ProfileScreen({ navigation }) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}