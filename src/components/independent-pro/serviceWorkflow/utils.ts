import type { ActiveService, WorkflowBookingSource } from './types';

export const MOCK_SERVICE_OTP = '2486';

export const mockActiveService: ActiveService = {
  id: 'service-1024',
  bookingId: 'service-1024',
  customerName: 'Aarohi Sharma',
  customerPhone: '+91 98XXXXXX42',
  serviceName: 'Luxury Hair Spa',
  serviceCode: 'GLW-1024',
  dateLabel: 'March 18, 2026',
  timeLabel: '2:30 PM',
  address: '22 Palm Residency, 5th Main, Indiranagar, Bengaluru 560038',
  price: 1499,
  estimatedDurationLabel: '1 hr 15 min',
  type: 'home',
  avatarUrl: 'https://i.pravatar.cc/150?u=aarohi-sharma',
  status: 'arrived',
};

export const normalizeBookingToService = (
  booking?: WorkflowBookingSource,
): ActiveService => {
  if (!booking) {
    return { ...mockActiveService };
  }

  const resolvedId = String(booking.serviceId ?? booking.id ?? mockActiveService.id);
  const resolvedType = booking.type ?? 'home';
  const fallbackAddress =
    resolvedType === 'home'
      ? mockActiveService.address
      : 'Glownify Studio, Residency Road, Bengaluru 560025';

  return {
    id: resolvedId,
    bookingId: String(booking.id ?? resolvedId),
    customerName: booking.customerName ?? mockActiveService.customerName,
    customerPhone: mockActiveService.customerPhone,
    serviceName: booking.service ?? mockActiveService.serviceName,
    serviceCode: `GLW-${resolvedId.toString().padStart(4, '0')}`,
    dateLabel: booking.date ?? mockActiveService.dateLabel,
    timeLabel: booking.time ?? mockActiveService.timeLabel,
    address: booking.address ?? fallbackAddress,
    price: booking.amount ?? mockActiveService.price,
    estimatedDurationLabel:
      booking.duration ?? mockActiveService.estimatedDurationLabel,
    type: resolvedType,
    avatarUrl: booking.avatar ?? mockActiveService.avatarUrl,
    status: 'arrived',
  };
};

export const formatCurrency = (value: number) => `Rs ${value.toLocaleString()}`;

export const getElapsedSeconds = (
  startTime?: string | null,
  endTime?: string | null,
) => {
  if (!startTime) {
    return 0;
  }

  const start = new Date(startTime).getTime();
  const end = endTime ? new Date(endTime).getTime() : Date.now();

  if (Number.isNaN(start) || Number.isNaN(end) || end < start) {
    return 0;
  }

  return Math.floor((end - start) / 1000);
};

export const formatElapsedTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map(unit => unit.toString().padStart(2, '0'))
    .join(':');
};

export const formatDurationLabel = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (!hours && !minutes) {
    return 'Less than a minute';
  }

  if (!hours) {
    return `${minutes} min`;
  }

  if (!minutes) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
};

export const formatDateTimeStamp = (value?: string | null) => {
  if (!value) {
    return '--';
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return '--';
  }

  return parsed.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
