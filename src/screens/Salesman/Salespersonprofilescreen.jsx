import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import SalesmanSheet from './SalesmanSheet';
import {
  buildProfileStats,
  buildSalesmanSummary,
  buildSalesmanUser,
  defaultNotificationSettings,
  formatFullDate,
  salesmanAchievements,
  salesmanTheme,
} from './salesmanData';

const StatCard = ({ item }) => (
  <View style={styles.statCard}>
    <View
      style={[
        styles.statIcon,
        { backgroundColor: item.backgroundColor },
      ]}
    >
      <Icon name={item.icon} size={18} color={item.color} />
    </View>
    <Text style={styles.statLabel}>{item.label}</Text>
    <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
  </View>
);

const ToggleRow = ({ title, icon, color, value, onValueChange }) => (
  <View style={styles.toggleRow}>
    <View style={styles.toggleCopy}>
      <View style={[styles.toggleIcon, { backgroundColor: `${color}16` }]}>
        <Icon name={icon} size={18} color={color} />
      </View>
      <Text style={styles.toggleTitle}>{title}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#D0D5DD', true: `${color}44` }}
      thumbColor={value ? color : '#FFFFFF'}
    />
  </View>
);

const ShortcutRow = ({ icon, title, subtitle, color, onPress }) => (
  <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.shortcutRow}>
    <View style={[styles.shortcutIcon, { backgroundColor: `${color}16` }]}>
      <Icon name={icon} size={18} color={color} />
    </View>
    <View style={styles.shortcutCopy}>
      <Text style={styles.shortcutTitle}>{title}</Text>
      <Text style={styles.shortcutSubtitle}>{subtitle}</Text>
    </View>
    <Icon name="chevron-forward" size={18} color="#98A2B3" />
  </TouchableOpacity>
);

