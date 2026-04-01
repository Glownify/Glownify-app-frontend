import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import {
  completeService,
  requestOtp,
  startService,
  verifyOtp,
} from '../../api/independentServiceWorkflow';
import {
  getElapsedSeconds,
  mockActiveService,
  normalizeBookingToService,
} from '../../utils/independentServiceWorkflow';
import type {
  ActiveService,
  IndependentServiceWorkflowState,
  WorkflowBookingSource,
} from '../../types/independentServiceWorkflow';
import { showSnackbar } from './snackbarSlice';

const STORAGE_KEY = '@independent_service_workflow';

const initialState: IndependentServiceWorkflowState = {
  activeService: null,
  otp: '',
  startTime: null,
  duration: 0,
  loading: false,
  error: null,
  currentAction: null,
  otpCooldownEndsAt: null,
  completionTime: null,
  lastOtpSentAt: null,
};

const getPersistableState = (state: IndependentServiceWorkflowState) => ({
  activeService: state.activeService,
  otp: state.otp,
  startTime: state.startTime,
  duration: state.duration,
  otpCooldownEndsAt: state.otpCooldownEndsAt,
  completionTime: state.completionTime,
  lastOtpSentAt: state.lastOtpSentAt,
});

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const persistIndependentServiceWorkflowState = async (
  state: IndependentServiceWorkflowState,
) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistableState(state)));
  } catch (error) {
    console.warn('Failed to persist independent service workflow', error);
  }
};

export const loadIndependentServiceWorkflow = createAsyncThunk(
  'independentServiceWorkflow/loadIndependentServiceWorkflow',
  async (_, { rejectWithValue }) => {
    try {
      const storedState = await AsyncStorage.getItem(STORAGE_KEY);

      if (!storedState) {
        return rejectWithValue('No saved service workflow found.');
      }

      return JSON.parse(storedState) as Partial<IndependentServiceWorkflowState>;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Unable to restore service workflow.'),
      );
    }
  },
);

export const requestServiceOtp = createAsyncThunk(
  'independentServiceWorkflow/requestServiceOtp',
  async ({ serviceId }: { serviceId: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await requestOtp(serviceId);

      dispatch(
        showSnackbar({
          message: response.message,
          type: 'success',
          duration: 3000,
        }),
      );

      return {
        cooldownEndsAt: new Date(
          Date.now() + response.cooldownSeconds * 1000,
        ).toISOString(),
        lastOtpSentAt: new Date().toISOString(),
      };
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to send service OTP.');

      dispatch(
        showSnackbar({
          message,
          type: 'error',
          duration: 3000,
        }),
      );

      return rejectWithValue(message);
    }
  },
);

export const verifyServiceOtp = createAsyncThunk(
  'independentServiceWorkflow/verifyServiceOtp',
  async (
    { serviceId, otp }: { serviceId: string; otp: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      await verifyOtp(serviceId, otp);
      const response = await startService(serviceId);

      dispatch(
        showSnackbar({
          message: 'OTP verified. Service started successfully.',
          type: 'success',
          duration: 3000,
        }),
      );

      return {
        otp,
        startTime: response.startTime,
      };
    } catch (error) {
      const message = getErrorMessage(error, 'Unable to verify the OTP.');

      dispatch(
        showSnackbar({
          message,
          type: 'error',
          duration: 3000,
        }),
      );

      return rejectWithValue(message);
    }
  },
);

export const completeCurrentService = createAsyncThunk(
  'independentServiceWorkflow/completeCurrentService',
  async (
    { serviceId }: { serviceId: string },
    { dispatch, getState, rejectWithValue },
  ) => {
    try {
      const response = await completeService(serviceId);
      const workflowState = (getState() as {
        independentServiceWorkflow: IndependentServiceWorkflowState;
      }).independentServiceWorkflow;

      dispatch(
        showSnackbar({
          message: response.message,
          type: 'success',
          duration: 3000,
        }),
      );

      return {
        completionTime: response.completionTime,
        duration: getElapsedSeconds(
          workflowState.startTime,
          response.completionTime,
        ),
      };
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to complete the service.');

      dispatch(
        showSnackbar({
          message,
          type: 'error',
          duration: 3000,
        }),
      );

      return rejectWithValue(message);
    }
  },
);

