import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getLeadById,
  salesmanSalons,
  salesmanStageMeta,
  salesmanTheme,
} from './salesmanData';

const CATEGORY_OPTIONS = [
  'Unisex Salon',
  'Beauty Studio',
  'Nail Bar',
  'Skin Lounge',
];

const PLAN_OPTIONS = ['Starter', 'Growth', 'Premium'];
const STAGE_OPTIONS = ['docs_pending', 'proposal_sent', 'onboarding', 'live'];

const FOLLOW_UP_OPTIONS = [
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
  { key: 'three_days', label: 'In 3 days' },
];

const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}) => (
  <View style={styles.fieldBlock}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#98A2B3"
      multiline={multiline}
      keyboardType={keyboardType}
      style={[styles.textInput, multiline && styles.multilineInput]}
    />
  </View>
);

const SelectChip = ({ active, label, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.88}
    onPress={onPress}
    style={[styles.selectChip, active && styles.selectChipActive]}
  >
    <Text style={[styles.selectChipText, active && styles.selectChipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const SectionCard = ({ title, subtitle, children }) => (
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const buildNextFollowUp = key => {
  const date = new Date();

  if (key === 'tomorrow') {
    date.setDate(date.getDate() + 1);
  } else if (key === 'three_days') {
    date.setDate(date.getDate() + 3);
  }

  date.setHours(16, 0, 0, 0);
  return date.toISOString();
};

const buildInitialForm = ({ lead, prefill }) => ({
  salonName: prefill?.name || lead?.salonName || '',
  ownerName: prefill?.owner || lead?.ownerName || '',
  phone: prefill?.phone || lead?.phone || '',
  whatsapp: prefill?.whatsapp || lead?.whatsapp || lead?.phone || '',
  email: prefill?.email || '',
  city: prefill?.city || lead?.city || '',
  address: prefill?.address || '',
  category: prefill?.category || 'Unisex Salon',
  plan: prefill?.plan || lead?.planInterest || 'Growth',
  stage: prefill?.stage || lead?.stage || 'docs_pending',
  teamSize: String(prefill?.teamSize || ''),
  professionals: String(prefill?.professionals || ''),
  monthlyRevenue: String(prefill?.monthlyRevenue || lead?.estimatedValue || ''),
  source: prefill?.source || lead?.source || 'Field Visit',
  followUpWindow: 'tomorrow',
  notes: prefill?.notes || lead?.notes || '',
});

export default function SalesmanRegisterSalonScreen({ navigation, route }) {
  const sourceLead = route?.params?.leadId
    ? getLeadById(route.params.leadId)
    : null;
  const prefill = route?.params?.prefill || null;
  const [form, setForm] = useState(buildInitialForm({ lead: sourceLead, prefill }));
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [createdSalon, setCreatedSalon] = useState(null);

  const stageMeta = salesmanStageMeta[form.stage] || salesmanStageMeta.docs_pending;

  const updateField = (key, value) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const handleSubmit = () => {
    if (
      !form.salonName ||
      !form.ownerName ||
      !form.phone ||
      !form.city ||
      !form.address
    ) {
      Alert.alert(
        'Missing details',
        'Please fill the salon name, owner name, phone, city, and address.',
      );
      return;
    }

    const previewSalon = {
      id: `preview-${Date.now()}`,
      name: form.salonName,
      owner: form.ownerName,
      phone: form.phone,
      whatsapp: form.whatsapp || form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      joined: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      nextFollowUp: buildNextFollowUp(form.followUpWindow),
      commissionEarned: 0,
      monthlyRevenue: Number(form.monthlyRevenue) || 0,
      image: prefill?.image || salesmanSalons[0].image,
      status: form.stage === 'live' ? 'ACTIVE' : 'PENDING',
      stage: form.stage,
      plan: form.plan,
      teamSize: Number(form.teamSize) || 0,
      professionals: Number(form.professionals) || 0,
      payoutStatus: form.stage === 'live' ? 'Pending Payout Setup' : 'Awaiting Verification',
      source: form.source,
      category: form.category,
      notes: form.notes,
      checklist: [
        { id: 'new-1', label: 'KYC verified', complete: true },
        { id: 'new-2', label: 'Subscription activated', complete: true },
        {
          id: 'new-3',
          label: 'Staff onboarding completed',
          complete: form.stage === 'live',
        },
      ],
      activities: [
        {
          id: `activity-${Date.now()}`,
          type: 'onboarding',
          title: 'Salon registration created',
          at: new Date().toISOString(),
          detail: `Created from ${sourceLead ? 'lead conversion' : 'manual registration'} flow.`,
        },
      ],
    };

    setCreatedSalon(previewSalon);
    setSuccessModalVisible(true);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar
        backgroundColor={salesmanTheme.surface}
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flexOne}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => navigation.goBack()}
              style={styles.topBarButton}
            >
              <Icon name="close" size={20} color={salesmanTheme.ink} />
            </TouchableOpacity>
            <View style={styles.topBarCopy}>
              <Text style={styles.topBarTitle}>
                {prefill ? 'Update Salon Flow' : 'Register New Salon'}
              </Text>
              <Text style={styles.topBarSubtitle}>
                Capture owner details, onboarding stage, and next steps in one place.
              </Text>
            </View>
          </View>

          {sourceLead ? (
            <View style={styles.leadBanner}>
              <Icon
                name="sparkles-outline"
                size={18}
                color={salesmanTheme.accent}
              />
              <View style={styles.flexOne}>
                <Text style={styles.leadBannerTitle}>
                  Prefilled from {sourceLead.salonName}
                </Text>
                <Text style={styles.leadBannerSubtitle}>
                  Lead details were carried into the registration flow to save time.
                </Text>
              </View>
            </View>
          ) : null}

          <SectionCard
            title="Business Details"
            subtitle="Define the salon identity and location basics."
          >
            <Field
              label="Salon Name"
              value={form.salonName}
              onChangeText={value => updateField('salonName', value)}
              placeholder="Enter the business name"
            />
            <Field
              label="City"
              value={form.city}
              onChangeText={value => updateField('city', value)}
              placeholder="Enter city"
            />
            <Field
              label="Address"
              value={form.address}
              onChangeText={value => updateField('address', value)}
              placeholder="Enter complete salon address"
              multiline
            />
            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.chipWrap}>
              {CATEGORY_OPTIONS.map(option => (
                <SelectChip
                  key={option}
                  label={option}
                  active={form.category === option}
                  onPress={() => updateField('category', option)}
                />
              ))}
            </View>
          </SectionCard>

          <SectionCard
            title="Owner Contact"
            subtitle="Keep the primary communication details accurate."
          >
            <Field
              label="Owner Name"
              value={form.ownerName}
              onChangeText={value => updateField('ownerName', value)}
              placeholder="Enter owner name"
            />
            <Field
              label="Phone Number"
              value={form.phone}
              onChangeText={value => updateField('phone', value)}
              placeholder="Enter primary phone"
              keyboardType="phone-pad"
            />
            <Field
              label="WhatsApp Number"
              value={form.whatsapp}
              onChangeText={value => updateField('whatsapp', value)}
              placeholder="Enter WhatsApp number"
              keyboardType="phone-pad"
            />
            <Field
              label="Email"
              value={form.email}
              onChangeText={value => updateField('email', value)}
              placeholder="Enter email address"
              keyboardType="email-address"
            />
          </SectionCard>

          <SectionCard
            title="Subscription & Readiness"
            subtitle="Choose the plan, onboarding stage, and team size."
          >
            <Text style={styles.fieldLabel}>Plan</Text>
            <View style={styles.chipWrap}>
              {PLAN_OPTIONS.map(option => (
                <SelectChip
                  key={option}
                  label={option}
                  active={form.plan === option}
                  onPress={() => updateField('plan', option)}
                />
              ))}
            </View>

            <Text style={styles.fieldLabel}>Current Stage</Text>
            <View style={styles.chipWrap}>
              {STAGE_OPTIONS.map(option => (
                <SelectChip
                  key={option}
                  label={salesmanStageMeta[option].label}
                  active={form.stage === option}
                  onPress={() => updateField('stage', option)}
                />
              ))}
            </View>

            <View style={styles.stagePreview}>
              <Text style={styles.stagePreviewLabel}>Selected stage</Text>
              <Text style={[styles.stagePreviewValue, { color: stageMeta.color }]}>
                {stageMeta.label}
              </Text>
            </View>

            <Field
              label="Team Size"
              value={form.teamSize}
              onChangeText={value => updateField('teamSize', value)}
              placeholder="Number of total team members"
              keyboardType="number-pad"
            />
            <Field
              label="Active Professionals"
              value={form.professionals}
              onChangeText={value => updateField('professionals', value)}
              placeholder="Number of listed professionals"
              keyboardType="number-pad"
            />
            <Field
              label="Projected Monthly Revenue"
              value={form.monthlyRevenue}
              onChangeText={value => updateField('monthlyRevenue', value)}
              placeholder="Expected monthly revenue in INR"
              keyboardType="number-pad"
            />
          </SectionCard>

          <SectionCard
            title="Next Step"
            subtitle="Capture the source, follow-up window, and notes for handoff."
          >
            <Field
              label="Source"
              value={form.source}
              onChangeText={value => updateField('source', value)}
              placeholder="Referral, field visit, social lead, etc."
            />
            <Text style={styles.fieldLabel}>Next Follow-up</Text>
            <View style={styles.chipWrap}>
              {FOLLOW_UP_OPTIONS.map(option => (
                <SelectChip
                  key={option.key}
                  label={option.label}
                  active={form.followUpWindow === option.key}
                  onPress={() => updateField('followUpWindow', option.key)}
                />
              ))}
            </View>
            <Field
              label="Notes"
              value={form.notes}
              onChangeText={value => updateField('notes', value)}
              placeholder="Add objections, promises, or onboarding notes"
              multiline
            />
          </SectionCard>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Icon name="checkmark-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>
              {prefill ? 'Save Updated Flow' : 'Save Registration'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <Icon
                name="checkmark"
                size={22}
                color={salesmanTheme.success}
              />
            </View>
            <Text style={styles.successTitle}>
              {prefill ? 'Flow updated' : 'Salon registration saved'}
            </Text>
            <Text style={styles.successSubtitle}>
              {createdSalon?.name} is now ready for the next step in the salesman flow.
            </Text>

            <View style={styles.successSummary}>
              <View style={styles.successSummaryRow}>
                <Text style={styles.successSummaryLabel}>Plan</Text>
                <Text style={styles.successSummaryValue}>{createdSalon?.plan}</Text>
              </View>
              <View style={styles.successSummaryRow}>
                <Text style={styles.successSummaryLabel}>Stage</Text>
                <Text style={styles.successSummaryValue}>
                  {createdSalon ? salesmanStageMeta[createdSalon.stage].label : ''}
                </Text>
              </View>
              <View style={styles.successSummaryRow}>
                <Text style={styles.successSummaryLabel}>Next follow-up</Text>
                <Text style={styles.successSummaryValue}>
                  {form.followUpWindow === 'today'
                    ? 'Today'
                    : form.followUpWindow === 'tomorrow'
                      ? 'Tomorrow'
                      : 'In 3 days'}
                </Text>
              </View>
            </View>

            <View style={styles.successActions}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => {
                  setSuccessModalVisible(false);
                  navigation.navigate('SalesSalonsTab');
                }}
                style={styles.successSecondaryButton}
              >
                <Text style={styles.successSecondaryText}>Back to Salons</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => {
                  setSuccessModalVisible(false);
                  if (createdSalon) {
                    navigation.replace('SalesmanSalonDetail', {
                      previewSalon: createdSalon,
                    });
                  }
                }}
                style={styles.successPrimaryButton}
              >
                <Text style={styles.successPrimaryText}>Open Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: salesmanTheme.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  topBar: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  topBarButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.surface,
  },
  topBarCopy: {
    flex: 1,
  },
  topBarTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  topBarSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 20,
    color: salesmanTheme.muted,
  },
  leadBanner: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 22,
    backgroundColor: salesmanTheme.accentSoft,
    marginBottom: 16,
  },
  leadBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  leadBannerSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  sectionCard: {
    padding: 18,
    borderRadius: 24,
    backgroundColor: salesmanTheme.surface,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 20,
    color: salesmanTheme.muted,
  },
  sectionBody: {
    marginTop: 18,
  },
  flexOne: {
    flex: 1,
  },
  fieldBlock: {
    marginBottom: 14,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  textInput: {
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
    color: salesmanTheme.ink,
  },
  multilineInput: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  selectChip: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 16,
    backgroundColor: salesmanTheme.background,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectChipActive: {
    backgroundColor: salesmanTheme.brandSoft,
    borderColor: salesmanTheme.brand,
  },
  selectChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: salesmanTheme.muted,
  },
  selectChipTextActive: {
    color: salesmanTheme.brand,
  },
  stagePreview: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
    marginBottom: 14,
  },
  stagePreviewLabel: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  stagePreviewValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '700',
  },
  submitButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: salesmanTheme.brand,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  successCard: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: salesmanTheme.surface,
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.successSoft,
    alignSelf: 'center',
  },
  successTitle: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: salesmanTheme.ink,
  },
  successSubtitle: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    color: salesmanTheme.muted,
  },
  successSummary: {
    marginTop: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: salesmanTheme.background,
    gap: 10,
  },
  successSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  successSummaryLabel: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  successSummaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  successActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  successSecondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  successSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.muted,
  },
  successPrimaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: salesmanTheme.brand,
  },
  successPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
