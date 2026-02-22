import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * StepIndicator - Multi-step progress indicator matching the red design
 *
 * @param {Array<{ step: number, title: string }>} steps        - Ordered list of steps
 * @param {number}  currentStep                                  - Currently active step number
 * @param {string}  activeColor    - Active step circle color    (default: '#E91E63')
 * @param {string}  completedColor - Completed step circle color (default: '#E91E63')
 * @param {string}  inactiveColor  - Inactive step circle color  (default: '#E5E7EB')
 * @param {string}  className      - Additional NativeWind className for the wrapper
 */
export default function StepIndicator({
  steps = [],
  currentStep,
  activeColor = '#E91E63',
  completedColor = '#E91E63',
  inactiveColor = '#E5E7EB',
  className = '',
}) {
  const getStatus = (step) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'inactive';
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
      }}
      className={className}
    >
      {steps.map(({ step, title }, index) => {
        const status = getStatus(step);
        const isCompleted = status === 'completed';
        const isActive = status === 'active';
        const isLast = index === steps.length - 1;

        const circleColor = isCompleted
          ? completedColor
          : isActive
          ? activeColor
          : inactiveColor;

        return (
          <View key={step} style={{ flex: 1, alignItems: 'center', position: 'relative' }}>
            {/* Connector line (before circle, not on first step) */}
            {index > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 16,
                  right: '50%',
                  left: '-50%',
                  height: 2,
                  backgroundColor: getStatus(steps[index - 1].step) !== 'inactive'
                    ? completedColor
                    : inactiveColor,
                  zIndex: 0,
                }}
              />
            )}

            {/* Circle */}
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: circleColor,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              {isCompleted ? (
                <Icon name="checkmark" size={18} color="#fff" />
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: isActive ? '#fff' : '#9CA3AF',
                  }}
                >
                  {step}
                </Text>
              )}
            </View>

            {/* Label */}
            <Text
              style={{
                fontSize: 11,
                marginTop: 6,
                textAlign: 'center',
                color: isActive ? '#E91E63' : '#9CA3AF',
                fontWeight: isActive ? '600' : '400',
              }}
            >
              {title}
            </Text>
          </View>
        );
      })}
    </View>
  );
}