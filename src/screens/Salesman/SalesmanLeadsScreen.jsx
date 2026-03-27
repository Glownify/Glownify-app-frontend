import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import Icon from 'react-native-vector-icons/Ionicons';
import SalesmanSheet from './SalesmanSheet';
import {
  formatCompactCurrency,
  formatShortDate,
  salesmanLeads,
  salesmanPriorityMeta,
  salesmanStageMeta,
  salesmanTheme,
} from './salesmanData';

const STAGE_ORDER = [
  'prospect',
  'docs_pending',
  'proposal_sent',
  'onboarding',
  'live',
];

const buildFollowUpOptions = () => {
  const now = new Date();
  const today = new Date(now);
  today.setHours(17, 0, 0, 0);

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(11, 0, 0, 0);

  const inThreeDays = new Date(now);
  inThreeDays.setDate(now.getDate() + 3);
  inThreeDays.setHours(16, 0, 0, 0);

  return [
    { id: 'slot-1', label: 'Today, 5:00 PM', value: today.toISOString() },
    { id: 'slot-2', label: 'Tomorrow, 11:00 AM', value: tomorrow.toISOString() },
    { id: 'slot-3', label: 'In 3 days, 4:00 PM', value: inThreeDays.toISOString() },
  ];
};

const FILTERS = [
  { key: 'all', label: 'All leads' },
  { key: 'due', label: 'Due now' },
  { key: 'prospect', label: 'Prospect' },
  { key: 'docs_pending', label: 'Docs Pending' },
  { key: 'proposal_sent', label: 'Proposal Sent' },
  { key: 'onboarding', label: 'Onboarding' },
];

