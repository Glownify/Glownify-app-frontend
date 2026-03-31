import React from 'react';
import {View, Text, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {S, getThemeColors} from '../../theme';
import {moderateScale} from '../../utils/responsive';

/**
 * StepIndicator - Multi-step progress indicator
 *
 * @param {Array<{ step: number, title: string }>} steps - Ordered list of steps
 * @param {number} currentStep - Currently active step number
 * @param {string} activeColor - Active step circle color
 * @param {string} completedColor - Completed step circle color
 * @param {string} inactiveColor - Inactive step circle color
 * @param {string} className - Additional NativeWind className for the wrapper
 */
export default function StepIndicator({
  steps = [],
  currentStep,
  activeColor,
  completedColor,
  inactiveColor,
  className = '',
}) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);
  const circleSize = moderateScale(34);
  const lineThickness = moderateScale(2);
  const resolvedActiveColor = activeColor ?? colors.primary[600];
  const resolvedCompletedColor = completedColor ?? colors.primary[600];
  const resolvedInactiveColor = inactiveColor ?? colors.neutral[200];

  const getStatus = step => {
    if (step < currentStep) {
      return 'completed';
    }

    if (step === currentStep) {
      return 'active';
    }

    return 'inactive';
  };

  return (
    <View
      className={`flex-row border-b border-neutral-100 bg-surface ${className}`.trim()}
      style={{
        padding: S.space.marginScreen,
        gap: S.space.xs,
      }}
    >
      {steps.map(({step, title}, index) => {
        const status = getStatus(step);
        const isCompleted = status === 'completed';
        const isActive = status === 'active';
        const circleColor = isCompleted
          ? resolvedCompletedColor
          : isActive
          ? resolvedActiveColor
          : resolvedInactiveColor;
        const connectorColor =
          index > 0 && getStatus(steps[index - 1].step) !== 'inactive'
            ? resolvedCompletedColor
            : resolvedInactiveColor;

        return (
          <View
            key={step}
            className="items-center"
            style={{
              flex: 1,
              position: 'relative',
              gap: S.space.sm,
            }}
          >
            {index > 0 ? (
              <View
                style={{
                  position: 'absolute',
                  top: circleSize / 2 - lineThickness / 2,
                  right: '50%',
                  left: '-50%',
                  height: lineThickness,
                  backgroundColor: connectorColor,
                  zIndex: 0,
                }}
              />
            ) : null}

            <View
              className="items-center justify-center"
              style={{
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                backgroundColor: circleColor,
                zIndex: 1,
              }}
            >
              {isCompleted ? (
                <Icon name="checkmark" size={S.icon.sm} color={colors.white} />
              ) : (
                <Text
                  style={{
                    fontSize: S.fs.sm,
                    fontWeight: '700',
                    color:
                      isActive || isCompleted
                        ? colors.white
                        : colors.neutral[400],
                  }}
                >
                  {step}
                </Text>
              )}
            </View>

            <Text
              className="text-center"
              style={{
                fontSize: S.fs.xxs,
                color: isActive ? resolvedActiveColor : colors.neutral[400],
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
