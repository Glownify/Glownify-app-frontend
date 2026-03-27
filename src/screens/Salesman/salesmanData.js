const salonVisuals = [
  require('../../assets/featuredSalon.png'),
  require('../../assets/shopBg.png'),
  require('../../assets/salonInterior.jpg'),
  require('../../assets/salonfollow.png'),
];

export const salesmanTheme = {
  brand: '#0F766E',
  brandDark: '#115E59',
  brandSoft: '#E7F8F5',
  accent: '#F97316',
  accentSoft: '#FFF4E8',
  background: '#F6F8FB',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  ink: '#111827',
  muted: '#667085',
  success: '#16A34A',
  successSoft: '#ECFDF3',
  warning: '#D97706',
  warningSoft: '#FFF7ED',
  danger: '#DC2626',
  dangerSoft: '#FEF2F2',
  info: '#2563EB',
  infoSoft: '#EFF6FF',
};

export const salesmanStageMeta = {
  prospect: {
    label: 'Prospect',
    color: salesmanTheme.warning,
    backgroundColor: salesmanTheme.warningSoft,
    icon: 'sparkles-outline',
  },
  docs_pending: {
    label: 'Docs Pending',
    color: salesmanTheme.accent,
    backgroundColor: salesmanTheme.accentSoft,
    icon: 'document-text-outline',
  },
  proposal_sent: {
    label: 'Proposal Sent',
    color: salesmanTheme.info,
    backgroundColor: salesmanTheme.infoSoft,
    icon: 'paper-plane-outline',
  },
  onboarding: {
    label: 'Onboarding',
    color: '#7C3AED',
    backgroundColor: '#F5F3FF',
    icon: 'rocket-outline',
  },
  live: {
    label: 'Live',
    color: salesmanTheme.success,
    backgroundColor: salesmanTheme.successSoft,
    icon: 'checkmark-circle-outline',
  },
  inactive: {
    label: 'Inactive',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    icon: 'pause-circle-outline',
  },
};

export const salesmanPriorityMeta = {
  high: {
    label: 'High Priority',
    color: salesmanTheme.danger,
    backgroundColor: salesmanTheme.dangerSoft,
  },
  medium: {
    label: 'Medium',
    color: salesmanTheme.warning,
    backgroundColor: salesmanTheme.warningSoft,
  },
  low: {
    label: 'Low',
    color: salesmanTheme.success,
    backgroundColor: salesmanTheme.successSoft,
  },
};

export const salesmanStatusMeta = {
  ACTIVE: {
    label: 'Active',
    color: salesmanTheme.success,
    backgroundColor: salesmanTheme.successSoft,
  },
  PENDING: {
    label: 'Pending',
    color: salesmanTheme.warning,
    backgroundColor: salesmanTheme.warningSoft,
  },
  INACTIVE: {
    label: 'Inactive',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
  },
};

export const salesmanProfile = {
  name: 'Arjun Mehta',
  email: 'arjun.mehta@example.com',
  phone: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  address: '12 Brigade Road, Bengaluru',
  referralId: 'SP-2026-2847',
  createdAt: '2025-06-18T09:00:00.000Z',
  territory: 'Bengaluru East',
  weeklyVisits: 14,
  streak: 18,
  conversionRate: 64,
  quarterTarget: 12,
  quarterAchieved: 9,
  supportEmail: 'support@glownify.app',
};

export const salesmanAchievements = [
  {
    id: 'ach-1',
    title: 'Fastest Closures',
    description: '3 salons converted in the last 10 days.',
    icon: 'flash-outline',
    color: salesmanTheme.warning,
    backgroundColor: salesmanTheme.warningSoft,
  },
  {
    id: 'ach-2',
    title: 'Strong Retention',
    description: '92% of registered salons are still active.',
    icon: 'shield-checkmark-outline',
    color: salesmanTheme.success,
    backgroundColor: salesmanTheme.successSoft,
  },
  {
    id: 'ach-3',
    title: 'Field Champion',
    description: '14 in-person visits logged this week.',
    icon: 'walk-outline',
    color: salesmanTheme.info,
    backgroundColor: salesmanTheme.infoSoft,
  },
];