const FilterChip = ({ active, label, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.88}
    onPress={onPress}
    style={[styles.filterChip, active && styles.filterChipActive]}
  >
    <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const SummaryCard = ({ icon, label, value, accent }) => (
  <View style={styles.summaryCard}>
    <View style={[styles.summaryIcon, { backgroundColor: `${accent}16` }]}>
      <Icon name={icon} size={18} color={accent} />
    </View>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={[styles.summaryValue, { color: accent }]}>{value}</Text>
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

export default function SalesmanLeadsScreen({ navigation, route }) {
  const [leads, setLeads] = useState(salesmanLeads);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [followUpNote, setFollowUpNote] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const followUpOptions = buildFollowUpOptions();

  useEffect(() => {
    if (route?.params?.filter) {
      setActiveFilter(route.params.filter);
    }
  }, [route?.params?.filter]);

  const dueLeadsCount = leads.filter(lead =>
    ['prospect', 'docs_pending', 'proposal_sent', 'onboarding'].includes(
      lead.stage,
    ),
  ).length;
  const pipelineValue = leads.reduce(
    (sum, lead) => sum + (Number(lead.estimatedValue) || 0),
    0,
  );
  const proposalCount = leads.filter(
    lead => lead.stage === 'proposal_sent',
  ).length;

  const filteredLeads = leads.filter(lead => {
    if (activeFilter === 'all') {
      return true;
    }

    if (activeFilter === 'due') {
      return ['prospect', 'docs_pending', 'proposal_sent', 'onboarding'].includes(
        lead.stage,
      );
    }

    return lead.stage === activeFilter;
  });

  const openExternal = async (url, fallbackMessage) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Unable to open', fallbackMessage);
    }
  };

  const openFollowUpModal = lead => {
    setSelectedLead(lead);
    setSelectedSlot(followUpOptions[0]?.id || null);
    setFollowUpNote(lead?.notes || '');
    setFollowUpModalVisible(true);
  };

  const advanceLeadStage = lead => {
    const currentStageIndex = STAGE_ORDER.indexOf(lead.stage);
    const nextStage = STAGE_ORDER[currentStageIndex + 1];

    if (!nextStage) {
      Alert.alert('Already at final stage', 'This lead is already marked as live.');
      return;
    }

    setLeads(current =>
      current.map(item =>
        item.id === lead.id
          ? {
              ...item,
              stage: nextStage,
              lastContact: new Date().toISOString(),
            }
          : item,
      ),
    );
    setSelectedLead(null);
  };

  const handleSaveFollowUp = () => {
    if (!selectedLead || !selectedSlot) {
      return;
    }

    const slot = followUpOptions.find(option => option.id === selectedSlot);

    setLeads(current =>
      current.map(item =>
        item.id === selectedLead.id
          ? {
              ...item,
              nextFollowUp: slot?.value || item.nextFollowUp,
              notes: followUpNote || item.notes,
              lastContact: new Date().toISOString(),
            }
          : item,
      ),
    );

    setFollowUpModalVisible(false);
    setSelectedLead(null);
    Alert.alert('Follow-up updated', 'The next touchpoint has been added to the pipeline.');
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
        <Text style={styles.headerTitle}>Lead Pipeline</Text>
        <Text style={styles.headerSubtitle}>
          Prioritize prospects, keep follow-ups moving, and convert warm leads faster.
        </Text>

        <View style={styles.summaryGrid}>
          <SummaryCard
            icon="timer-outline"
            label="Due now"
            value={String(dueLeadsCount)}
            accent={salesmanTheme.brand}
          />
          <SummaryCard
            icon="wallet-outline"
            label="Pipeline value"
            value={formatCompactCurrency(pipelineValue)}
            accent={salesmanTheme.accent}
          />
          <SummaryCard
            icon="paper-plane-outline"
            label="Proposals sent"
            value={String(proposalCount)}
            accent={salesmanTheme.info}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {FILTERS.map(filter => (
            <FilterChip
              key={filter.key}
              label={filter.label}
              active={activeFilter === filter.key}
              onPress={() => setActiveFilter(filter.key)}
            />
          ))}
        </ScrollView>

        <View style={styles.leadList}>
          {filteredLeads.map(lead => {
            const stageMeta = salesmanStageMeta[lead.stage];
            const priorityMeta = salesmanPriorityMeta[lead.priority];
            const nextStage =
              STAGE_ORDER[STAGE_ORDER.indexOf(lead.stage) + 1] || null;

            return (
              <TouchableOpacity
                activeOpacity={0.94}
                key={lead.id}
                style={styles.leadCard}
                onPress={() => setSelectedLead(lead)}
              >
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.stageBadge,
                      { backgroundColor: stageMeta.backgroundColor },
                    ]}
                  >
                    <Icon
                      name={stageMeta.icon}
                      size={14}
                      color={stageMeta.color}
                    />
                    <Text
                      style={[
                        styles.stageBadgeText,
                        { color: stageMeta.color },
                      ]}
                    >
                      {stageMeta.label}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.priorityBadge,
                      { backgroundColor: priorityMeta.backgroundColor },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityBadgeText,
                        { color: priorityMeta.color },
                      ]}
                    >
                      {priorityMeta.label}
                    </Text>
                  </View>
                </View>

                <Text style={styles.leadName}>{lead.salonName}</Text>
                <Text style={styles.leadOwner}>Owner: {lead.ownerName}</Text>

                <View style={styles.leadMetaRow}>
                  <View style={styles.metaItem}>
                    <Icon name="location-outline" size={15} color="#667085" />
                    <Text style={styles.metaText}>{lead.city}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon name="pricetag-outline" size={15} color="#667085" />
                    <Text style={styles.metaText}>{lead.planInterest}</Text>
                  </View>
                </View>

                <View style={styles.leadValueRow}>
                  <Text style={styles.valueLabel}>Estimated value</Text>
                  <Text style={styles.valueText}>
                    {formatCompactCurrency(lead.estimatedValue)}
                  </Text>
                </View>

                <View style={styles.timelineRow}>
                  <View style={styles.timelineItem}>
                    <Text style={styles.timelineLabel}>Last touch</Text>
                    <Text style={styles.timelineValue}>
                      {formatShortDate(lead.lastContact)}
                    </Text>
                  </View>
                  <View style={styles.timelineItem}>
                    <Text style={styles.timelineLabel}>Next follow-up</Text>
                    <Text style={styles.timelineValue}>
                      {formatShortDate(lead.nextFollowUp)}
                    </Text>
                  </View>
                </View>

                <View style={styles.inlineActions}>
                  <TouchableOpacity
                    activeOpacity={0.88}
                    style={styles.inlineButton}
                    onPress={() =>
                      openExternal(
                        `tel:${lead.phone}`,
                        'Calling is not available on this device.',
                      )
                    }
                  >
                    <Icon
                      name="call-outline"
                      size={16}
                      color={salesmanTheme.brand}
                    />
                    <Text style={styles.inlineButtonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.88}
                    style={styles.inlineButton}
                    onPress={() => openFollowUpModal(lead)}
                  >
                    <Icon
                      name="calendar-outline"
                      size={16}
                      color={salesmanTheme.accent}
                    />
                    <Text style={styles.inlineButtonText}>Follow-up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.88}
                    style={styles.inlineButton}
                    onPress={() =>
                      navigation.navigate('SalesmanRegisterSalon', {
                        leadId: lead.id,
                      })
                    }
                  >
                    <Icon
                      name="add-circle-outline"
                      size={16}
                      color={salesmanTheme.info}
                    />
                    <Text style={styles.inlineButtonText}>
                      {nextStage === 'live' ? 'Go live' : 'Register'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <SalesmanSheet
        visible={Boolean(selectedLead) && !followUpModalVisible}
        onClose={() => setSelectedLead(null)}
        title={selectedLead?.salonName || 'Lead actions'}
        subtitle={selectedLead?.notes || 'Pick the fastest next action for this lead.'}
      >
        <SheetAction
          icon="call-outline"
          title="Call owner"
          subtitle={selectedLead?.phone || 'Use the lead contact number'}
          color={salesmanTheme.brand}
          onPress={() =>
            openExternal(
              `tel:${selectedLead?.phone || ''}`,
              'Calling is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="logo-whatsapp"
          title="Send WhatsApp message"
          subtitle="Continue the conversation and answer objections quickly."
          color="#22C55E"
          onPress={() =>
            openExternal(
              `whatsapp://send?phone=${String(
                selectedLead?.whatsapp || '',
              ).replace(/[^\d+]/g, '')}`,
              'WhatsApp is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="calendar-outline"
          title="Schedule follow-up"
          subtitle="Pick the next reminder and add a quick note."
          color={salesmanTheme.accent}
          onPress={() => openFollowUpModal(selectedLead)}
        />
        <SheetAction
          icon="trending-up-outline"
          title="Advance stage"
          subtitle="Move the lead forward after the latest conversation."
          color={salesmanTheme.info}
          onPress={() => advanceLeadStage(selectedLead)}
        />
        <SheetAction
          icon="add-circle-outline"
          title="Register salon"
          subtitle="Start converting this opportunity into a live partner."
          color={salesmanTheme.success}
          onPress={() => {
            const leadId = selectedLead?.id;
            setSelectedLead(null);
            if (leadId) {
              navigation.navigate('SalesmanRegisterSalon', { leadId });
            }
          }}
        />
      </SalesmanSheet>

      <Modal
        visible={followUpModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFollowUpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Schedule follow-up</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setFollowUpModalVisible(false)}
              >
                <Icon name="close" size={22} color={salesmanTheme.ink} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLeadName}>{selectedLead?.salonName}</Text>
            <Text style={styles.modalLeadSubtitle}>
              Keep the conversation warm by locking the next touchpoint now.
            </Text>

            <View style={styles.slotGrid}>
              {followUpOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  activeOpacity={0.88}
                  onPress={() => setSelectedSlot(option.id)}
                  style={[
                    styles.slotChip,
                    selectedSlot === option.id && styles.slotChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selectedSlot === option.id && styles.slotTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.noteLabel}>Note</Text>
            <TextInput
              multiline
              value={followUpNote}
              onChangeText={setFollowUpNote}
              placeholder="Capture what the owner asked for or what needs to happen next."
              placeholderTextColor="#98A2B3"
              style={styles.noteInput}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => setFollowUpModalVisible(false)}
                style={styles.modalSecondaryButton}
              >
                <Text style={styles.modalSecondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleSaveFollowUp}
                style={styles.modalPrimaryButton}
              >
                <Text style={styles.modalPrimaryButtonText}>Save Follow-up</Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 20,
    color: salesmanTheme.muted,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  summaryCard: {
    flex: 1,
    padding: 14,
    borderRadius: 22,
    backgroundColor: salesmanTheme.surface,
  },
  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    marginTop: 12,
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  summaryValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '700',
  },
  filtersRow: {
    gap: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: salesmanTheme.surface,
  },
  filterChipActive: {
    backgroundColor: salesmanTheme.brandSoft,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: salesmanTheme.muted,
  },
  filterChipTextActive: {
    color: salesmanTheme.brand,
  },
  leadList: {
    marginTop: 8,
    gap: 14,
  },
  leadCard: {
    padding: 18,
    borderRadius: 24,
    backgroundColor: salesmanTheme.surface,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  stageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  stageBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },
  priorityBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  leadName: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  leadOwner: {
    marginTop: 4,
    fontSize: 13,
    color: salesmanTheme.muted,
  },
  leadMetaRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  leadValueRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  valueLabel: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  valueText: {
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.accent,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  timelineItem: {
    flex: 1,
    padding: 12,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  timelineLabel: {
    fontSize: 11,
    color: salesmanTheme.muted,
  },
  timelineValue: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  inlineActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  inlineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: salesmanTheme.background,
  },
  inlineButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: salesmanTheme.ink,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  modalLeadName: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  modalLeadSubtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: salesmanTheme.muted,
  },
  slotGrid: {
    marginTop: 18,
    gap: 10,
  },
  slotChip: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: salesmanTheme.background,
  },
  slotChipActive: {
    backgroundColor: salesmanTheme.brandSoft,
  },
  slotText: {
    fontSize: 13,
    fontWeight: '600',
    color: salesmanTheme.muted,
  },
  slotTextActive: {
    color: salesmanTheme.brand,
  },
  noteLabel: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  noteInput: {
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
