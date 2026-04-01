import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppHeader from '../../../components/independent-pro/serviceWorkflow/AppHeader';
import FeedbackBanner from '../../../components/independent-pro/serviceWorkflow/FeedbackBanner';
import ServiceCard from '../../../components/independent-pro/serviceWorkflow/ServiceCard';
import StatusIndicator from '../../../components/independent-pro/serviceWorkflow/StatusIndicator';
import TimerBadge from '../../../components/independent-pro/serviceWorkflow/TimerBadge';
import { PrimaryButton } from '../../../components/independent-pro/serviceWorkflow/WorkflowButtons';
import {
  formatCurrency,
  formatDateTimeStamp,
  getElapsedSeconds,
  mockActiveService,
} from '../../../utils/independentServiceWorkflow';
import {
  workflowColors,
  workflowRadius,
  workflowSpacing,
  workflowTypography,
} from '../../../theme/independentServiceWorkflow';
import {
  ensureWorkflowSeeded,
  syncWorkflowDuration,
} from '../../../redux/slices/independentServiceWorkflowSlice';
import { useWorkflowState } from './useWorkflowState';

export default function ServiceStartedScreen({ navigation }: any) {
  const { dispatch, workflow, service } = useWorkflowState();
  const activeService = service ?? mockActiveService;

  useEffect(() => {
    dispatch(ensureWorkflowSeeded());
  }, [dispatch]);

  useEffect(() => {
    if (!workflow.startTime) {
      return undefined;
    }

    const syncTimer = () => {
      dispatch(syncWorkflowDuration(getElapsedSeconds(workflow.startTime)));
    };

    syncTimer();
    const timer = setInterval(syncTimer, 1000);

    return () => clearInterval(timer);
  }, [dispatch, workflow.startTime]);

  return (
    <View style={styles.container}>
      <AppHeader
        title="Service Started"
        subtitle="Track progress while the appointment is live"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.statusCard}>
          <StatusIndicator label="Service in progress" tone="success" />
          <Text style={[workflowTypography.sectionTitle, styles.statusTitle]}>
            The appointment is now active.
          </Text>
          <Text style={workflowTypography.subtitle}>
            Started at {formatDateTimeStamp(workflow.startTime)}
          </Text>
          <View style={styles.timerWrap}>
            <TimerBadge seconds={workflow.duration} />
          </View>
        </View>

        <FeedbackBanner
          tone="success"
          message="Timer will continue from the saved start time even if you leave this screen."
        />

        <ServiceCard
          service={activeService}
          headerAdornment={<StatusIndicator label="Live" tone="success" />}
          details={[
            {
              icon: 'calendar-outline',
              label: 'Scheduled slot',
              value: `${activeService.dateLabel} at ${activeService.timeLabel}`,
            },
            {
              icon: 'play-circle-outline',
              label: 'Service start time',
              value: formatDateTimeStamp(workflow.startTime),
            },
            {
              icon: 'location-outline',
              label: 'Address',
              value: activeService.address,
            },
          ]}
          footer={
            <View style={styles.summaryRow}>
              <View>
                <Text style={styles.summaryLabel}>Price</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(activeService.price)}
                </Text>
              </View>
              <View style={styles.separator} />
              <View>
                <Text style={styles.summaryLabel}>Duration</Text>
                <Text style={styles.summaryValue}>
                  {activeService.estimatedDurationLabel}
                </Text>
              </View>
            </View>
          }
        />

        <PrimaryButton
          title="Complete Service"
          iconName="checkmark-done-outline"
          onPress={() => navigation.navigate('CompleteServiceScreen')}
        />
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
  statusCard: {
    backgroundColor: workflowColors.white,
    borderRadius: workflowRadius.md,
    padding: workflowSpacing.md,
  },
  statusTitle: {
    marginTop: workflowSpacing.sm,
    marginBottom: workflowSpacing.xs,
  },
  timerWrap: {
    marginTop: workflowSpacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: workflowColors.border,
    marginHorizontal: workflowSpacing.md,
  },
  summaryLabel: {
    color: workflowColors.muted,
    fontSize: 12,
    fontWeight: '500',
  },
  summaryValue: {
    color: workflowColors.text,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});
