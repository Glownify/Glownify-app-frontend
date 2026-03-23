import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppHeader from '../../../components/independent-pro/serviceWorkflow/AppHeader';
import FeedbackBanner from '../../../components/independent-pro/serviceWorkflow/FeedbackBanner';
import OTPInput from '../../../components/independent-pro/serviceWorkflow/OTPInput';
import { PrimaryButton } from '../../../components/independent-pro/serviceWorkflow/WorkflowButtons';
import {
  MOCK_SERVICE_OTP,
  mockActiveService,
} from '../../../components/independent-pro/serviceWorkflow/utils';
import {
  workflowColors,
  workflowRadius,
  workflowShadow,
  workflowSpacing,
  workflowTypography,
} from '../../../components/independent-pro/serviceWorkflow/theme';
import {
  clearWorkflowError,
  ensureWorkflowSeeded,
  requestServiceOtp,
  setOtp,
  verifyServiceOtp,
} from '../../../redux/slices/independentServiceWorkflowSlice';
import { showSnackbar } from '../../../redux/slices/snackbarSlice';
import { useWorkflowState } from './useWorkflowState';

export default function OTPVerificationScreen({ navigation }: any) {
  const { dispatch, workflow, service } = useWorkflowState();
  const activeService = service ?? mockActiveService;
  const [now, setNow] = useState(Date.now());

  const isVerifying = workflow.loading && workflow.currentAction === 'verifyOtp';
  const isResending = workflow.loading && workflow.currentAction === 'requestOtp';

  useEffect(() => {
    dispatch(ensureWorkflowSeeded());
  }, [dispatch]);

  useEffect(() => {
    if (!workflow.otpCooldownEndsAt) {
      return undefined;
    }

    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [workflow.otpCooldownEndsAt]);

  const cooldownInSeconds = useMemo(() => {
    if (!workflow.otpCooldownEndsAt) {
      return 0;
    }

    const difference = new Date(workflow.otpCooldownEndsAt).getTime() - now;
    return difference > 0 ? Math.ceil(difference / 1000) : 0;
  }, [now, workflow.otpCooldownEndsAt]);

  const handleVerifyOtp = async () => {
    if (workflow.otp.length !== 4) {
      dispatch(
        showSnackbar({
          message: 'Please enter the 4-digit OTP first.',
          type: 'warning',
          duration: 2500,
        }),
      );
      return;
    }

    const action = await dispatch(
      verifyServiceOtp({ serviceId: activeService.id, otp: workflow.otp }),
    );

    if (verifyServiceOtp.fulfilled.match(action)) {
      navigation.replace('ServiceStartedScreen');
    }
  };

  const handleResendOtp = async () => {
    dispatch(clearWorkflowError());
    await dispatch(requestServiceOtp({ serviceId: activeService.id }));
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="OTP Verification"
        subtitle="Verify the customer code to unlock service start"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.card}>
          <Text style={workflowTypography.sectionTitle}>Enter 4-digit OTP</Text>
          <Text style={[workflowTypography.subtitle, styles.cardSubtitle]}>
            Ask {activeService.customerName} for the code sent to their phone and
            enter it below.
          </Text>

          <OTPInput
            value={workflow.otp}
            onChange={value => dispatch(setOtp(value))}
            disabled={isVerifying}
            hasError={Boolean(workflow.error)}
          />

          <View style={styles.bannerWrap}>
            <FeedbackBanner
              tone="info"
              message={`Mock flow: use OTP ${MOCK_SERVICE_OTP} to continue.`}
            />
          </View>

          {workflow.error ? <FeedbackBanner message={workflow.error} /> : null}

          <PrimaryButton
            title="Verify OTP"
            iconName="shield-checkmark-outline"
            loading={isVerifying}
            disabled={workflow.otp.length !== 4}
            onPress={handleVerifyOtp}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={cooldownInSeconds > 0 || isResending}
            onPress={handleResendOtp}
            style={styles.resendButton}
          >
            <Text
              style={[
                styles.resendText,
                (cooldownInSeconds > 0 || isResending) && styles.resendTextDisabled,
              ]}
            >
              {cooldownInSeconds > 0
                ? `Resend OTP in ${cooldownInSeconds}s`
                : isResending
                ? 'Resending OTP...'
                : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: workflowColors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: workflowSpacing.md,
  },
  card: {
    backgroundColor: workflowColors.white,
    borderRadius: workflowRadius.md,
    padding: workflowSpacing.lg,
    ...workflowShadow,
  },
  cardSubtitle: {
    marginTop: workflowSpacing.xs,
    marginBottom: workflowSpacing.lg,
  },
  bannerWrap: {
    marginTop: workflowSpacing.md,
    marginBottom: workflowSpacing.sm,
  },
  resendButton: {
    marginTop: workflowSpacing.md,
    alignSelf: 'center',
    paddingVertical: workflowSpacing.xs,
  },
  resendText: {
    color: workflowColors.primaryStart,
    fontSize: 14,
    fontWeight: '600',
  },
  resendTextDisabled: {
    color: workflowColors.muted,
  },
});
