import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import EmailVerificationScreen from '../screens/Auth/EmailVerificationScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import SelectAdminTypeScreen from '../screens/Auth/SelectAdminTypeScreen';
import SalonAdminRegisterScreen from '../screens/Auth/SalonAdminRegisterScreen';
import IndependentProRegisterScreen from '../screens/Auth/IndependentProRegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="SelectAdminType" component={SelectAdminTypeScreen} />
      <Stack.Screen name="SalonAdminRegister" component={SalonAdminRegisterScreen} />
      <Stack.Screen name="IndependentProRegister" component={IndependentProRegisterScreen} />
    </Stack.Navigator>
  );
}