export const salesmanTasks = [
  {
    id: 'task-1',
    title: 'Collect KYC docs from Glow & Grace',
    subtitle: 'Owner promised GST and ID proof before 11:00 AM.',
    dueLabel: 'Due today',
    leadId: 'lead-102',
    color: salesmanTheme.warning,
  },
  {
    id: 'task-2',
    title: 'Visit House of Curls for demo',
    subtitle: 'Walk through plan benefits and take storefront photos.',
    dueLabel: '1:30 PM visit',
    leadId: 'lead-101',
    color: salesmanTheme.info,
  },
  {
    id: 'task-3',
    title: 'Send pricing comparison to Aura Nail Bar',
    subtitle: 'Growth vs Premium breakdown requested by the owner.',
    leadId: 'lead-103',
    dueLabel: 'By 6:00 PM',
    color: salesmanTheme.accent,
  },
];

export const salesmanGrowth = [
  { month: 'Jan', value: 2 },
  { month: 'Feb', value: 4 },
  { month: 'Mar', value: 3 },
  { month: 'Apr', value: 5 },
  { month: 'May', value: 7 },
  { month: 'Jun', value: 6 },
];

export const salesmanLeads = [
  {
    id: 'lead-101',
    salonName: 'House of Curls',
    ownerName: 'Nisha Rao',
    phone: '+91 99800 01111',
    whatsapp: '+91 99800 01111',
    city: 'Indiranagar',
    source: 'Field Visit',
    stage: 'prospect',
    priority: 'high',
    estimatedValue: 22000,
    planInterest: 'Growth',
    lastContact: '2026-03-22T10:30:00.000Z',
    nextFollowUp: '2026-03-25T11:00:00.000Z',
    notes: 'Owner wants comparison against their current booking app.',
  },
  {
    id: 'lead-102',
    salonName: 'Mira Skin Lounge',
    ownerName: 'Apeksha Nair',
    phone: '+91 99166 70021',
    whatsapp: '+91 99166 70021',
    city: 'Koramangala',
    source: 'Referral',
    stage: 'docs_pending',
    priority: 'high',
    estimatedValue: 28000,
    planInterest: 'Premium',
    lastContact: '2026-03-23T14:15:00.000Z',
    nextFollowUp: '2026-03-24T17:30:00.000Z',
    notes: 'Waiting on shop registration copy and owner selfie.',
  },
  {
    id: 'lead-103',
    salonName: 'Aura Nail Bar',
    ownerName: 'Ritu Khanna',
    phone: '+91 98455 00912',
    whatsapp: '+91 98455 00912',
    city: 'HSR Layout',
    source: 'Instagram Lead Form',
    stage: 'proposal_sent',
    priority: 'medium',
    estimatedValue: 18000,
    planInterest: 'Growth',
    lastContact: '2026-03-21T16:10:00.000Z',
    nextFollowUp: '2026-03-26T12:00:00.000Z',
    notes: 'Proposal sent with launch-week discount and onboarding support.',
  },
  {
    id: 'lead-104',
    salonName: 'Blush Lab Studio',
    ownerName: 'Tanvi Kapoor',
    phone: '+91 97421 66432',
    whatsapp: '+91 97421 66432',
    city: 'Whitefield',
    source: 'WhatsApp Share',
    stage: 'onboarding',
    priority: 'medium',
    estimatedValue: 24000,
    planInterest: 'Premium',
    lastContact: '2026-03-23T09:00:00.000Z',
    nextFollowUp: '2026-03-27T10:00:00.000Z',
    notes: 'Team training scheduled after payment confirmation.',
  },
  {
    id: 'lead-105',
    salonName: 'City Men Lounge',
    ownerName: 'Imran Khan',
    phone: '+91 99011 44210',
    whatsapp: '+91 99011 44210',
    city: 'MG Road',
    source: 'Cold Outreach',
    stage: 'inactive',
    priority: 'low',
    estimatedValue: 12000,
    planInterest: 'Starter',
    lastContact: '2026-03-14T15:45:00.000Z',
    nextFollowUp: '2026-03-30T16:30:00.000Z',
    notes: 'Paused until after their renovation completes.',
  },
];

