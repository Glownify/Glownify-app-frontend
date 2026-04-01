import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../../components/independent-pro/serviceWorkflow/AppHeader';
import FeedbackBanner from '../../../components/independent-pro/serviceWorkflow/FeedbackBanner';
import ServiceCard from '../../../components/independent-pro/serviceWorkflow/ServiceCard';
import StatusIndicator from '../../../components/independent-pro/serviceWorkflow/StatusIndicator';
import { PrimaryButton } from '../../../components/independent-pro/serviceWorkflow/WorkflowButtons';
import {
  formatCurrency,
  mockActiveService,
} from '../../../utils/independentServiceWorkflow';
import {
  workflowColors,
  workflowRadius,
  workflowSpacing,
  workflowTypography,
} from '../../../theme/independentServiceWorkflow';
import {
  clearWorkflowError,
  ensureWorkflowSeeded,
  requestServiceOtp,
} from '../../../redux/slices/independentServiceWorkflowSlice';
import { useWorkflowState } from './useWorkflowState';

export default function ArriveScreen({ navigation }: any) {
  const { dispatch, workflow, service } = useWorkflowState();
  const activeService = service ?? mockActiveService;
  const isSubmitting =
    workflow.loading && workflow.currentAction === 'requestOtp';

  useEffect(() => {
    dispatch(ensureWorkflowSeeded());
    dispatch(clearWorkflowError());
  }, [dispatch]);

  const handleRequestOtp = async () => {
    const action = await dispatch(
      requestServiceOtp({ serviceId: activeService.id }),
    );

    if (requestServiceOtp.fulfilled.match(action)) {
      navigation.navigate('OTPVerificationScreen');
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Arrive at Customer Location"
        subtitle="Confirm your arrival before the service begins"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.heroCard}>
          <StatusIndicator label="On-site and ready" tone="accent" />
          <Text style={[workflowTypography.sectionTitle, styles.heroTitle]}>
            Everything is set to start.
          </Text>
          <Text style={workflowTypography.subtitle}>
            Request the service OTP from the customer to securely begin the
            appointment.
          </Text>
        </View>

        <ServiceCard
          service={activeService}
          details={[
            {
              icon: 'calendar-outline',
              label: 'Date & time',
              value: `${activeService.dateLabel} at ${activeService.timeLabel}`,
            },
            {
              icon: 'location-outline',
              label: 'Address',
              value: activeService.address,
            },
            {
              icon: 'timer-outline',
              label: 'Estimated duration',
              value: activeService.estimatedDurationLabel,
            },
          ]}
          footer={
            <View style={styles.cardFooter}>
              <Text style={styles.footerLabel}>Estimated price</Text>
              <Text style={styles.footerValue}>
                {formatCurrency(activeService.price)}
              </Text>
            </View>
          }
        />

        {workflow.error ? <FeedbackBanner message={workflow.error} /> : null}

        <PrimaryButton
          title="Request Service OTP"
          tone="accent"
          iconName="keypad-outline"
          loading={isSubmitting}
          onPress={handleRequestOtp}
        />

        <Text style={styles.supportText}>
          The customer will receive a 4-digit verification code before the
          service can start.
        </Text>
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
    padding: workflowSpacing.md,
    paddingBottom: workflowSpacing.xxl,
    gap: workflowSpacing.md,
  },
  heroCard: {
    backgroundColor: workflowColors.white,
    borderRadius: workflowRadius.md,
    padding: workflowSpacing.md,
  },
  heroTitle: {
    marginTop: workflowSpacing.sm,
    marginBottom: workflowSpacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLabel: {
    color: workflowColors.muted,
    fontSize: 13,
    fontWeight: '500',
  },
  footerValue: {
    color: workflowColors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  supportText: {
    color: workflowColors.muted,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'center',
    paddingHorizontal: workflowSpacing.sm,
  },
});