const AchievementCard = ({ item }) => (
  <View style={styles.achievementCard}>
    <View
      style={[
        styles.achievementIcon,
        { backgroundColor: item.backgroundColor },
      ]}
    >
      <Icon name={item.icon} size={18} color={item.color} />
    </View>
    <View style={styles.flexOne}>
      <Text style={styles.achievementTitle}>{item.title}</Text>
      <Text style={styles.achievementSubtitle}>{item.description}</Text>
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

export default function SalesPersonProfileScreen() {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [supportSheetVisible, setSupportSheetVisible] = useState(false);
  const [shareSheetVisible, setShareSheetVisible] = useState(false);
  const [notifications, setNotifications] = useState(defaultNotificationSettings);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
  });

  const user = buildSalesmanUser(authUser);
  const summary = buildSalesmanSummary();
  const stats = buildProfileStats(summary);
  const referralLink = `https://glownify.app/join/${user.referralId}`;
  const shareMessage = `Use my Glownify referral code ${user.referralId} to get started: ${referralLink}`;

  useEffect(() => {
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      whatsapp: user.whatsappNumber || user.phone || '',
      address: user.address || '',
    });
  }, [user.address, user.email, user.name, user.phone, user.whatsappNumber]);

  const updateForm = (key, value) => {
    setForm(current => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.email || !form.phone) {
      Alert.alert(
        'Missing details',
        'Please fill your name, email, and phone number before saving.',
      );
      return;
    }

    setEditMode(false);
    Alert.alert(
      'Profile updated',
      'Your personal details were saved for this role flow.',
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to sign out from this account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  const openExternal = async (url, fallbackMessage) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Unable to open', fallbackMessage);
    }
  };

  const handleShareSystem = async () => {
    try {
      await Share.share({ message: shareMessage });
    } catch (error) {
      Alert.alert('Share unavailable', 'Could not open the share menu right now.');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar
        backgroundColor={salesmanTheme.brandDark}
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <LinearGradient
          colors={[salesmanTheme.brandDark, salesmanTheme.brand]}
          style={styles.heroCard}
        >
          <View style={styles.heroHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name?.charAt(0)?.toUpperCase() || 'S'}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setEditMode(current => !current)}
              style={styles.editButton}
            >
              <Icon name={editMode ? 'close' : 'create-outline'} size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.heroName}>{user.name}</Text>
          <Text style={styles.heroSubtitle}>{user.territory} • Salesman</Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.heroMetaPill}>
              <Text style={styles.heroMetaPillText}>{user.referralId}</Text>
            </View>
            <Text style={styles.joinedText}>
              Joined {formatFullDate(user.createdAt)}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          {stats.map(item => (
            <StatCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            {editMode ? 'Edit Contact Details' : 'Contact Details'}
          </Text>

          {editMode ? (
            <View style={styles.formGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  value={form.name}
                  onChangeText={value => updateForm('name', value)}
                  placeholder="Enter your name"
                  placeholderTextColor="#98A2B3"
                  style={styles.textInput}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  value={form.email}
                  onChangeText={value => updateForm('email', value)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  placeholderTextColor="#98A2B3"
                  style={styles.textInput}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  value={form.phone}
                  onChangeText={value => updateForm('phone', value)}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  placeholderTextColor="#98A2B3"
                  style={styles.textInput}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.inputLabel}>WhatsApp</Text>
                <TextInput
                  value={form.whatsapp}
                  onChangeText={value => updateForm('whatsapp', value)}
                  placeholder="Enter WhatsApp number"
                  keyboardType="phone-pad"
                  placeholderTextColor="#98A2B3"
                  style={styles.textInput}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  value={form.address}
                  onChangeText={value => updateForm('address', value)}
                  placeholder="Enter address"
                  placeholderTextColor="#98A2B3"
                  multiline
                  style={[styles.textInput, styles.multilineInput]}
                />
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => setEditMode(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={handleSave}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.detailList}>
              <ShortcutRow
                icon="mail-outline"
                title={user.email}
                subtitle="Primary email"
                color={salesmanTheme.info}
                onPress={() => {}}
              />
              <ShortcutRow
                icon="call-outline"
                title={user.phone}
                subtitle="Primary number"
                color={salesmanTheme.brand}
                onPress={() => {}}
              />
              <ShortcutRow
                icon="logo-whatsapp"
                title={user.whatsappNumber || user.phone}
                subtitle="WhatsApp line"
                color="#22C55E"
                onPress={() => {}}
              />
              <ShortcutRow
                icon="location-outline"
                title={user.address}
                subtitle="Current address"
                color={salesmanTheme.accent}
                onPress={() => {}}
              />
            </View>
          )}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Territory Highlights</Text>
          <View style={styles.achievementList}>
            {salesmanAchievements.map(item => (
              <AchievementCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.toggleGroup}>
            <ToggleRow
              title="Push Notifications"
              icon="notifications-outline"
              color={salesmanTheme.accent}
              value={notifications.push}
              onValueChange={value =>
                setNotifications(current => ({ ...current, push: value }))
              }
            />
            <ToggleRow
              title="Email Updates"
              icon="mail-outline"
              color={salesmanTheme.info}
              value={notifications.email}
              onValueChange={value =>
                setNotifications(current => ({ ...current, email: value }))
              }
            />
            <ToggleRow
              title="SMS Alerts"
              icon="chatbubble-outline"
              color={salesmanTheme.brand}
              value={notifications.sms}
              onValueChange={value =>
                setNotifications(current => ({ ...current, sms: value }))
              }
            />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Shortcuts</Text>
          <View style={styles.shortcutList}>
            <ShortcutRow
              icon="share-social-outline"
              title="Share referral code"
              subtitle="Send your invite link to a salon owner or warm lead."
              color={salesmanTheme.info}
              onPress={() => setShareSheetVisible(true)}
            />
            <ShortcutRow
              icon="headset-outline"
              title="Help & support"
              subtitle="Reach support or review your territory responsibilities."
              color={salesmanTheme.brand}
              onPress={() => setSupportSheetVisible(true)}
            />
            <ShortcutRow
              icon="log-out-outline"
              title="Logout"
              subtitle="Sign out from the salesman dashboard."
              color={salesmanTheme.danger}
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>

      <SalesmanSheet
        visible={shareSheetVisible}
        onClose={() => setShareSheetVisible(false)}
        title="Share Referral Code"
        subtitle="Use the invite that already carries your referral code so new salons stay attributed to your pipeline."
        footer={
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleShareSystem}
            style={styles.sheetPrimaryButton}
          >
            <Text style={styles.sheetPrimaryButtonText}>Open Share Menu</Text>
          </TouchableOpacity>
        }
      >
        <View style={styles.referralCard}>
          <Text style={styles.referralCode}>{user.referralId}</Text>
          <Text style={styles.referralLink} numberOfLines={1}>
            {referralLink}
          </Text>
        </View>
        <SheetAction
          icon="logo-whatsapp"
          title="Share on WhatsApp"
          subtitle="Open WhatsApp with a ready-to-send referral message."
          color="#22C55E"
          onPress={() =>
            openExternal(
              `whatsapp://send?text=${encodeURIComponent(shareMessage)}`,
              'WhatsApp is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="mail-outline"
          title="Share by email"
          subtitle="Open your email app with a pre-filled invitation."
          color={salesmanTheme.info}
          onPress={() =>
            openExternal(
              `mailto:?subject=${encodeURIComponent(
                'Join Glownify',
              )}&body=${encodeURIComponent(shareMessage)}`,
              'A mail app is not configured on this device.',
            )
          }
        />
      </SalesmanSheet>

      <SalesmanSheet
        visible={supportSheetVisible}
        onClose={() => setSupportSheetVisible(false)}
        title="Help & Support"
        subtitle="Support options for onboarding issues, payout questions, and territory escalation."
      >
        <SheetAction
          icon="mail-outline"
          title="Email support"
          subtitle="support@glownify.app"
          color={salesmanTheme.info}
          onPress={() =>
            openExternal(
              'mailto:support@glownify.app?subject=Salesman%20Support',
              'A mail app is not configured on this device.',
            )
          }
        />
        <SheetAction
          icon="call-outline"
          title="Call escalation desk"
          subtitle="+91 90000 00111"
          color={salesmanTheme.brand}
          onPress={() =>
            openExternal(
              'tel:+919000000111',
              'Calling is not available on this device.',
            )
          }
        />
        <SheetAction
          icon="map-outline"
          title="Territory focus"
          subtitle={`Keep visits concentrated in ${user.territory} this week.`}
          color={salesmanTheme.accent}
          onPress={() => {
            setSupportSheetVisible(false);
            Alert.alert(
              'Territory focus',
              `Your active territory for this role is ${user.territory}.`,
            );
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
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  heroCard: {
    borderRadius: 28,
    padding: 20,
    marginTop: 12,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  heroName: {
    marginTop: 16,
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  heroMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  heroMetaPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  heroMetaPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  joinedText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    padding: 14,
    borderRadius: 22,
    backgroundColor: salesmanTheme.surface,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    marginTop: 12,
    fontSize: 12,
    color: salesmanTheme.muted,
  },
  statValue: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  formGroup: {
    marginTop: 18,
  },
  inputBlock: {
    marginBottom: 14,
  },
  inputLabel: {
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.muted,
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: salesmanTheme.brand,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  detailList: {
    marginTop: 18,
    gap: 10,
  },
  shortcutList: {
    marginTop: 16,
    gap: 12,
  },
  shortcutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  shortcutIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutCopy: {
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  shortcutTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  shortcutSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  achievementList: {
    marginTop: 16,
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  achievementIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  achievementSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: salesmanTheme.muted,
  },
  toggleGroup: {
    gap: 12,
    marginTop: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    backgroundColor: salesmanTheme.background,
  },
  toggleCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: salesmanTheme.ink,
  },
  referralCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: salesmanTheme.brandSoft,
  },
  referralCode: {
    fontSize: 24,
    fontWeight: '700',
    color: salesmanTheme.brand,
  },
  referralLink: {
    marginTop: 8,
    fontSize: 12,
    color: salesmanTheme.muted,
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
  sheetPrimaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: salesmanTheme.brand,
  },
  sheetPrimaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
