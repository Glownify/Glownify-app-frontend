import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

export default function ContactDetailsStep({
  ownershipType,
  setOwnershipType,
  ownerName,
  setOwnerName,
  ownerEmail,
  setOwnerEmail,
  ownerPassword,
  setOwnerPassword,
  contactNumber,
  setContactNumber,
  whatsappNumber,
  setWhatsappNumber,
  shopName,
  setShopName,
  salonCategory,
  setSalonCategory,
  partners,
  updatePartner,
  removePartner,
  addPartner,
  handleNext,
}) {
  return (
    <View>
      <Text className="text-2xl font-bold text-neutral-700">Contact Details</Text>
      <Text className="text-sm text-neutral-400 mt-1">
        Tell us about your business ownership
      </Text>

      {/* Shop Ownership Type */}
      <Text className="text-base font-semibold text-neutral-700 mt-lg">
        Shop Ownership Type
      </Text>
      <View className="flex-row gap-sm mt-sm">
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center gap-xs py-sm px-md rounded-input border ${
            ownershipType === 'personal'
              ? 'bg-[#F5F0FF] border-[#7C5FED]'
              : 'bg-neutral-white border-neutral-200'
          }`}
          onPress={() => setOwnershipType('personal')}
        >
          <Icon
            name="person"
            size={20}
            color={ownershipType === 'personal' ? '#7C5FED' : '#999'}
          />
          <Text
            className={`text-sm font-semibold ${
              ownershipType === 'personal' ? 'text-[#7C5FED]' : 'text-neutral-400'
            }`}
          >
            Personal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center gap-xs py-sm px-md rounded-input border ${
            ownershipType === 'partnership'
              ? 'bg-[#F5F0FF] border-[#7C5FED]'
              : 'bg-neutral-white border-neutral-200'
          }`}
          onPress={() => setOwnershipType('partnership')}
        >
          <Icon
            name="people"
            size={20}
            color={ownershipType === 'partnership' ? '#7C5FED' : '#999'}
          />
          <Text
            className={`text-sm font-semibold ${
              ownershipType === 'partnership' ? 'text-[#7C5FED]' : 'text-neutral-400'
            }`}
          >
            Partnership
          </Text>
        </TouchableOpacity>
      </View>

      {/* Owner Details */}
      <Text className="text-base font-semibold text-neutral-700 mt-lg">
        Owner Details
      </Text>

      <View className="gap-md mt-sm">
        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Owner Full Name *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter owner's full name"
            value={ownerName}
            onChangeText={setOwnerName}
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Email Address *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter email address"
            value={ownerEmail}
            onChangeText={setOwnerEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Password *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter password"
            value={ownerPassword}
            onChangeText={setOwnerPassword}
            secureTextEntry={true}
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Contact Number *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter contact number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View>
          <Text className="text-sm text-neutral-600 mb-xs">WhatsApp Number</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter WhatsApp number"
            value={whatsappNumber}
            onChangeText={setWhatsappNumber}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Shop Information */}
      <Text className="text-base font-semibold text-neutral-700 mt-lg">
        Shop Information
      </Text>

      <View className="gap-md mt-sm">
        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Shop/Salon Name *</Text>
          <TextInput
            className="bg-neutral-white border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
            placeholder="Enter your shop name"
            value={shopName}
            onChangeText={setShopName}
          />
        </View>

        {/* Salon Category */}
        <View>
          <Text className="text-sm text-neutral-600 mb-xs">Salon Category *</Text>
          <View className="bg-neutral-white border border-neutral-200 rounded-input overflow-hidden">
            <Picker
              selectedValue={salonCategory}
              onValueChange={(value) => setSalonCategory(value)}
              dropdownIconColor="#7C5FED"
              mode="dropdown"
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Men Salon" value="men" />
              <Picker.Item label="Women Salon" value="women" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Partners Details (if Partnership) */}
      {ownershipType === 'partnership' && (
        <View className="mt-lg">
          <Text className="text-base font-semibold text-neutral-700">
            Partners Details
          </Text>
          <View className="gap-sm mt-sm">
            {partners.map((partner, index) => (
              <View
                key={partner.id}
                className="bg-neutral-white border border-neutral-200 rounded-card p-md"
              >
                <Text className="text-sm font-bold text-neutral-700 mb-sm">
                  Partner {index + 1}
                </Text>

                <View className="gap-md">
                  <View>
                    <Text className="text-sm text-neutral-600 mb-xs">Partner Name *</Text>
                    <TextInput
                      className="bg-neutral-50 border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
                      placeholder="Enter partner's full name"
                      value={partner.name}
                      onChangeText={(text) => updatePartner(index, 'name', text)}
                    />
                  </View>

                  <View>
                    <Text className="text-sm text-neutral-600 mb-xs">Contact Number *</Text>
                    <TextInput
                      className="bg-neutral-50 border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
                      placeholder="Enter contact number"
                      value={partner.contact}
                      onChangeText={(text) => updatePartner(index, 'contact', text)}
                      keyboardType="phone-pad"
                    />
                  </View>

                  <View>
                    <Text className="text-sm text-neutral-600 mb-xs">WhatsApp Number</Text>
                    <TextInput
                      className="bg-neutral-50 border border-neutral-200 rounded-input px-md py-sm text-neutral-700"
                      placeholder="Enter WhatsApp number"
                      value={partner.whatsapp}
                      onChangeText={(text) => updatePartner(index, 'whatsapp', text)}
                      keyboardType="phone-pad"
                    />
                  </View>

                  {partners.length > 1 && (
                    <TouchableOpacity
                      className="flex-row items-center justify-center gap-xs py-xs bg-error/10 rounded-input"
                      onPress={() => removePartner(index)}
                    >
                      <Icon name="trash" size={16} color="#ef4444" />
                      <Text className="text-sm font-semibold text-error">Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}

            {partners.length < 2 && (
              <TouchableOpacity
                className="flex-row items-center justify-center gap-xs py-sm border border-[#7C5FED] rounded-input"
                onPress={addPartner}
              >
                <Icon name="add-circle" size={20} color="#7C5FED" />
                <Text className="text-sm font-semibold text-[#7C5FED]">Add Partner</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity
        className="flex-row items-center justify-center gap-xs bg-[#7C5FED] py-md rounded-input mt-xl"
        onPress={handleNext}
      >
        <Text className="text-base font-bold text-neutral-white">Next</Text>
        <Icon name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}