export const salesmanSalons = [
  {
    id: 'sal-201',
    name: 'Velvet Cut Salon & Spa',
    owner: 'Sarah Jenkins',
    phone: '+91 99800 12234',
    whatsapp: '+91 99800 12234',
    email: 'velvetcut@example.com',
    address: '123 Fashion Street, Indiranagar, Bengaluru',
    city: 'Bengaluru',
    joined: '2026-02-12T09:00:00.000Z',
    lastVisit: '2026-03-18T14:30:00.000Z',
    nextFollowUp: '2026-03-26T11:30:00.000Z',
    commissionEarned: 14500,
    monthlyRevenue: 65000,
    image: salonVisuals[0],
    status: 'ACTIVE',
    stage: 'live',
    plan: 'Growth',
    teamSize: 12,
    professionals: 7,
    payoutStatus: 'Paid',
    source: 'Referral Link',
    notes: 'Owner wants a festive campaign recommendation for next month.',
    checklist: [
      { id: 'c-1', label: 'KYC verified', complete: true },
      { id: 'c-2', label: 'Subscription activated', complete: true },
      { id: 'c-3', label: 'Staff onboarding completed', complete: true },
      { id: 'c-4', label: 'Launch campaign scheduled', complete: false },
    ],
    activities: [
      {
        id: 'a-1',
        type: 'visit',
        title: 'Store walkthrough completed',
        at: '2026-03-18T14:30:00.000Z',
        detail: 'Recommended combo packages for weekend rush hours.',
      },
      {
        id: 'a-2',
        type: 'payment',
        title: 'Quarterly payout received',
        at: '2026-03-12T10:15:00.000Z',
        detail: 'Commission released for February subscription renewals.',
      },
      {
        id: 'a-3',
        type: 'support',
        title: 'Menu update requested',
        at: '2026-03-08T13:00:00.000Z',
        detail: 'Owner asked for bridal package listing refresh.',
      },
    ],
  },
  {
    id: 'sal-202',
    name: 'Glow & Grace Beauty Studio',
    owner: 'Emily Watson',
    phone: '+91 99166 88221',
    whatsapp: '+91 99166 88221',
    email: 'glowandgrace@example.com',
    address: '45 Rose Avenue, Koramangala, Bengaluru',
    city: 'Bengaluru',
    joined: '2026-03-05T09:00:00.000Z',
    lastVisit: '2026-03-20T16:00:00.000Z',
    nextFollowUp: '2026-03-24T17:00:00.000Z',
    commissionEarned: 8200,
    monthlyRevenue: 32000,
    image: salonVisuals[1],
    status: 'PENDING',
    stage: 'onboarding',
    plan: 'Premium',
    teamSize: 8,
    professionals: 5,
    payoutStatus: 'Pending Verification',
    source: 'Field Visit',
    notes: 'Needs payout setup and Google Business listing sync.',
    checklist: [
      { id: 'c-5', label: 'KYC verified', complete: true },
      { id: 'c-6', label: 'Subscription activated', complete: true },
      { id: 'c-7', label: 'Payout details added', complete: false },
      { id: 'c-8', label: 'Google listing linked', complete: false },
    ],
    activities: [
      {
        id: 'a-4',
        type: 'onboarding',
        title: 'Training session completed',
        at: '2026-03-20T16:00:00.000Z',
        detail: 'Front desk team trained on bookings and no-show rules.',
      },
      {
        id: 'a-5',
        type: 'docs',
        title: 'KYC approved',
        at: '2026-03-12T12:45:00.000Z',
        detail: 'Business PAN and owner ID verified successfully.',
      },
    ],
  },
  {
    id: 'sal-203',
    name: 'Urban Edge Salon',
    owner: 'Michael Brown',
    phone: '+91 98450 99223',
    whatsapp: '+91 98450 99223',
    email: 'urbanedge@example.com',
    address: '88 Market Road, City Center, Bengaluru',
    city: 'Bengaluru',
    joined: '2025-12-20T09:00:00.000Z',
    lastVisit: '2026-03-10T15:30:00.000Z',
    nextFollowUp: '2026-03-29T12:30:00.000Z',
    commissionEarned: 5750,
    monthlyRevenue: 21000,
    image: salonVisuals[2],
    status: 'INACTIVE',
    stage: 'inactive',
    plan: 'Starter',
    teamSize: 5,
    professionals: 3,
    payoutStatus: 'Paused',
    source: 'Cold Outreach',
    notes: 'Temporarily paused because the owner is relocating one branch.',
    checklist: [
      { id: 'c-9', label: 'KYC verified', complete: true },
      { id: 'c-10', label: 'Subscription activated', complete: false },
      { id: 'c-11', label: 'Branch migration planned', complete: false },
    ],
    activities: [
      {
        id: 'a-6',
        type: 'status',
        title: 'Pause requested by owner',
        at: '2026-03-10T15:30:00.000Z',
        detail: 'Migration timeline expected in the first week of April.',
      },
      {
        id: 'a-7',
        type: 'support',
        title: 'Retention plan drafted',
        at: '2026-03-07T17:15:00.000Z',
        detail: 'Prepared a low-cost restart option to retain the salon.',
      },
    ],
  },
  {
    id: 'sal-204',
    name: 'The Brow Room',
    owner: 'Rhea Bhatia',
    phone: '+91 97661 11024',
    whatsapp: '+91 97661 11024',
    email: 'browroom@example.com',
    address: '7th Main, HSR Layout, Bengaluru',
    city: 'Bengaluru',
    joined: '2026-03-18T09:00:00.000Z',
    lastVisit: '2026-03-21T12:15:00.000Z',
    nextFollowUp: '2026-03-25T15:00:00.000Z',
    commissionEarned: 4100,
    monthlyRevenue: 18000,
    image: salonVisuals[3],
    status: 'PENDING',
    stage: 'docs_pending',
    plan: 'Growth',
    teamSize: 4,
    professionals: 2,
    payoutStatus: 'Awaiting Bank Details',
    source: 'Referral Link',
    notes: 'Interested in influencer-led launch content once onboarding completes.',
    checklist: [
      { id: 'c-12', label: 'KYC verified', complete: false },
      { id: 'c-13', label: 'Subscription activated', complete: true },
      { id: 'c-14', label: 'Bank account added', complete: false },
      { id: 'c-15', label: 'Launch content approved', complete: false },
    ],
    activities: [
      {
        id: 'a-8',
        type: 'docs',
        title: 'Account details requested',
        at: '2026-03-21T12:15:00.000Z',
        detail: 'Owner said she will share details after speaking with accountant.',
      },
    ],
  },
];

