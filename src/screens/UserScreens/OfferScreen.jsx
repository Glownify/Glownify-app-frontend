import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function OfferScreen({ navigation }) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#156778]">
      <StatusBar barStyle="light-content" backgroundColor="#156778" />

      {/* ---------- HEADER ---------- */}
      <View className="flex-row justify-between items-center px-4 py-4 bg-[#156778] border-b border-[#f0f0f0]">
        <TouchableOpacity className="p-2" onPress={() => navigation?.goBack()}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-white">Offers</Text>

        <View className="w-6" />
      </View>

      {/* --------------- BODY --------------- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-4 bg-white flex-1"
      >
        {/* -------- Top 2 Cards -------- */}
        <View className="flex-row justify-between my-4">
          <TouchableOpacity
            className="flex-row items-center w-[48%] py-3.5 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]"
            style={{ elevation: 2 }}
          >
            <Icon name="pricetag-outline" size={22} color="#3B82F6" />
            <Text className="ml-2.5 text-[15px] font-semibold text-[#1E293B]">
              3 Coupons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center w-[48%] py-3.5 px-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]"
            style={{ elevation: 2 }}
          >
            <Icon name="wallet-outline" size={22} color="#059669" />
            <Text className="ml-2.5 text-[15px] font-semibold text-[#1E293B]">
              ₹299 Wallet
            </Text>
          </TouchableOpacity>
        </View>

        {/* -------- Refer & Earn Banner -------- */}
        <View
          className="mt-1 bg-[#E0E7FF] p-4.5 rounded-2xl mb-5 overflow-hidden relative"
          style={{ minHeight: 200 }}
        >
          <View>
            <Text className="text-[22px] font-extrabold text-[#1E3A8A]">
              Refer & Earn{'\n'}Free Services
            </Text>

            <TouchableOpacity className="bg-[#FACC15] px-3.5 py-2 self-start rounded-[10px] mt-2.5">
              <Text className="font-bold text-[#1F2937]">KNOW MORE</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../../assets/offer/offer.png')}
            className="w-[200px] h-[200px] absolute bottom-0 -right-[30px]"
            resizeMode="contain"
          />
        </View>

        {/* -------- 10% OFF Banner -------- */}
        <View
          className="bg-[#FEF9C3] p-4.5 rounded-2xl relative"
          style={{ minHeight: 200 }}
        >
          <View>
            <Text className="text-[28px] font-black text-black">
              Get{'\n'}10% OFF
            </Text>
            <Text className="text-base mt-1 text-[#374151]">
              on every booking!
            </Text>

            <TouchableOpacity className="bg-black px-4 py-2.5 rounded-[10px] self-start mt-3">
              <Text className="text-white font-bold">VIEW BENEFITS</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../../assets/offer/refer.png')}
            className="w-[200px] h-[200px] absolute -bottom-2.5 right-0"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
