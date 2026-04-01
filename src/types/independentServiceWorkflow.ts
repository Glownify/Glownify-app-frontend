export type ServiceWorkflowStatus =
  | 'arrived'
  | 'otp_requested'
  | 'started'
  | 'completed';

export interface WorkflowBookingSource {
  id?: string | number;
  serviceId?: string | number;
  customerName?: string;
  service?: string;
  date?: string;
  time?: string;
  duration?: string;
  amount?: number;
  address?: string;
  type?: 'home' | 'location';
  avatar?: string;
}

export interface ActiveService {
  id: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  serviceCode: string;
  dateLabel: string;
  timeLabel: string;
  address: string;
  price: number;
  estimatedDurationLabel: string;
  type: 'home' | 'location';
  avatarUrl?: string;
  status: ServiceWorkflowStatus;
}

export interface IndependentServiceWorkflowState {
  activeService: ActiveService | null;
  otp: string;
  startTime: string | null;
  duration: number;
  loading: boolean;
  error: string | null;
  currentAction: 'requestOtp' | 'verifyOtp' | 'completeService' | null;
  otpCooldownEndsAt: string | null;
  completionTime: string | null;
  lastOtpSentAt: string | null;
}