const independentServiceWorkflowSlice = createSlice({
  name: 'independentServiceWorkflow',
  initialState,
  reducers: {
    initializeWorkflowFromBooking: (
      state,
      action: PayloadAction<WorkflowBookingSource | undefined>,
    ) => {
      const nextService = normalizeBookingToService(action.payload);
      const shouldResumeExisting =
        state.activeService?.id === nextService.id &&
        state.activeService.status !== 'completed';

      state.activeService = shouldResumeExisting
        ? ({
            ...nextService,
            status: state.activeService?.status ?? 'arrived',
          } as ActiveService)
        : nextService;

      if (!shouldResumeExisting) {
        state.otp = '';
        state.startTime = null;
        state.duration = 0;
        state.loading = false;
        state.error = null;
        state.currentAction = null;
        state.otpCooldownEndsAt = null;
        state.completionTime = null;
        state.lastOtpSentAt = null;
      }
    },
    ensureWorkflowSeeded: state => {
      if (!state.activeService) {
        state.activeService = { ...mockActiveService };
      }
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload.replace(/\D/g, '').slice(0, 4);
      state.error = null;
    },
    clearWorkflowError: state => {
      state.error = null;
    },
    syncWorkflowDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    resetIndependentServiceWorkflow: () => ({ ...initialState }),
  },
  extraReducers: builder => {
    builder
      .addCase(loadIndependentServiceWorkflow.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          loading: false,
          error: null,
          currentAction: null,
        };
      })
      .addCase(requestServiceOtp.pending, state => {
        state.loading = true;
        state.error = null;
        state.currentAction = 'requestOtp';
      })
      .addCase(requestServiceOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAction = null;
        state.otp = '';
        state.otpCooldownEndsAt = action.payload.cooldownEndsAt;
        state.lastOtpSentAt = action.payload.lastOtpSentAt;

        if (state.activeService) {
          state.activeService.status = 'otp_requested';
        }
      })
      .addCase(requestServiceOtp.rejected, (state, action) => {
        state.loading = false;
        state.currentAction = null;
        state.error = (action.payload as string) ?? 'Failed to send OTP.';
      })
      .addCase(verifyServiceOtp.pending, state => {
        state.loading = true;
        state.error = null;
        state.currentAction = 'verifyOtp';
      })
      .addCase(verifyServiceOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAction = null;
        state.otp = action.payload.otp;
        state.startTime = action.payload.startTime;
        state.duration = 0;

        if (state.activeService) {
          state.activeService.status = 'started';
        }
      })
      .addCase(verifyServiceOtp.rejected, (state, action) => {
        state.loading = false;
        state.currentAction = null;
        state.error = (action.payload as string) ?? 'Failed to verify OTP.';
      })
      .addCase(completeCurrentService.pending, state => {
        state.loading = true;
        state.error = null;
        state.currentAction = 'completeService';
      })
      .addCase(completeCurrentService.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAction = null;
        state.completionTime = action.payload.completionTime;
        state.duration = action.payload.duration;

        if (state.activeService) {
          state.activeService.status = 'completed';
        }
      })
      .addCase(completeCurrentService.rejected, (state, action) => {
        state.loading = false;
        state.currentAction = null;
        state.error =
          (action.payload as string) ?? 'Failed to complete the service.';
      });
  },
});

export const {
  initializeWorkflowFromBooking,
  ensureWorkflowSeeded,
  setOtp,
  clearWorkflowError,
  syncWorkflowDuration,
  resetIndependentServiceWorkflow,
} = independentServiceWorkflowSlice.actions;

export default independentServiceWorkflowSlice.reducer;

