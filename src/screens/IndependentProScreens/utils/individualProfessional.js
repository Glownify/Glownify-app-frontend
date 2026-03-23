const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DEFAULT_AVAILABILITY = [
  { day: 'Mon', enabled: true, start: '09:00', end: '18:00' },
  { day: 'Tue', enabled: true, start: '09:00', end: '18:00' },
  { day: 'Wed', enabled: true, start: '09:00', end: '18:00' },
  { day: 'Thu', enabled: true, start: '09:00', end: '18:00' },
  { day: 'Fri', enabled: true, start: '09:00', end: '18:00' },
  { day: 'Sat', enabled: true, start: '10:00', end: '16:00' },
  { day: 'Sun', enabled: false, start: '10:00', end: '14:00' },
];

const FALLBACK_REPORT = {
  day: {
    earnings: 1800,
    earningsDiff: 8.2,
    completedBookings: 5,
    bookingsDiff: 11.1,
    repeatClients: 2,
    repeatClientsDiff: 5.5,
    avgServiceValue: 360,
    avgServiceValueDiff: 4.7,
    revenueBar: [
      { value: 300, label: '9a', frontColor: '#fda4af' },
      { value: 540, label: '11a', frontColor: '#e11d48' },
      { value: 420, label: '1p', frontColor: '#fb7185' },
      { value: 300, label: '3p', frontColor: '#fda4af' },
      { value: 240, label: '5p', frontColor: '#e11d48' },
    ],
    bookingsLine: [
      { value: 1, label: '9a' },
      { value: 2, label: '11a' },
      { value: 1, label: '1p' },
      { value: 1, label: '3p' },
      { value: 1, label: '5p' },
    ],
  },
  week: {
    earnings: 12800,
    earningsDiff: 13.4,
    completedBookings: 34,
    bookingsDiff: 9.8,
    repeatClients: 12,
    repeatClientsDiff: 14.2,
    avgServiceValue: 376,
    avgServiceValueDiff: 3.9,
    revenueBar: [
      { value: 1200, label: 'Mon', frontColor: '#fda4af' },
      { value: 1800, label: 'Tue', frontColor: '#e11d48' },
      { value: 1650, label: 'Wed', frontColor: '#fb7185' },
      { value: 2100, label: 'Thu', frontColor: '#e11d48' },
      { value: 1750, label: 'Fri', frontColor: '#fda4af' },
      { value: 2500, label: 'Sat', frontColor: '#e11d48' },
      { value: 1800, label: 'Sun', frontColor: '#fb7185' },
    ],
    bookingsLine: [
      { value: 4, label: 'Mon' },
      { value: 6, label: 'Tue' },
      { value: 5, label: 'Wed' },
      { value: 7, label: 'Thu' },
      { value: 4, label: 'Fri' },
      { value: 5, label: 'Sat' },
      { value: 3, label: 'Sun' },
    ],
  },
  month: {
    earnings: 54600,
    earningsDiff: 18.1,
    completedBookings: 142,
    bookingsDiff: 12.7,
    repeatClients: 51,
    repeatClientsDiff: 20.4,
    avgServiceValue: 384,
    avgServiceValueDiff: 6.1,
    revenueBar: [
      { value: 12100, label: 'W1', frontColor: '#fda4af' },
      { value: 13850, label: 'W2', frontColor: '#e11d48' },
      { value: 14300, label: 'W3', frontColor: '#fb7185' },
      { value: 14350, label: 'W4', frontColor: '#e11d48' },
    ],
    bookingsLine: [
      { value: 31, label: 'W1' },
      { value: 36, label: 'W2' },
      { value: 38, label: 'W3' },
      { value: 37, label: 'W4' },
    ],
  },
};

const FALLBACK_SERVICE_MIX = [
  { name: 'Hair Styling', bookings: 42, revenue: 16800, color: '#e11d48' },
  { name: 'Skin Care', bookings: 31, revenue: 15500, color: '#f97316' },
  { name: 'Makeup', bookings: 24, revenue: 14400, color: '#fb7185' },
  { name: 'Home Visits', bookings: 18, revenue: 7900, color: '#fda4af' },
];

const FALLBACK_HIGHLIGHTS = [
  {
    title: 'Peak Day',
    subtitle: 'Highest completed bookings',
    value: 'Saturday',
    icon: 'sparkles-outline',
    color: '#e11d48',
  },
  {
    title: 'Repeat Rate',
    subtitle: 'Returning clients this month',
    value: '36%',
    icon: 'refresh-outline',
    color: '#f97316',
  },
  {
    title: 'On-time Start',
    subtitle: 'Appointments started on time',
    value: '94%',
    icon: 'time-outline',
    color: '#0891b2',
  },
  {
    title: 'Home Service Mix',
    subtitle: 'Bookings at client location',
    value: '28%',
    icon: 'home-outline',
    color: '#16a34a',
  },
];

const FALLBACK_TRANSACTIONS = [
  {
    id: 'txn-1',
    label: 'Weekend payout',
    date: 'Today, 9:15 AM',
    amount: 3200,
    status: 'credited',
  },
  {
    id: 'txn-2',
    label: 'Home service bonus',
    date: 'Yesterday, 7:45 PM',
    amount: 850,
    status: 'credited',
  },
  {
    id: 'txn-3',
    label: 'Platform fee',
    date: 'Yesterday, 11:30 AM',
    amount: -180,
    status: 'debited',
  },
];

