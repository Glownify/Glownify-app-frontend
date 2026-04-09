import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import {LabeledInput} from '../../components/common/Labeledinput';
import {S, theme} from '../../theme';

const ACCENT = theme.colors.primary[600];

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
    <View style={{gap: S.space.lg}}>
      {/* Title */}
      <View style={{gap: S.space.xs}}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#1F2937' }}>
          Contact Details
        </Text>
        <Text style={{ fontSize: 14, color: '#9CA3AF' }}>
          Tell us about your business ownership
        </Text>
      </View>

      {/* Shop Ownership Type */}
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1F2937' }}>
        Shop Ownership Type
      </Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* Personal */}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: ownershipType === 'personal' ? ACCENT : '#E5E7EB',
            backgroundColor: ownershipType === 'personal' ? theme.colors.primary[100] : '#fff',
          }}
          onPress={() => setOwnershipType('personal')}
          activeOpacity={0.8}
        >
          <Icon
            name="person"
            size={18}
            color={ownershipType === 'personal' ? ACCENT : '#9CA3AF'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ownershipType === 'personal' ? ACCENT : '#9CA3AF',
            }}
          >
            Personal
          </Text>
        </TouchableOpacity>

        {/* Partnership */}
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: ownershipType === 'partnership' ? ACCENT : '#E5E7EB',
            backgroundColor: ownershipType === 'partnership' ? theme.colors.primary[100] : '#fff',
          }}
          onPress={() => setOwnershipType('partnership')}
          activeOpacity={0.8}
        >
          <Icon
            name="people"
            size={18}
            color={ownershipType === 'partnership' ? ACCENT : '#9CA3AF'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: ownershipType === 'partnership' ? ACCENT : '#9CA3AF',
            }}
          >
            Partnership
          </Text>
        </TouchableOpacity>
      </View>

      {/* Owner Details */}
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1F2937' }}>
        Owner Details
      </Text>

      <View style={{gap: S.space.lg}}>
        <LabeledInput
          label="Owner Full Name"
          required
          placeholder="e.g. John Doe"
          value={ownerName}
          onChangeText={setOwnerName}
          autoCapitalize="words"
        />

        <LabeledInput
          label="Email Address"
          required
          placeholder="e.g. name@salon.com"
          value={ownerEmail}
          onChangeText={setOwnerEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <LabeledInput
          label="Password"
          required
          placeholder="Min. 8 characters"
          value={ownerPassword}
          onChangeText={setOwnerPassword}
          secureTextEntry
        />

        <LabeledInput
          label="Contact Number"
          required
          placeholder="+1 (555) 000-0000"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />

        <LabeledInput
          label="WhatsApp Number"
          placeholder="Same as contact number"
          value={whatsappNumber}
          onChangeText={setWhatsappNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Shop Information */}
      <Text style={{ fontSize: 15, fontWeight: '700', color: '#1F2937' }}>
        Shop Information
      </Text>

      <View style={{gap: S.space.lg}}>
        <LabeledInput
          label="Shop/Salon Name"
          required
          placeholder="Enter your shop name"
          value={shopName}
          onChangeText={setShopName}
          autoCapitalize="words"
        />

        {/* Salon Category */}
        <View style={{gap: S.space.xs}}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#374151' }}>
            Salon Category <Text style={{ color: ACCENT }}>*</Text>
          </Text>
          <View
            style={{
              backgroundColor: '#FAFAFA',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Picker
              selectedValue={salonCategory}
              onValueChange={(value) => setSalonCategory(value)}
              dropdownIconColor={ACCENT}
              mode="dropdown"
            >
              <Picker.Item label="Select Category" value="" color="#C0C0C0" />
              <Picker.Item label="Men Salon" value="men" />
              <Picker.Item label="Women Salon" value="women" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Partners Details (if Partnership) */}
      {ownershipType === 'partnership' && (
        <View style={{gap: S.space.md}}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#1F2937' }}>
            Partners Details
          </Text>

          {partners.map((partner, index) => (
            <View
              key={partner.id}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 14,
                padding: 16,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#1F2937' }}>
                Partner {index + 1}
              </Text>

              <View style={{gap: S.space.lg}}>
                <LabeledInput
                  label="Partner Name"
                  required
                  placeholder="Enter partner's full name"
                  value={partner.name}
                  onChangeText={(text) => updatePartner(index, 'name', text)}
                  autoCapitalize="words"
                />

                <LabeledInput
                  label="Contact Number"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={partner.contact}
                  onChangeText={(text) => updatePartner(index, 'contact', text)}
                  keyboardType="phone-pad"
                />

                <LabeledInput
                  label="WhatsApp Number"
                  placeholder="Same as contact number"
                  value={partner.whatsapp}
                  onChangeText={(text) => updatePartner(index, 'whatsapp', text)}
                  keyboardType="phone-pad"
                />

                {partners.length > 1 && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      paddingVertical: 10,
                      backgroundColor: '#FEF2F2',
                      borderRadius: 10,
                    }}
                    onPress={() => removePartner(index)}
                  >
                    <Icon name="trash" size={15} color="#ef4444" />
                    <Text style={{ fontSize: 13, fontWeight: '600', color: '#ef4444' }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          {partners.length < 2 && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                paddingVertical: 14,
                borderWidth: 1.5,
                borderColor: ACCENT,
                borderRadius: 12,
                backgroundColor: theme.colors.primary[100],
              }}
              onPress={addPartner}
            >
              <Icon name="add-circle" size={20} color={ACCENT} />
              <Text style={{ fontSize: 14, fontWeight: '600', color: ACCENT }}>
                Add Partner
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Next Step Button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          backgroundColor: ACCENT,
          paddingVertical: 18,
          borderRadius: 14,
          shadowColor: ACCENT,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        }}
        onPress={handleNext}
        activeOpacity={0.85}
      >
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
          Next Step
        </Text>
        <Icon name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
