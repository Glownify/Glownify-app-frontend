import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/common/Header';

export default function OfferScreen({ navigation }) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary">
      <AppHeader title="Offers" onBack={() => navigation?.goBack()} variant="primary" />

      <ScrollView showsVerticalScrollIndicator={false} className="p-md bg-neutral-100 flex-1 rounded-t-3xl">
        {/* Top 2 Cards */}
        <View className="flex-row justify-between my-md">
          <TouchableOpacity className="flex-row items-center w-[48%] py-3.5 px-sm rounded-xl bg-neutral-50 border border-neutral-200" style={{ elevation: 2 }}>
            <Text className="ml-2.5 text-base font-semibold text-neutral-800">🏷 3 Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center w-[48%] py-3.5 px-sm rounded-xl bg-neutral-50 border border-neutral-200" style={{ elevation: 2 }}>
            <Text className="ml-2.5 text-base font-semibold text-neutral-800">👛 ₹299 Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Refer & Earn Banner */}
        <View className="mt-1 bg-primary-100 border border-neutral-200 p-lg rounded-3xl mb-xl overflow-hidden relative" style={{ minHeight: 200 }}>
          <View>
            <Text className="text-2xl font-extrabold text-teal-600">Refer & Earn{'\n'}Free Services</Text>
            <TouchableOpacity className="bg-warning px-sm py-2 self-start rounded-xl mt-sm">
              <Text className="font-bold text-neutral-800">KNOW MORE</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../../assets/offer/offer.png')} className="w-[200px] h-[200px] absolute bottom-0 -right-[30px]" resizeMode="contain" />
        </View>

        {/* 10% OFF Banner */}
        <View className="bg-primary-100 border border-neutral-200 p-lg rounded-3xl relative mb-xl" style={{ minHeight: 200 }}>
          <View>
            <Text className="text-4xl font-black text-primary-700">Get{'\n'}10% OFF</Text>
            <Text className="text-base mt-1 text-neutral-700">on every booking!</Text>
            <TouchableOpacity className="bg-primary px-md py-2.5 rounded-xl self-start mt-sm">
              <Text className="text-neutral-white font-bold">VIEW BENEFITS</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../../assets/offer/refer.png')} className="w-[200px] h-[200px] absolute -bottom-2.5 right-0" resizeMode="contain" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}