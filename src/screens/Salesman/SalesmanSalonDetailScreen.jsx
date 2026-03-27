import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  Linking,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SalesmanSheet from './SalesmanSheet';
import {
  formatCompactCurrency,
  formatCurrency,
  formatFullDate,
  formatShortDate,
  getSalonById,
  salesmanSalons,
  salesmanStageMeta,
  salesmanStatusMeta,
  salesmanTheme,
} from './salesmanData';

const DEFAULT_CHECKLIST = [
  { id: 'default-1', label: 'KYC verified', complete: true },
  { id: 'default-2', label: 'Subscription activated', complete: true },
  { id: 'default-3', label: 'Staff onboarding completed', complete: false },
];

const STAGE_OPTIONS = [
  'prospect',
  'docs_pending',
  'proposal_sent',
  'onboarding',
  'live',
  'inactive',
];

const timelineIcons = {
  visit: 'walk-outline',
  payment: 'wallet-outline',
  onboarding: 'rocket-outline',
  docs: 'document-text-outline',
  support: 'headset-outline',
  status: 'swap-horizontal-outline',
};

const InsightCard = ({ label, value, accent, icon }) => (
  <View style={styles.insightCard}>
    <View style={[styles.insightIcon, { backgroundColor: `${accent}16` }]}>
      <Icon name={icon} size={18} color={accent} />
    </View>
    <Text style={styles.insightLabel}>{label}</Text>
    <Text style={[styles.insightValue, { color: accent }]}>{value}</Text>
  </View>
);

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailRowIcon}>
      <Icon name={icon} size={16} color={salesmanTheme.brand} />
    </View>
    <View style={styles.detailRowCopy}>
      <Text style={styles.detailRowLabel}>{label}</Text>
      <Text style={styles.detailRowValue}>{value}</Text>
    </View>
  </View>
);

