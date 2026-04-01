import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../../components/independent-pro/serviceWorkflow/AppHeader';
import ServiceCard from '../../../components/independent-pro/serviceWorkflow/ServiceCard';
import StatusIndicator from '../../../components/independent-pro/serviceWorkflow/StatusIndicator';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../components/independent-pro/serviceWorkflow/WorkflowButtons';
import {
  formatCurrency,
  formatDateTimeStamp,
  formatDurationLabel,
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
  resetIndependentServiceWorkflow,
} from '../../../redux/slices/independentServiceWorkflowSlice';
import { useWorkflowState } from './useWorkflowState';

export default function ServiceCompletedScreen({ navigation }: any) {
  const { dispatch, workflow, service } = useWorkflowState();
  const activeService = service ?? mockActiveService;

  useEffect(() => {
    dispatch(ensureWorkflowSeeded());
  }, [dispatch]);

  const handleBackToDashboard = () => {
    const parentNavigation = navigation.getParent?.();
    dispatch(resetIndependentServiceWorkflow());
    navigation.popToTop();
    setTimeout(() => {
      parentNavigation?.navigate('IndependentProDashboardTab');
    }, 0);
  };

  const handleViewHistory = () => {
    dispatch(resetIndependentServiceWorkflow());
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Service Completed"
        subtitle="The service has been wrapped up successfully"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.successWrap}>
          <View style={styles.successIcon}>
            <Icon name="checkmark" size={42} color={workflowColors.white} />
          </View>
          <Text style={workflowTypography.pageTitle}>
            Service Completed Successfully
          </Text>
          <Text style={[workflowTypography.subtitle, styles.successSubtitle]}>
            Everything is saved and ready for your dashboard and service history.
          </Text>
        </View>

        <ServiceCard
          service={activeService}
          headerAdornment={<StatusIndicator label="Completed" tone="success" />}
          details={[
            {
              icon: 'person-outline',
              label: 'Customer',
              value: activeService.customerName,
            },
            {
              icon: 'checkmark-circle-outline',
              label: 'Completion time',
              value: formatDateTimeStamp(workflow.completionTime),
            },
            {
              icon: 'timer-outline',
              label: 'Total duration',
              value: formatDurationLabel(workflow.duration),
            },
          ]}
          footer={
            <View style={styles.footerRow}>
              <Text style={styles.footerLabel}>Final price</Text>
              <Text style={styles.footerValue}>
                {formatCurrency(activeService.price)}
              </Text>
            </View>
          }
        />

        <PrimaryButton
          title="Back to Dashboard"
          iconName="home-outline"
          onPress={handleBackToDashboard}
        />

        <SecondaryButton
          title="View Service History"
          iconName="receipt-outline"
          onPress={handleViewHistory}
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
  successWrap: {
    alignItems: 'center',
    backgroundColor: workflowColors.white,
    borderRadius: workflowRadius.md,
    padding: workflowSpacing.lg,
  },
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: workflowColors.success,
    marginBottom: workflowSpacing.md,
  },
  successSubtitle: {
    textAlign: 'center',
    marginTop: workflowSpacing.sm,
  },
  footerRow: {
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
});