const FALLBACK_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New booking request',
    message: 'Rhea Kapoor requested a home appointment for bridal makeup.',
    time: '5 min ago',
    type: 'booking',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Weekly payout processed',
    message: '₹12,800 has been transferred to your registered bank account.',
    time: '2 hours ago',
    type: 'wallet',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Profile insight',
    message: 'Your profile was viewed 18 times this week. Add more portfolio images to convert more leads.',
    time: 'Yesterday',
    type: 'insight',
    read: true,
  },
];

const safeNumber = value => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

const normalizeDay = day => {
  if (!day) {
    return '';
  }

  const compact = String(day).slice(0, 3).toLowerCase();
  const match = DAY_ORDER.find(item => item.toLowerCase() === compact);
  return match || '';
};

const normalizeAvailability = availability => {
  if (!Array.isArray(availability) || availability.length === 0) {
    return DEFAULT_AVAILABILITY;
  }

  return DAY_ORDER.map(day => {
    const daySlots = availability.filter(slot => normalizeDay(slot.day) === day);

    if (!daySlots.length) {
      const fallback = DEFAULT_AVAILABILITY.find(item => item.day === day);
      return fallback || { day, enabled: false, start: '09:00', end: '18:00' };
    }

    return {
      day,
      enabled: true,
      start: daySlots[0]?.start || '09:00',
      end: daySlots[daySlots.length - 1]?.end || '18:00',
    };
  });
};

const createPieData = items =>
  items.map(item => ({
    value: item.bookings,
    color: item.color,
    text: `${Math.round((item.bookings / items.reduce((sum, current) => sum + current.bookings, 0)) * 100)}%`,
  }));

export function getIndividualProfessionalContext(user) {
  const roleDetails = user?.roleDetails || {};
  const location = roleDetails?.location || {};
  const galleryImages = roleDetails?.galleryImages || [];
  const wallet = roleDetails?.wallet || roleDetails?.earnings || {};
  const professionalId =
    roleDetails?.professionalId ||
    roleDetails?.independentProId ||
    roleDetails?._id ||
    user?._id ||
    '';

  const displayName =
    roleDetails?.professionalName ||
    roleDetails?.fullName ||
    roleDetails?.shopName ||
    user?.name ||
    'Independent Professional';

  return {
    user,
    roleDetails,
    professionalId,
    displayName,
    firstName: displayName.split(' ')[0] || displayName,
    specialization:
      roleDetails?.salonCategory ||
      roleDetails?.specialization ||
      roleDetails?.category ||
      'Beauty & Grooming',
    location,
    profileImage: galleryImages[0] || roleDetails?.profilePhoto || null,
    galleryImages,
    contactNumber: roleDetails?.contactNumber || user?.phone || '',
    whatsappNumber: roleDetails?.whatsappNumber || '',
    governmentId: roleDetails?.governmentId || {},
    subscription: roleDetails?.subscription || {},
    offersHomeService: Boolean(roleDetails?.offersHomeService),
    experienceYears: safeNumber(roleDetails?.experienceYears),
    availability: normalizeAvailability(roleDetails?.availability),
    wallet,
  };
}

export function getIndividualReportContent(user) {
  const { roleDetails } = getIndividualProfessionalContext(user);
  const analytics = roleDetails?.analytics || roleDetails?.reportSummary || {};
  const periods = analytics?.periods || analytics;

  const report = {
    day: {
      ...FALLBACK_REPORT.day,
      ...(periods?.day || periods?.daily || {}),
    },
    week: {
      ...FALLBACK_REPORT.week,
      ...(periods?.week || periods?.weekly || {}),
    },
    month: {
      ...FALLBACK_REPORT.month,
      ...(periods?.month || periods?.monthly || {}),
    },
  };

  const serviceMix = Array.isArray(analytics?.serviceMix) && analytics.serviceMix.length
    ? analytics.serviceMix.map((item, index) => ({
        name: item?.name || `Service ${index + 1}`,
        bookings: safeNumber(item?.bookings),
        revenue: safeNumber(item?.revenue),
        color: item?.color || FALLBACK_SERVICE_MIX[index % FALLBACK_SERVICE_MIX.length].color,
      }))
    : FALLBACK_SERVICE_MIX;

  const highlights = Array.isArray(analytics?.highlights) && analytics.highlights.length
    ? analytics.highlights.map((item, index) => ({
        title: item?.title || `Highlight ${index + 1}`,
        subtitle: item?.subtitle || 'Performance update',
        value: item?.value || '--',
        icon: item?.icon || FALLBACK_HIGHLIGHTS[index % FALLBACK_HIGHLIGHTS.length].icon,
        color: item?.color || FALLBACK_HIGHLIGHTS[index % FALLBACK_HIGHLIGHTS.length].color,
      }))
    : FALLBACK_HIGHLIGHTS;

  return {
    periods: report,
    serviceMix,
    pieData: createPieData(serviceMix),
    highlights,
  };
}

export function getIndividualWalletContent(user) {
  const { wallet } = getIndividualProfessionalContext(user);

  return {
    balance: safeNumber(wallet?.balance ?? 4200),
    pendingPayout: safeNumber(wallet?.pendingPayout ?? 1850),
    lifetimeEarnings: safeNumber(wallet?.lifetimeEarnings ?? 154600),
    withdrawalReady: safeNumber(wallet?.withdrawalReady ?? 3200),
    transactions:
      Array.isArray(wallet?.transactions) && wallet.transactions.length
        ? wallet.transactions
        : FALLBACK_TRANSACTIONS,
  };
}

export function getIndividualNotifications(user) {
  const context = getIndividualProfessionalContext(user);
  const notifications =
    context?.roleDetails?.notifications ||
    context?.roleDetails?.alerts ||
    FALLBACK_NOTIFICATIONS;

  return Array.isArray(notifications) ? notifications : FALLBACK_NOTIFICATIONS;
}
