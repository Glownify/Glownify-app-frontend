import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../../components/independent-pro/serviceWorkflow/AppHeader';
import FeedbackBanner from '../../../components/independent-pro/serviceWorkflow/FeedbackBanner';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../components/independent-pro/serviceWorkflow/WorkflowButtons';
import {
  formatDurationLabel,
  getElapsedSeconds,
  mockActiveService,
} from '../../../utils/independentServiceWorkflow';
import {
  workflowColors,
  workflowRadius,
  workflowShadow,
  workflowSpacing,
} from '../../../theme/independentServiceWorkflow';
import {
  completeCurrentService,
  ensureWorkflowSeeded,
  syncWorkflowDuration,
} from '../../../redux/slices/independentServiceWorkflowSlice';
import { useWorkflowState } from './useWorkflowState';

export default function CompleteServiceScreen({ navigation }: any) {
  const { dispatch, workflow, service } = useWorkflowState();
  const activeService = service ?? mockActiveService;
  const isSubmitting =
    workflow.loading && workflow.currentAction === 'completeService';

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

  const handleConfirm = async () => {
    const action = await dispatch(
      completeCurrentService({ serviceId: activeService.id }),
    );

    if (completeCurrentService.fulfilled.match(action)) {
      navigation.replace('ServiceCompletedScreen');
    }
  };

  return (
    <View style={styles.overlay}>
      <AppHeader
        title="Complete Service"
        subtitle="Review the summary before confirming"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.centerWrap}>
        <View style={styles.modalCard}>
          <View style={styles.iconWrap}>
            <Icon
              name="checkmark-done-circle-outline"
              size={42}
              color={workflowColors.accent}
            />
          </View>

          <Text style={styles.title}>Ready to mark this service complete?</Text>
          <Text style={styles.subtitle}>
            Once you confirm, the job will move to completed service history.
          </Text>

          <View style={styles.summaryList}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service</Text>
              <Text style={styles.summaryValue}>{activeService.serviceName}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration</Text>
              <Text style={styles.summaryValue}>
                {formatDurationLabel(workflow.duration)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Customer</Text>
              <Text style={styles.summaryValue}>{activeService.customerName}</Text>
            </View>
          </View>

          {workflow.error ? <FeedbackBanner message={workflow.error} /> : null}

          <View style={styles.buttonRow}>
            <SecondaryButton
              title="Cancel"
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
              disabled={isSubmitting}
            />
            <PrimaryButton
              title="Confirm Completion"
              tone="accent"
              style={styles.primaryButton}
              loading={isSubmitting}
              onPress={handleConfirm}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: workflowColors.overlay,
  },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    padding: workflowSpacing.md,
  },
  modalCard: {
    backgroundColor: workflowColors.white,
    borderRadius: workflowRadius.lg,
    padding: workflowSpacing.lg,
    ...workflowShadow,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: workflowColors.accentSoft,
    marginBottom: workflowSpacing.md,
  },
  title: {
    color: workflowColors.text,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: workflowColors.subtitle,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
    marginTop: workflowSpacing.sm,
  },
  summaryList: {
    marginTop: workflowSpacing.lg,
    marginBottom: workflowSpacing.md,
    borderRadius: workflowRadius.sm,
    backgroundColor: workflowColors.background,
    padding: workflowSpacing.md,
    gap: workflowSpacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: workflowColors.muted,
    fontSize: 13,
    fontWeight: '500',
  },
  summaryValue: {
    flex: 1,
    textAlign: 'right',
    color: workflowColors.text,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: workflowSpacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: workflowSpacing.sm,
    marginTop: workflowSpacing.md,
  },
  secondaryButton: {
    flex: 1,
  },
  primaryButton: {
    flex: 1.2,
  },
});