const SheetAction = ({ icon, title, subtitle, color, onPress }) => (
  <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.sheetAction}>
    <View style={[styles.sheetIcon, { backgroundColor: `${color}16` }]}>
      <Icon name={icon} size={18} color={color} />
    </View>
    <View style={styles.sheetCopy}>
      <Text style={styles.sheetTitle}>{title}</Text>
      <Text style={styles.sheetSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const ChecklistItem = ({ item }) => (
  <View style={styles.checklistItem}>
    <View
      style={[
        styles.checkCircle,
        item.complete && { backgroundColor: salesmanTheme.successSoft },
      ]}
    >
      <Icon
        name={item.complete ? 'checkmark' : 'ellipse-outline'}
        size={14}
        color={item.complete ? salesmanTheme.success : '#98A2B3'}
      />
    </View>
    <Text style={styles.checklistText}>{item.label}</Text>
  </View>
);

export default function SalesmanSalonDetailScreen({ navigation, route }) {
  const initialSalon =
    route?.params?.previewSalon ||
    getSalonById(route?.params?.id) ||
    salesmanSalons[0];

  const [salon, setSalon] = useState({
    ...initialSalon,
    checklist:
      initialSalon?.checklist?.length ? initialSalon.checklist : DEFAULT_CHECKLIST,
    activities: initialSalon?.activities || [],
  });
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [selectedStage, setSelectedStage] = useState(salon.stage || 'onboarding');
  const [stageNote, setStageNote] = useState(salon.notes || '');

  const statusMeta =
    salesmanStatusMeta[salon.status] || salesmanStatusMeta.PENDING;
  const stageMeta =
    salesmanStageMeta[salon.stage] || salesmanStageMeta.onboarding;
  const completedChecklist = salon.checklist.filter(item => item.complete).length;
  const progressRatio =
    salon.checklist.length > 0
      ? completedChecklist / salon.checklist.length
      : 0;

  const handleOpenUrl = async (url, fallbackMessage) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Unable to open', fallbackMessage);
    }
  };

  const handleSaveStage = () => {
    const nextStatus =
      selectedStage === 'live'
        ? 'ACTIVE'
        : selectedStage === 'inactive'
          ? 'INACTIVE'
          : 'PENDING';

    setSalon(current => ({
      ...current,
      stage: selectedStage,
      status: nextStatus,
      notes: stageNote,
      activities: [
        {
          id: `activity-${Date.now()}`,
          type: 'status',
          title: `Stage moved to ${
            salesmanStageMeta[selectedStage]?.label || selectedStage
          }`,
          at: new Date().toISOString(),
          detail: stageNote || 'Status updated from the salesman dashboard.',
        },
        ...(current.activities || []),
      ],
    }));
    setStageModalVisible(false);
    Alert.alert('Stage updated', 'The salon profile has been updated successfully.');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar
        backgroundColor={salesmanTheme.surface}
        barStyle="dark-content"
      />

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
            <Icon name="arrow-back" size={20} color={salesmanTheme.ink} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() =>
              navigation.navigate('SalesmanRegisterSalon', { prefill: salon })
            }
            style={styles.topBarPill}
          >
            <Icon name="create-outline" size={16} color={salesmanTheme.brand} />
            <Text style={styles.topBarPillText}>Edit flow</Text>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={salon.image || salesmanSalons[0].image}
          style={styles.heroCard}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(15, 23, 42, 0.74)']}
            style={styles.heroOverlay}
          >
            <View style={styles.heroBadges}>
              <View
                style={[
                  styles.heroBadge,
                  { backgroundColor: statusMeta.backgroundColor },
                ]}
              >
                <Text style={[styles.heroBadgeText, { color: statusMeta.color }]}>
                  {statusMeta.label}
                </Text>
              </View>
              <View
                style={[
                  styles.heroBadge,
                  { backgroundColor: stageMeta.backgroundColor },
                ]}
              >
                <Text style={[styles.heroBadgeText, { color: stageMeta.color }]}>
                  {stageMeta.label}
                </Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>{salon.name}</Text>
            <Text style={styles.heroSubtitle}>
              Joined {formatFullDate(salon.joined)} • {salon.plan} Plan
            </Text>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.insightsGrid}>
          <InsightCard
            icon="wallet-outline"
            label="Commission"
            value={formatCurrency(salon.commissionEarned)}
            accent={salesmanTheme.success}
          />
          <InsightCard
            icon="people-outline"
            label="Professionals"
            value={String(salon.professionals)}
            accent={salesmanTheme.brand}
          />
          <InsightCard
            icon="stats-chart-outline"
            label="Monthly revenue"
            value={formatCompactCurrency(salon.monthlyRevenue)}
            accent={salesmanTheme.accent}
          />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Owner & Salon Details</Text>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setActionSheetVisible(true)}
              style={styles.sectionHeaderAction}
            >
              <Icon
                name="ellipsis-horizontal"
                size={18}
                color={salesmanTheme.brand}
              />
            </TouchableOpacity>
          </View>
          <DetailRow icon="person-outline" label="Owner" value={salon.owner} />
          <DetailRow icon="call-outline" label="Phone" value={salon.phone} />
          <DetailRow
            icon="location-outline"
            label="Address"
            value={salon.address}
          />
          <DetailRow
            icon="cash-outline"
            label="Payout status"
            value={salon.payoutStatus}
          />
          <DetailRow icon="share-social-outline" label="Source" value={salon.source} />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderNoAction}>
            <Text style={styles.sectionTitle}>Onboarding Checklist</Text>
            <Text style={styles.sectionValue}>
              {completedChecklist}/{salon.checklist.length}
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progressRatio * 100, 100)}%` },
              ]}
            />
          </View>
          <View style={styles.checklistGroup}>
            {salon.checklist.map(item => (
              <ChecklistItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderNoAction}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setStageModalVisible(true)}
            >
              <Text style={styles.editLink}>Update stage</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.notesText}>
            {salon.notes || 'No additional notes have been added yet.'}
          </Text>
          <View style={styles.dateRow}>
            <View style={styles.dateChip}>
              <Text style={styles.dateChipLabel}>Last visit</Text>
              <Text style={styles.dateChipValue}>
                {formatShortDate(salon.lastVisit || salon.joined)}
              </Text>
            </View>
            <View style={styles.dateChip}>
              <Text style={styles.dateChipLabel}>Next follow-up</Text>
              <Text style={styles.dateChipValue}>
                {formatShortDate(salon.nextFollowUp || salon.joined)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.timelineGroup}>
            {salon.activities.length ? (
              salon.activities.map(activity => (
                <View key={activity.id} style={styles.timelineCard}>
                  <View style={styles.timelineIcon}>
                    <Icon
                      name={
                        timelineIcons[activity.type] || 'sparkles-outline'
                      }
                      size={16}
                      color={salesmanTheme.brand}
                    />
                  </View>
                  <View style={styles.timelineCopy}>
                    <View style={styles.timelineHeader}>
                      <Text style={styles.timelineTitle}>{activity.title}</Text>
                      <Text style={styles.timelineDate}>
                        {formatShortDate(activity.at)}
                      </Text>
                    </View>
                    <Text style={styles.timelineDetail}>{activity.detail}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyTimeline}>No activity captured yet.</Text>
            )}
          </View>
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => setActionSheetVisible(true)}
            style={styles.secondaryCta}
          >
            <Icon name="chatbubble-ellipses-outline" size={18} color={salesmanTheme.brand} />
            <Text style={styles.secondaryCtaText}>Quick Actions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => setStageModalVisible(true)}
            style={styles.primaryCta}
          >
            <Text style={styles.primaryCtaText}>Update Stage</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <SalesmanSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        title={salon.name}
        subtitle="Use quick actions to keep communication and onboarding momentum high."
      >
        <SheetAction
          icon="call-outline"
          title="Call owner"
          subtitle={salon.phone}
          color={salesmanTheme.brand}
          onPress={() =>
            handleOpenUrl(
              `tel:${salon.phone}`,
              'Calling is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="logo-whatsapp"
          title="WhatsApp owner"
          subtitle="Open the conversation for faster follow-ups."
          color="#22C55E"
          onPress={() =>
            handleOpenUrl(
              `whatsapp://send?phone=${String(salon.whatsapp || '').replace(
                /[^\d+]/g,
                '',
              )}`,
              'WhatsApp is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="calendar-outline"
          title="Schedule visit"
          subtitle="Create a reminder for the next in-person salon visit."
          color={salesmanTheme.accent}
          onPress={() => {
            setActionSheetVisible(false);
            Alert.alert(
              'Visit scheduled',
              `A visit reminder has been created for ${salon.name}.`,
            );
          }}
        />
        <SheetAction
          icon="create-outline"
          title="Open edit flow"
          subtitle="Adjust onboarding details using the registration flow."
          color={salesmanTheme.info}
          onPress={() => {
            setActionSheetVisible(false);
            navigation.navigate('SalesmanRegisterSalon', { prefill: salon });
          }}
        />
      </SalesmanSheet>

      <Modal
        visible={stageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Salon Stage</Text>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => setStageModalVisible(false)}
              >
                <Icon name="close" size={22} color={salesmanTheme.ink} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Record the current onboarding state and leave a note for the next action.
            </Text>

            <View style={styles.stageGrid}>
              {STAGE_OPTIONS.map(option => {
                const meta = salesmanStageMeta[option];

                return (
                  <TouchableOpacity
                    key={option}
                    activeOpacity={0.88}
                    onPress={() => setSelectedStage(option)}
                    style={[
                      styles.stageOption,
                      selectedStage === option && {
                        borderColor: meta.color,
                        backgroundColor: meta.backgroundColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stageOptionText,
                        selectedStage === option && { color: meta.color },
                      ]}
                    >
                      {meta.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.inputLabel}>Stage Note</Text>
            <TextInput
              multiline
              value={stageNote}
              onChangeText={setStageNote}
              placeholder="Capture the latest update, objection, or next step."
              placeholderTextColor="#98A2B3"
              style={styles.stageInput}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => setStageModalVisible(false)}
                style={styles.modalSecondaryButton}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleSaveStage}
                style={styles.modalPrimaryButton}
              >
                <Text style={styles.modalPrimaryButtonText}>Save Update</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  topBarButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.surface,
  },
  topBarPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: salesmanTheme.surface,
  },
  topBarPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  heroCard: {
    height: 228,
    borderRadius: 28,
    overflow: 'hidden',
  },
  heroImage: {
    borderRadius: 28,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
  },
  heroBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: 'rgba(255,255,255,0.82)',
  },
  insightsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  insightCard: {
    flex: 1,
    padding: 14,
    borderRadius: 22,
    backgroundColor: salesmanTheme.surface,
  },
  insightIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightLabel: {
    marginTop: 12,
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  insightValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 24,
    backgroundColor: salesmanTheme.surface,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderNoAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  sectionHeaderAction: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.brandSoft,
  },
  sectionValue: {
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  detailRowIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.brandSoft,
  },
  detailRowCopy: {
    flex: 1,
  },
  detailRowLabel: {
    fontSize: 11,
    color: salesmanTheme.muted,
  },
  detailRowValue: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '600',
    color: salesmanTheme.ink,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#E4E7EC',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: salesmanTheme.brand,
  },
  checklistGroup: {
    gap: 12,
    marginTop: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F4F7',
  },
  checklistText: {
    flex: 1,
    fontSize: 13,
    color: salesmanTheme.ink,
  },
  notesText: {
    fontSize: 13,
    lineHeight: 20,
    color: salesmanTheme.muted,
  },
  editLink: {
    fontSize: 13,
    fontWeight: '600',
    color: salesmanTheme.brand,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  dateChip: {
    flex: 1,
    padding: 12,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  dateChipLabel: {
    fontSize: 11,
    color: salesmanTheme.muted,
  },
  dateChipValue: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  timelineGroup: {
    gap: 12,
    marginTop: 14,
  },
  timelineCard: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.brandSoft,
  },
  timelineCopy: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  timelineTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  timelineDate: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  timelineDetail: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  emptyTimeline: {
    fontSize: 13,
    color: salesmanTheme.muted,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  secondaryCta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    backgroundColor: salesmanTheme.surface,
  },
  secondaryCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  primaryCta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.brand,
  },
  primaryCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sheetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 6,
  },
  sheetIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetCopy: {
    flex: 1,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  sheetSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  modalCard: {
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: salesmanTheme.surface,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  modalSubtitle: {
    marginTop: 12,
    fontSize: 13,
    lineHeight: 20,
    color: salesmanTheme.muted,
  },
  stageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  stageOption: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    backgroundColor: salesmanTheme.background,
  },
  stageOptionText: {
    fontSize: 12,
    fontWeight: '700',
    color: salesmanTheme.muted,
  },
  inputLabel: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  stageInput: {
    minHeight: 120,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 18,
    textAlignVertical: 'top',
    backgroundColor: salesmanTheme.background,
    color: salesmanTheme.ink,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  modalSecondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  modalSecondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.muted,
  },
  modalPrimaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: salesmanTheme.brand,
  },
  modalPrimaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
