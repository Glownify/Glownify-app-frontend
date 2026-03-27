import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
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
  buildSalesmanSummary,
  formatCurrency,
  formatShortDate,
  salesmanSalons,
  salesmanStatusMeta,
  salesmanTheme,
} from './salesmanData';

const FILTERS = ['all', 'ACTIVE', 'PENDING', 'INACTIVE'];

const SummaryTile = ({ label, value, accent }) => (
  <View style={styles.summaryTile}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={[styles.summaryValue, { color: accent }]}>{value}</Text>
  </View>
);

const FilterChip = ({ label, active, onPress }) => (
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

export default function MySalonsScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSalon, setSelectedSalon] = useState(null);
  const summary = buildSalesmanSummary();

  const normalizedQuery = query.trim().toLowerCase();
  const filteredSalons = salesmanSalons.filter(salon => {
    const matchesStatus =
      statusFilter === 'all' || salon.status === statusFilter;
    const matchesQuery =
      !normalizedQuery ||
      [
        salon.name,
        salon.owner,
        salon.city,
        salon.address,
        salon.plan,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });

  const handleOpenUrl = async (url, fallbackMessage) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Unable to open', fallbackMessage);
    }
  };

  const handleScheduleVisit = () => {
    if (!selectedSalon) {
      return;
    }

    Alert.alert(
      'Visit scheduled',
      `A follow-up visit reminder has been created for ${selectedSalon.name}.`,
    );
    setSelectedSalon(null);
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
        <View style={styles.headerRow}>
          <View style={styles.headerCopy}>
            <Text style={styles.headerTitle}>My Salons</Text>
            <Text style={styles.headerSubtitle}>
              Track partner health, payouts, and next follow-ups.
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => navigation.navigate('SalesmanRegisterSalon')}
            style={styles.addButton}
          >
            <Icon name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Icon name="search-outline" size={18} color="#98A2B3" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by salon, owner, city, or plan"
            placeholderTextColor="#98A2B3"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.summaryCard}>
          <SummaryTile
            label="Total partners"
            value={String(summary.totalSalons)}
            accent={salesmanTheme.brand}
          />
          <SummaryTile
            label="Active"
            value={String(summary.activeSalons)}
            accent={salesmanTheme.success}
          />
          <SummaryTile
            label="Pending"
            value={String(summary.pendingSalons)}
            accent={salesmanTheme.warning}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map(filter => (
            <FilterChip
              key={filter}
              label={filter === 'all' ? 'All statuses' : filter}
              active={statusFilter === filter}
              onPress={() => setStatusFilter(filter)}
            />
          ))}
        </ScrollView>

        <View style={styles.cardList}>
          {filteredSalons.length ? (
            filteredSalons.map(salon => {
              const statusMeta =
                salesmanStatusMeta[salon.status] || salesmanStatusMeta.PENDING;

              return (
                <View key={salon.id} style={styles.salonCard}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={salon.image}
                      resizeMode="cover"
                      style={styles.salonImage}
                    />
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusMeta.backgroundColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          { color: statusMeta.color },
                        ]}
                      >
                        {statusMeta.label}
                      </Text>
                    </View>
                    <View style={styles.planBadge}>
                      <Text style={styles.planBadgeText}>{salon.plan} Plan</Text>
                    </View>
                  </View>

                  <View style={styles.salonBody}>
                    <Text style={styles.salonName}>{salon.name}</Text>
                    <View style={styles.metaRow}>
                      <Icon name="person-outline" size={15} color="#667085" />
                      <Text style={styles.metaText}>{salon.owner}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Icon name="location-outline" size={15} color="#667085" />
                      <Text numberOfLines={1} style={styles.metaText}>
                        {salon.address}
                      </Text>
                    </View>
                    <View style={styles.statsRow}>
                      <View style={styles.statPill}>
                        <Text style={styles.statPillLabel}>Commission</Text>
                        <Text style={styles.statPillValue}>
                          {formatCurrency(salon.commissionEarned)}
                        </Text>
                      </View>
                      <View style={styles.statPill}>
                        <Text style={styles.statPillLabel}>Team size</Text>
                        <Text style={styles.statPillValue}>{salon.teamSize}</Text>
                      </View>
                    </View>
                    <View style={styles.followUpRow}>
                      <Text style={styles.followUpLabel}>Next follow-up</Text>
                      <Text style={styles.followUpValue}>
                        {formatShortDate(salon.nextFollowUp)}
                      </Text>
                    </View>
                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        activeOpacity={0.88}
                        onPress={() =>
                          navigation.navigate('SalesmanSalonDetail', { id: salon.id })
                        }
                        style={styles.primaryButton}
                      >
                        <Text style={styles.primaryButtonText}>View Details</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.88}
                        onPress={() => setSelectedSalon(salon)}
                        style={styles.secondaryButton}
                      >
                        <Icon
                          name="ellipsis-horizontal"
                          size={18}
                          color={salesmanTheme.brand}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Icon
                  name="storefront-outline"
                  size={26}
                  color={salesmanTheme.brand}
                />
              </View>
              <Text style={styles.emptyTitle}>No salons match this filter</Text>
              <Text style={styles.emptySubtitle}>
                Try another status, clear your search, or register a new salon.
              </Text>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => navigation.navigate('SalesmanRegisterSalon')}
                style={styles.emptyButton}
              >
                <Text style={styles.emptyButtonText}>Register Salon</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <SalesmanSheet
        visible={Boolean(selectedSalon)}
        onClose={() => setSelectedSalon(null)}
        title={selectedSalon?.name || 'Salon actions'}
        subtitle="Choose the quickest next action for this partner."
      >
        <SheetAction
          icon="call-outline"
          title="Call owner"
          subtitle={selectedSalon?.phone || 'Use the registered contact number'}
          color={salesmanTheme.brand}
          onPress={() =>
            handleOpenUrl(
              `tel:${selectedSalon?.phone || ''}`,
              'Calling is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="logo-whatsapp"
          title="Open WhatsApp"
          subtitle="Continue the onboarding conversation with the owner."
          color="#22C55E"
          onPress={() =>
            handleOpenUrl(
              `whatsapp://send?phone=${String(
                selectedSalon?.whatsapp || '',
              ).replace(/[^\d+]/g, '')}`,
              'WhatsApp is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="calendar-outline"
          title="Schedule visit"
          subtitle="Create a reminder for the next in-person follow-up."
          color={salesmanTheme.accent}
          onPress={handleScheduleVisit}
        />
        <SheetAction
          icon="open-outline"
          title="Open salon profile"
          subtitle="Review onboarding checklist, notes, and recent activity."
          color={salesmanTheme.info}
          onPress={() => {
            const salonId = selectedSalon?.id;
            setSelectedSalon(null);
            if (salonId) {
              navigation.navigate('SalesmanSalonDetail', { id: salonId });
            }
          }}
        />
      </SalesmanSheet>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerCopy: {
    flex: 1,
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.brand,
  },
  searchBar: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: salesmanTheme.surface,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    color: salesmanTheme.ink,
  },
  summaryCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: salesmanTheme.surface,
  },
  summaryTile: {
    flex: 1,
    padding: 12,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  summaryLabel: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  summaryValue: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
  },
  filterRow: {
    gap: 10,
    paddingTop: 18,
    paddingBottom: 8,
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
  cardList: {
    marginTop: 8,
    gap: 14,
  },
  salonCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: salesmanTheme.surface,
  },
  imageWrapper: {
    position: 'relative',
  },
  salonImage: {
    width: '100%',
    height: 168,
  },
  statusBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  planBadge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(17, 24, 39, 0.72)',
  },
  planBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  salonBody: {
    padding: 18,
  },
  salonName: {
    fontSize: 19,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  metaRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    flex: 1,
    fontSize: 13,
    color: salesmanTheme.muted,
  },
  statsRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  statPill: {
    flex: 1,
    padding: 12,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  statPillLabel: {
    fontSize: 11,
    color: salesmanTheme.muted,
  },
  statPillValue: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  followUpRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  followUpLabel: {
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  followUpValue: {
    fontSize: 13,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.brand,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 44,
    borderRadius: 24,
    backgroundColor: salesmanTheme.surface,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: salesmanTheme.brandSoft,
  },
  emptyTitle: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    color: salesmanTheme.muted,
  },
  emptyButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: salesmanTheme.brand,
  },
  emptyButtonText: {
    fontSize: 13,
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
});