export const defaultNotificationSettings = {
  push: true,
  email: true,
  sms: false,
};

export const formatCurrency = value =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export const formatCompactCurrency = value => {
  const numeric = Number(value) || 0;

  if (numeric >= 100000) {
    return `₹${(numeric / 100000).toFixed(1).replace('.0', '')}L`;
  }

  if (numeric >= 1000) {
    return `₹${(numeric / 1000).toFixed(1).replace('.0', '')}k`;
  }

  return `₹${numeric}`;
};

export const formatShortDate = value =>
  new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

export const formatFullDate = value =>
  new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const formatTimeLabel = value =>
  new Date(value).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  });

export const getInitials = value =>
  String(value || '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('');

export const getSalonById = id =>
  salesmanSalons.find(item => String(item.id) === String(id));

export const getLeadById = id =>
  salesmanLeads.find(item => String(item.id) === String(id));

export const buildSalesmanUser = user => ({
  ...salesmanProfile,
  name: user?.name || salesmanProfile.name,
  email: user?.email || salesmanProfile.email,
  phone: user?.phone || salesmanProfile.phone,
  whatsappNumber:
    user?.whatsappNumber || user?.phone || salesmanProfile.whatsappNumber,
  address:
    user?.address ||
    user?.roleDetails?.address ||
    salesmanProfile.address,
  createdAt: user?.createdAt || salesmanProfile.createdAt,
  territory:
    user?.roleDetails?.territory ||
    user?.roleDetails?.city ||
    salesmanProfile.territory,
  referralId:
    user?.roleDetails?.referralId ||
    user?.referralId ||
    salesmanProfile.referralId,
});

export const buildSalesmanSummary = () => {
  const totalSalons = salesmanSalons.length;
  const activeSalons = salesmanSalons.filter(
    salon => salon.status === 'ACTIVE',
  ).length;
  const pendingSalons = salesmanSalons.filter(
    salon => salon.status === 'PENDING',
  ).length;
  const totalEarnings = salesmanSalons.reduce(
    (sum, salon) => sum + (Number(salon.commissionEarned) || 0),
    0,
  );
  const totalIndependentProfessionals = salesmanSalons.reduce(
    (sum, salon) => sum + (Number(salon.professionals) || 0),
    0,
  );
  const pipelineValue = salesmanLeads.reduce(
    (sum, lead) => sum + (Number(lead.estimatedValue) || 0),
    0,
  );
  const followUpsDue = salesmanLeads.filter(lead =>
    ['prospect', 'docs_pending', 'proposal_sent', 'onboarding'].includes(
      lead.stage,
    ),
  ).length;

  return {
    totalSalons,
    activeSalons,
    pendingSalons,
    totalEarnings,
    totalIndependentProfessionals,
    commissionRate: 12,
    pipelineValue,
    followUpsDue,
    targetAchieved: salesmanProfile.quarterAchieved,
    targetTotal: salesmanProfile.quarterTarget,
  };
};

export const mergeDashboardSummary = apiSummary => {
  const fallback = buildSalesmanSummary();
  const hasApiValues =
    apiSummary &&
    Object.values(apiSummary).some(value => Number(value) > 0);

  if (!hasApiValues) {
    return fallback;
  }

  return {
    ...fallback,
    ...apiSummary,
    activeSalons: fallback.activeSalons,
    pendingSalons: fallback.pendingSalons,
    pipelineValue: fallback.pipelineValue,
    followUpsDue: fallback.followUpsDue,
    targetAchieved: fallback.targetAchieved,
    targetTotal: fallback.targetTotal,
  };
};

export const buildRecentRegistrations = () =>
  salesmanSalons
    .slice()
    .sort((first, second) => new Date(second.joined) - new Date(first.joined))
    .map(salon => ({
      id: salon.id,
      salonName: salon.name,
      date: salon.joined,
      status: salon.payoutStatus === 'Paid' ? 'paid' : 'pending',
    }))
    .slice(0, 4);

export const buildProfileStats = summary => [
  {
    id: 'profile-1',
    label: 'Salons Closed',
    value: String(summary.totalSalons),
    icon: 'storefront-outline',
    color: salesmanTheme.brand,
    backgroundColor: salesmanTheme.brandSoft,
  },
  {
    id: 'profile-2',
    label: 'Conversion Rate',
    value: `${salesmanProfile.conversionRate}%`,
    icon: 'trending-up-outline',
    color: salesmanTheme.accent,
    backgroundColor: salesmanTheme.accentSoft,
  },
  {
    id: 'profile-3',
    label: 'Weekly Visits',
    value: String(salesmanProfile.weeklyVisits),
    icon: 'walk-outline',
    color: salesmanTheme.info,
    backgroundColor: salesmanTheme.infoSoft,
  },
];

