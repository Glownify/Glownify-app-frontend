import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSaloons } from '../../redux/slices/superAdminSlice';

export default function ManageSalonsScreen() {
    const dispatch = useDispatch();
    const { saloons, loading, error } = useSelector((state) => state.superAdmin);

    React.useEffect(() => {
        dispatch(fetchAllSaloons());
    }, [dispatch]);

    console.log('Saloons:', saloons);

  return (
    <View>
      <Text>ManageSaloonsScreen</Text>
    </View>
  )
}